/**
 * Created by liuxiaoya on 2017/12/25 0025.
 */
import axios from 'axios';
import {dataHostUrl} from './config';
export function getSearch(keywords, pageIndex, sort, order, pCateId, secondCategoryId, thridCategoryId, brandId, brandIds) {
  let url = dataHostUrl + '/f/app/s_10020/goods/list/json';
  const data = {
    keywords: keywords,
    pageIndex: pageIndex,
    thridCategoryId: thridCategoryId,
    secondCategoryId: secondCategoryId,
    pCateId: pCateId,
    order: order,
    sort: sort,
    brandId: brandId,
    brandIds: brandIds,
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
export function getCategoryList(id,type, jumpVal, jumpType,pageIndex) {
  let url = dataHostUrl + '/s/s_10020/shop/adver/xcx/getDatas';
  const data = {
    id,type, jumpVal, jumpType,pageIndex
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
//热门搜索
export function getSearchHot(keywords) {
  let url = dataHostUrl + '/f/app/s_10020/advertising/list';
  const data = {
    type: 5
  };
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
//搜索提示
export function getSearchPrompt(keywords) {
  let url = dataHostUrl + '/f/app/s_10020/goods/list/searchlist/json';
  const data = {
      keywords: keywords
    }
  ;
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
/*//需求登记
 export function postRegister(userMobile, userName, content) {
 let url = dataHostUrl + '/f/app/s_10020/spgoodsrequirement/add';
 const data = {
 userMobile,
 userName,
 content
 }
 ;
 return axios.post(url, 'post', {params: data}).then((res) => {
 return Promise.resolve(res.data);
 })
 }*/
//需求登记
export function postRegister(userMobile, userName, goodsName, goodsNum, goodsSpec,content) {
  let url = dataHostUrl + '/f/app/s_10020/spgoodsrequirement/add';
  const data = {
      userMobile,
      userName,
      goodsName,
      goodsNum,
      goodsSpec,
      content
    }
  ;
  return axios.post(url, 'post', {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
