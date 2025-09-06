<script setup>
import { computed } from 'vue';

const props = defineProps({
  hue: { type: Number, default: 45 },
  name: { type: String, default: '布丁' },
});

const bg = computed(() => `from-[hsl(${props.hue}deg_90%_85%)] to-[hsl(${props.hue}deg_90%_75%)]`);
const ring = computed(() => `ring-[hsl(${props.hue}deg_70%_60%)]`);
</script>

<template>
  <div
    :class="`w-full aspect-square rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center ring-1 ${ring} overflow-hidden`">
    <div class="absolute -bottom-6 right-4 w-24 h-24 rounded-full bg-white/50 blur-2xl" />
    <Transition appear name="pudding-pop">
      <div class="text-6xl">🍮</div>
    </Transition>
    <div class="absolute bottom-2 left-3 text-xs px-2 py-0.5 rounded-full bg-white/70">{{ name }}</div>
  </div>
</template>

<style>
.pudding-pop-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pudding-pop-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>
