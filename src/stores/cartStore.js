//封装购物车

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  //state
  const cartList = ref([])

  //action
  const addCart = (goods) => {
    //添加购物车操作
    const item = cartList.value.find(item => item.skuId === goods.skuId)
    if (item) {
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
  }
  const delCart = (skuId) => {
    const index = cartList.value.findIndex(item => skuId === item.skuId)
    cartList.value.splice(index, 1)
  }

  const totalCount = computed(() => cartList.value.reduce((p, n) => p + n.count, 0))

  const totalPrice = computed(() => cartList.value.reduce((p, n) => p + n.count * n.price, 0).toFixed(2))

  //getter


  return {
    cartList,
    totalCount,
    totalPrice,
    addCart,
    delCart
  }
},
  {
    persist: true,
  }
)