//封装购物车

import { defineStore } from "pinia";
import { ref } from "vue";

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

  //getter


  return {
    cartList,
    addCart
  }
},
  {
    persist: true,
  }
)