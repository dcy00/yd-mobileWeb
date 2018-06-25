/**
 *company:优德医药网
 *author:caokui
 *data:2018/3/4.
 *summary:
 */
import axios from 'axios'
import {dataHostUrl} from './config.js'
//获取首页图片轮播数据
export function getTurnImages() {
  const url = dataHostUrl + "/f/app/s_10020/advertising/list";
  let param = {
        type:1
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取宫格数据
export function getGongGeData() {
  const url = dataHostUrl + "/f/xcx/s_10020/advertising/list";
  let param = {
        type:4
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取海报数据
export function getHaiBao() {
  const url = dataHostUrl + "/f/app/s_10020/advertising/list";
  let param = {
    type:19
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取自定义广告数据
export function getCustomAdData() {
  const url = dataHostUrl + "/f/xcx/s_10020/advertising/list";
  let param = {
    type:2
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取通栏广告数据
export function getBannerData() {
  const url = dataHostUrl + "/f/xcx/s_10020/advertising/list";
  let param = {
    type:3
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取推荐的商品数据
export function getRecommendData() {
  const url = dataHostUrl + "/f/app/s_10020/goods/recommend/list";
  let param = {
    pageIndex:1
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取秒杀数据seckill
export function getSeckillData() {
  const url = dataHostUrl + "/f/app/s_10020/periods/indexGoods";
  let param = {
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取秒杀数据seckill秒杀Id
export function findPeriodsInfo() {
  const url = dataHostUrl + "/f/app/s_10020/periods/findPeriodsInfo";
  let param = {
    periodsId:""
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取秒杀数据seckill秒杀详情页
export function findSeckillData(periodsId) {
  const url = dataHostUrl + "/f/app/s_10020/periods/findGoodsList";
  let param = {
    periodsId
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取团购数据
/*
* order=排序（saleNum-销量；price-价格；startTime-时间）
 &sort=升降(asc-升;desc-降)&pageIndex=第几页
 * */
export function getGroupData() {
  const url = dataHostUrl + "/f/app/s_10020/spgroupbuying/list/json";
  let param = {

  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
