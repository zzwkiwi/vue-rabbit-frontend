import httpInstance from "@/utils/http";

export function getGoodsAPI(id) {
  return httpInstance({
    url: '/goods',
    params: {
      id,
    }
  })
}