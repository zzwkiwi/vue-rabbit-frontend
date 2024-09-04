import { ref, onMounted } from "vue";
import { getBannerImgAPI } from "@/apis/category";
export function useBanner() {
  const bannerImgList = ref([])
  const getBannerImg = async () => {
    const res = await getBannerImgAPI({
      distributionSite: '2'
    })
    console.log(res);
    bannerImgList.value = res.result

  }

  onMounted(() => {
    getBannerImg()
  })

  return {
    bannerImgList
  }
}