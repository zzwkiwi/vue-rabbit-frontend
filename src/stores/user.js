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
  return {
    userInfo,
    getUserInfo
  }
}
  , {
    persist: true,
  }
)