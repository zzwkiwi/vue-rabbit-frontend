//用户数据相关

import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useUserStore = defineStore('user', () => {
  //state
  const userInfo = ref({})
  //action
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }
  //退出时清楚用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}
  , {
    persist: true,
  }
)