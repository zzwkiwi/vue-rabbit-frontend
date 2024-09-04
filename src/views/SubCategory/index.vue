<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import GoodsItem from '../Home/components/GoodsItem.vue';
//获取分类面包屑数据
const categoryData = ref({})
const route = useRoute()
const getCategoryFilter = async(id)=>{
  const res = await getCategoryFilterAPI(id)
  categoryData.value = res.result
}

//获取二级分类下的商品数据
const goodsData = ref([])
const reqData = ref({
  categoryId:route.params.id,
  page:1,
  pageSize:20,
  sortField:'publishTime',
})
const getGoodsData = async (req)=>{
  const res = await getSubCategoryAPI(req)
  console.log(res)
  goodsData.value = res.result.items
}

onMounted(()=>{
  getCategoryFilter(route.params.id)
  getGoodsData(reqData.value)
})

//tab切换触发函数
const tabChange = () =>{
  console.log('tab切换',reqData.value.sortField);
  reqData.value.page = 1
  getGoodsData(reqData.value)
}

//无限加载
const disabled = ref(false) // 停止加载条件
const load = async ()=>{
  reqData.value.page++
  const res = await  getSubCategoryAPI(reqData.value)
  goodsData.value = [...goodsData.value, ...res.result.items]
  if(res.result.item.length === 0){
    disabled.value = true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{categoryData.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" >
         <!-- 商品列表-->
        <GoodsItem v-for="goods in goodsData" :key="goods.id"  :goods="goods"/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>