import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  //根据路由id获取分类数据
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    console.log('route-id', id);
    categoryData.value = res.result

  }

  onMounted(() => {
    getCategory(route.params.id)
  })
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return {
    categoryData
  }

}