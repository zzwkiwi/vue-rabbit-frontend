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
  //修改指定state的selected状态
  const updateCartSelected = (selected, skuId) => {
    cartList.value.forEach(item => {
      if (item.skuId === skuId) {
        item.selected = selected
      }
    })
  }
  //修改全部selected
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }


  //getter
  const totalCount = computed(() => cartList.value.reduce((p, n) => p + n.count, 0))

  const totalPrice = computed(() => cartList.value.reduce((p, n) => p + n.count * n.price, 0).toFixed(2))

  const isAll = computed(() => cartList.value.every(item => item.selected === true))

  const totalSelectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((p, n) => p + n.count, 0))

  const totalSelectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((p, n) => p + n.count * n.price, 0))



  return {
    cartList,
    totalCount,
    totalPrice,
    isAll,
    totalSelectedCount,
    totalSelectedPrice,
    addCart,
    delCart,
    updateCartSelected,
    allCheck,
  }
},
  {
    persist: true,
  }
)