import http from '@/utils/http'

export function getApiTest() {
  return http({
    url: 'home/category/head',
  })
}