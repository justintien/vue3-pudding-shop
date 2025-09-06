<script setup>
import { ref } from 'vue';
import { X, Package, CheckCircle2 } from 'lucide-vue-next';
import { twd } from '@/utils/formatters';

defineProps({
  open: { type: Boolean, default: false },
  total: { type: Number, required: true },
});
const emit = defineEmits(['close', 'success']);

const step = ref(1);
const form = ref({ name: "", phone: "", address: "", note: "", method: "credit" });

const next = () => step.value = Math.min(3, step.value + 1);
const prev = () => step.value = Math.max(1, step.value - 1);

const handleClose = () => {
  emit('close');
  // 延遲重設表單，讓動畫效果更自然
  setTimeout(() => {
    step.value = 1;
    form.value = { name: "", phone: "", address: "", note: "", method: "credit" };
  }, 300);
}

const handleSubmit = () => {
  emit('success');
  handleClose();
}
</script>

<template>
  <Transition name="fade">
    <div v-if="open" @click="handleClose" class="fixed inset-0 bg-black/40 z-50" />
  </Transition>
  <Transition name="pop">
    <div v-if="open" class="fixed inset-0 z-50 grid place-items-center p-4">
      <div class="w-full max-w-xl bg-white rounded-2xl p-5 shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">結帳</h3>
          <button @click="handleClose" class="p-2 rounded-full hover:bg-zinc-100">
            <X :size="20" />
          </button>
        </div>
        <div class="mt-3">
          <div class="flex items-center gap-2 text-xs text-zinc-500">
            <span :class="`px-2 py-1 rounded-full ${step >= 1 ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100'}`">1.
              收件資訊</span>
            <span>→</span>
            <span :class="`px-2 py-1 rounded-full ${step >= 2 ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100'}`">2.
              付款方式</span>
            <span>→</span>
            <span :class="`px-2 py-1 rounded-full ${step >= 3 ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100'}`">3.
              確認下單</span>
          </div>

          <div v-if="step === 1" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-sm text-zinc-600">收件人</label>
              <input v-model="form.name" class="mt-1 w-full rounded-xl ring-1 ring-zinc-200 px-3 py-2"
                placeholder="您的姓名" />
            </div>
            <div>
              <label class="text-sm text-zinc-600">手機</label>
              <input v-model="form.phone" class="mt-1 w-full rounded-xl ring-1 ring-zinc-200 px-3 py-2"
                placeholder="09xx-xxx-xxx" />
            </div>
            <div class="sm:col-span-2">
              <label class="text-sm text-zinc-600">地址</label>
              <input v-model="form.address" class="mt-1 w-full rounded-xl ring-1 ring-zinc-200 px-3 py-2"
                placeholder="配送地址" />
            </div>
            <div class="sm:col-span-2">
              <label class="text-sm text-zinc-600">備註</label>
              <textarea v-model="form.note" class="mt-1 w-full rounded-xl ring-1 ring-zinc-200 px-3 py-2" rows="2"
                placeholder="口味/到貨時段等需求" />
            </div>
          </div>

          <div v-if="step === 2" class="mt-4 space-y-2">
            <label
              v-for="m in [{ key: 'credit', label: '信用卡（示意）' }, { key: 'cod', label: '貨到付款' }, { key: 'transfer', label: '銀行轉帳' }]"
              :key="m.key" class="flex items-center gap-3 p-3 rounded-xl ring-1 ring-zinc-200 cursor-pointer">
              <input type="radio" name="pay" :value="m.key" v-model="form.method" />
              <span>{{ m.label }}</span>
            </label>
          </div>

          <div v-if="step === 3" class="mt-4 p-4 rounded-xl bg-amber-50 ring-1 ring-amber-200">
            <div class="flex items-center gap-2 text-amber-800">
              <Package :size="20" />
              <div class="font-medium">訂單金額：{{ twd(total) }}</div>
            </div>
            <p class="text-sm text-amber-800/80 mt-1">此為示範頁，提交後會顯示「下單成功」畫面。</p>
          </div>

          <div class="mt-5 flex items-center justify-between">
            <button @click="step === 1 ? handleClose() : prev()" class="px-4 py-2 rounded-xl ring-1 ring-zinc-200">{{
              step === 1 ? "取消" : "上一步" }}</button>
            <button v-if="step < 3" @click="next" class="px-4 py-2 rounded-xl bg-amber-500 text-white">下一步</button>
            <button v-else @click="handleSubmit"
              class="px-4 py-2 rounded-xl bg-amber-600 text-white inline-flex items-center gap-2">
              <CheckCircle2 :size="20" /> 送出訂單
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.2s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
