<script setup>
import { Star, Plus } from 'lucide-vue-next';
import { twd } from '@/utils/formatters';
import PlaceholderImage from './PlaceholderImage.vue';
import Badge from './Badge.vue';

defineProps({
  p: { type: Object, required: true },
});

const emit = defineEmits(['add']);
</script>

<template>
  <div
    class="group rounded-2xl p-3 bg-white shadow-sm hover:shadow-md transition-shadow ring-1 ring-zinc-100 flex flex-col">
    <div class="relative">
      <PlaceholderImage :hue="p.imageHue" :name="p.flavor" />
      <div class="absolute top-2 left-2 flex gap-1">
        <Badge v-for="t in p.tags?.slice(0, 2)" :key="t">{{ t }}</Badge>
      </div>
    </div>
    <div class="mt-3 flex-1 flex flex-col">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-semibold leading-tight text-zinc-900">{{ p.name }}</h3>
        <div class="shrink-0 text-amber-600 font-bold">{{ twd(p.price) }}</div>
      </div>
      <p class="text-sm text-zinc-600 mt-1 line-clamp-2">{{ p.desc }}</p>
      <div class="mt-2 flex items-center gap-1 text-xs text-zinc-500">
        <Star class="w-4 h-4 fill-amber-400 text-amber-400" />
        {{ p.rating }}
        <span class="ml-2">| 庫存 {{ p.stock }}</span>
      </div>
      <button @click="emit('add', p.id)"
        class="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-white px-4 py-2 hover:bg-amber-600 active:scale-[0.99] transition-transform">
        <Plus :size="16" /> 加入購物車
      </button>
    </div>
  </div>
</template>
