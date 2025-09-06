<script setup>
import { ShoppingCart, X, Minus, Plus, Trash2, CreditCard } from 'lucide-vue-next';
import { twd } from '@/utils/formatters';
import PlaceholderImage from './PlaceholderImage.vue';

defineProps({
  open: { type: Boolean, default: false },
  cart: { type: Object, required: true },
});

const emit = defineEmits(['close', 'checkout']);
</script>

<template>
  <Transition name="fade">
    <div v-if="open" @click="emit('close')" class="fixed inset-0 bg-black/40 z-40" />
  </Transition>
  <Transition name="slide">
    <aside v-if="open"
      class="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl p-4 flex flex-col">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart :size="20" /> 我的購物車
        </h3>
        <button aria-label="close cart" class="p-2 rounded-full hover:bg-zinc-100" @click="emit('close')">
          <X :size="20" />
        </button>
      </div>
      <div class="mt-3 space-y-3 overflow-auto flex-1">
        <div v-if="cart.items.length === 0" class="text-sm text-zinc-500 text-center mt-10">購物車是空的，去逛逛吧！</div>
        <div v-for="item in cart.items.value" :key="item.id"
          class="flex items-center gap-3 p-2 rounded-xl ring-1 ring-zinc-100">
          <div class="w-16">
            <PlaceholderImage :hue="item.imageHue" :name="item.flavor" />
          </div>
          <div class="flex-1">
            <div class="font-medium text-zinc-900">{{ item.name }}</div>
            <div class="text-xs text-zinc-500">單價 {{ twd(item.price) }}</div>
            <div class="mt-1 flex items-center gap-2">
              <button class="p-1 rounded-md ring-1 ring-zinc-200" @click="cart.setQty(item.id, item.qty - 1)">
                <Minus :size="16" />
              </button>
              <input class="w-12 text-center ring-1 ring-zinc-200 rounded-md py-1" :value="item.qty"
                @input="cart.setQty(item.id, Number($event.target.value) || 1)" type="number" min="1" max="99" />
              <button class="p-1 rounded-md ring-1 ring-zinc-200" @click="cart.setQty(item.id, item.qty + 1)">
                <Plus :size="16" />
              </button>
            </div>
          </div>
          <div class="text-right">
            <div class="font-semibold">{{ twd(item.lineTotal) }}</div>
            <button class="mt-1 inline-flex items-center gap-1 text-xs text-red-500 hover:underline"
              @click="cart.remove(item.id)">
              <Trash2 :size="12" /> 移除
            </button>
          </div>
        </div>
      </div>
      <div class="pt-3 border-t">
        <div class="flex items-center justify-between text-sm">
          <span class="text-zinc-600">小計</span>
          <span class="font-semibold">{{ twd(cart.total.value) }}</span>
        </div>
        <button :disabled="cart.items.length === 0" @click="emit('checkout')"
          class="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-white px-4 py-3 hover:bg-amber-600 disabled:opacity-50">
          <CreditCard :size="20" /> 前往結帳
        </button>
      </div>
    </aside>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
