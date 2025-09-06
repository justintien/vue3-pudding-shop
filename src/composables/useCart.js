import { ref, computed } from 'vue'
import { PRODUCTS } from '@/data/products'

export function useCart() {
  const items = ref([]) // {id, qty}

  const add = (id, qty = 1) => {
    const found = items.value.find((i) => i.id === id)
    if (found) {
      found.qty = Math.min(found.qty + qty, 99)
    } else {
      items.value.push({ id, qty })
    }
  }

  const remove = (id) => {
    items.value = items.value.filter((i) => i.id !== id)
  }

  const setQty = (id, qty) => {
    const found = items.value.find((i) => i.id === id)
    if (found) {
      found.qty = Math.max(1, Math.min(99, qty))
    }
  }

  const clear = () => {
    items.value = []
  }

  const enriched = computed(() =>
    items.value.map((i) => {
      const p = PRODUCTS.find((p) => p.id === i.id)
      return { ...p, qty: i.qty, lineTotal: i.qty * p.price }
    }),
  )

  const total = computed(() => enriched.value.reduce((s, i) => s + i.lineTotal, 0))

  const totalQty = computed(() => items.value.reduce((s, i) => s + i.qty, 0))

  return { items: enriched, raw: items, totalQty, add, remove, setQty, clear, total }
}
