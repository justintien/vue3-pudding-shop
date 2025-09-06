<script setup>
import { ref, computed } from 'vue';
import { ShoppingCart, Search, Filter } from 'lucide-vue-next';
import { PRODUCTS, FLAVORS } from '@/data/products';
import { useCart } from '@/composables/useCart';
import ProductCard from '@/components/ProductCard.vue';
import CartDrawer from './components/CartDrawer.vue';
import CheckoutModal from './components/CheckoutModal.vue';

const cart = useCart();
const cartOpen = ref(false);
const checkoutOpen = ref(false);

const search = ref("");
const flavor = ref("全部");
const priceSort = ref(""); // '', 'asc', 'desc'

const filtered = computed(() => {
  let list = PRODUCTS.filter(p =>
    (!search.value || p.name.includes(search.value) || p.desc.includes(search.value)) &&
    (flavor.value === "全部" || p.flavor === flavor.value)
  );
  if (priceSort.value === "asc") list.sort((a, b) => a.price - b.price);
  if (priceSort.value === "desc") list.sort((a, b) => b.price - a.price);
  return list;
});

const handleAddProduct = (id) => {
  cart.add(id);
  cartOpen.value = true;
};

const handleCheckout = () => {
  cartOpen.value = false;
  checkoutOpen.value = true;
};

const handleSuccess = () => {
  cart.clear();
  alert("下單成功！感謝您的選購（示意）");
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-white text-zinc-900">
    <header class="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 grid place-items-center rounded-xl bg-amber-500 text-white text-xl">🍮</div>
          <div>
            <div class="font-bold leading-tight">Pudding Shop 布丁鋪</div>
            <div class="text-[11px] text-zinc-500">每日新鮮蒸煮 · 台北出貨</div>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-2 w-1/2">
          <div class="relative flex-1">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input v-model="search" placeholder="搜尋商品/口味..."
              class="w-full pl-9 pr-3 py-2 rounded-xl ring-1 ring-zinc-200" />
          </div>
          <div class="flex items-center gap-2">
            <Filter class="w-4 h-4 text-zinc-400" />
            <select v-model="flavor" class="px-3 py-2 rounded-xl ring-1 ring-zinc-200 bg-white">
              <option v-for="f in FLAVORS" :key="f" :value="f">{{ f }}</option>
            </select>
            <select v-model="priceSort" class="px-3 py-2 rounded-xl ring-1 ring-zinc-200 bg-white">
              <option value="">價格排序</option>
              <option value="asc">由低到高</option>
              <option value="desc">由高到低</option>
            </select>
          </div>
        </div>
        <button @click="cartOpen = true"
          class="relative inline-flex items-center gap-2 rounded-xl bg-amber-500 text-white px-3 py-2 hover:bg-amber-600">
          <ShoppingCart :size="20" />
          <span class="hidden sm:inline">購物車</span>
          <span v-if="cart.raw.length > 0"
            class="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white text-amber-600 ring-1 ring-amber-200">
            {{ cart.totalQty }}
          </span>
        </button>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4">
      <section class="pt-8">
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold leading-tight">
              手工布丁 ·
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
                每一口都是香濃幸福</span>
            </h1>
            <p class="mt-3 text-zinc-600">
              使用當日鮮蛋、牧場牛乳與台糖二砂手炒焦糖，無香精無防腐劑。台北當日配送，外縣市冷藏宅配。
            </p>
            <div class="mt-4 flex gap-2">
              <a href="#products" class="px-5 py-3 rounded-2xl bg-amber-500 text-white hover:bg-amber-600">立即選購</a>
              <a href="#promo" class="px-5 py-3 rounded-2xl ring-1 ring-zinc-200">本月活動</a>
            </div>
          </div>
          <div class="relative">
            <div
              class="aspect-[4/3] rounded-3xl bg-gradient-to-br from-amber-200 via-amber-100 to-white ring-1 ring-amber-300 p-6 flex items-end justify-end overflow-hidden">
              <div class="absolute -bottom-16 -left-8 w-64 h-64 rounded-full bg-white/60 blur-2xl" />
              <div class="absolute -top-10 right-6 w-36 h-36 rounded-full bg-amber-300/40 blur-xl" />
              <div class="text-[96px] md:text-[120px]">🍮</div>
            </div>
          </div>
        </div>
      </section>

      <section id="promo" class="mt-10">
        <div class="rounded-3xl p-5 bg-amber-100 ring-1 ring-amber-200 grid md:grid-cols-3 gap-4">
          <div class="md:col-span-2">
            <h2 class="text-xl font-bold">中秋甜點禮盒 · 任選 6 入 9 折</h2>
            <p class="text-sm text-amber-900/80 mt-1">輸入優惠碼 <span class="font-mono font-bold">PUDDING10</span>
              於結帳享折扣（示意）。</p>
          </div>
          <div class="flex md:justify-end items-center">
            <a href="#products" class="px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600">去選口味</a>
          </div>
        </div>
      </section>

      <section class="md:hidden mt-6">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input v-model="search" placeholder="搜尋商品/口味..."
              class="w-full pl-9 pr-3 py-2 rounded-xl ring-1 ring-zinc-200" />
          </div>
          <select v-model="flavor" class="px-3 py-2 rounded-xl ring-1 ring-zinc-200 bg-white">
            <option v-for="f in FLAVORS" :key="f" :value="f">{{ f }}</option>
          </select>
          <select v-model="priceSort" class="px-3 py-2 rounded-xl ring-1 ring-zinc-200 bg-white">
            <option value="">排序</option>
            <option value="asc">價格低→高</option>
            <option value="desc">價格高→低</option>
          </select>
        </div>
      </section>

      <section id="products" class="mt-6 pb-28">
        <div class="flex items-end justify-between">
          <h2 class="text-xl font-bold">精選布丁</h2>
          <div class="text-sm text-zinc-500">共 {{ filtered.length }} 項</div>
        </div>
        <TransitionGroup tag="div" name="list" class="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard v-for="p in filtered" :key="p.id" :p="p" @add="handleAddProduct" />
        </TransitionGroup>
      </section>
    </main>

    <footer class="border-t bg-white/70">
      <div
        class="max-w-6xl mx-auto px-4 py-6 text-sm text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>© {{ new Date().getFullYear() }} Pudding Shop. 這是示範網站，無實際金流。</div>
        <div class="flex items-center gap-3">
          <a class="hover:underline" href="#">隱私權</a>
          <a class="hover:underline" href="#">退換貨政策</a>
          <a class="hover:underline" href="#">聯絡我們</a>
        </div>
      </div>
    </footer>

    <CartDrawer :open="cartOpen" @close="cartOpen = false" :cart="cart" @checkout="handleCheckout" />
    <CheckoutModal :open="checkoutOpen" @close="checkoutOpen = false" :total="cart.total" @success="handleSuccess" />
  </div>
</template>

<style>
/* For TransitionGroup list animation */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.list-leave-active {
  position: absolute;
}
</style>
