import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const useStore = useUserStore()
  const token = useStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const useStore = useUserStore()
  //统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  //401token失效处理
  if (e.response.status === 401) {
    useStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})


export default httpInstance