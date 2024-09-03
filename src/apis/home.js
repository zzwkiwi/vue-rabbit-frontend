import httpInstance from "@/utils/http";

export function getBannerImgAPI() {
  return httpInstance({
    url: '/home/banner',
  })
}