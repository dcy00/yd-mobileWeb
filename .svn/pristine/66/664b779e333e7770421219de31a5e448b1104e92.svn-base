/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/4 0004 上午 9:57
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';

//购物车数据
export function getCartData(uid){
  const url = dataHostUrl + "/f/app/s_10020/spCart/list/json";
  //const url = "https://easy-mock.com/mock/5a976d9fbf507f22394e1410/spCart/cartList";
  //console.log(uid);
  let data = {
    uuid:uid
  };
  return axios.get(url, {params:data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//修改购物车商品数量
export function changeNum(options,uid){
  let url = dataHostUrl + "/f/app/s_10020/spCart/updateCartNum";
  let data = {
      id: options.id,
      chgValue: options.changeType,
      uuid:uid
  };
  return axios.get(url,{params:data}).then((res)=>{
    return Promise.resolve(res.data);
  })
}

//拆分购物车数据
export function splitCartData(data){
  let returnCartList = data.carList[0].spCartList;
  let cartData = {
    hasGlobal:false,
    commonCartList:[],
    globalCartList:[],
  };

  for(let i=0;i<returnCartList.length;i++){

    if (returnCartList[i].goodsGenre===1){

      cartData.commonCartList.push(returnCartList[i]);

    } else if (returnCartList[i].goodsGenre === 2){

      cartData.globalCartList.push(returnCartList[i]);

    }
  }
  if(cartData.globalCartList.length>0){
    cartData.hasGlobal = true;
  }

  return cartData;
}
//重新赋值
export function refreshData(options,cartList){
  let commonList = cartList.commonCartList;
  let globalList = cartList.globalCartList;
  let isGlobal = options.isGlobal;
  let id = options.id;
  let changeType = options.changeType;

  if(isGlobal){
    for(let i=0;i<globalList.length;i++){
      if(globalList[i].id === id){
        globalList[i].num += changeType;
      }
    }
  }else{
    for(let i=0;i<commonList.length;i++){
      if(commonList[i].id === id){
        commonList[i].num += changeType;
      }
    }
  }

  return cartList;
}
export function checkItem(params){
  const url = dataHostUrl + "/f/app/s_10020/spCart/list/json";

  return axios.get(url, {params:params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//检测类型商品是否为全选
export function whetherTypeCheckAll(that){
  let commonList = that.cartList.commonCartList;
  let globalList = that.cartList.globalCartList;
  let cLen = commonList.length;
  let gLen = globalList.length;
  let cSelectedLen = 0;  //普通商品选中的个数
  let gSelectedLen = 0;  //全球购商品选中的个数
  let allLen = cLen+gLen;
  let allSelectedLen = 0;

  for(let i=0;i<cLen;i++){
    if(commonList[i].toOrderState){
      cSelectedLen+=1;
    }
  }
  for(let j=0;j<gLen;j++){
    if(globalList[j].toOrderState){
      gSelectedLen+=1;
    }
  }
  if( cSelectedLen === cLen ){
    that.commonCheckAll=true;
  }else{
    that.commonCheckAll=false;
  }
  if( gSelectedLen === gLen ){
    that.globalCheckAll=true;
  }else{
    that.globalCheckAll=false;
  }
  allSelectedLen = cSelectedLen+gSelectedLen;
  if(allSelectedLen === allLen){
    that.allSelected = true;
  }else{
    that.allSelected = false;
  }
}
//购物车删除
export function cartDel(data,uuid){
  let url = dataHostUrl + "/f/app/s_10020/spCart/deleteByIds";
  let commonList = data.commonCartList;
  let globalList = data.globalCartList;
  let ids = [];
  let commonIds = [];
  let globalIds = [];
  let params = {
    ids:'',
    uuid:uuid
  };

  for(let i=0;i<commonList.length;i++){
    if(commonList[i].toOrderState){
      commonIds.push(commonList[i].id);
    }
  }
  for(let i=0;i<globalList.length;i++){
    if(globalList[i].toOrderState){
      globalIds.push(globalList[i].id);
    }
  }

  ids = commonIds.concat(globalIds);

  params.ids = ids.toString();

  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}
//获取商品活动列表
export function getPromationData(params){
  let url = dataHostUrl+"/f/app/s_10020/spCart/promotion/list/json";
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  });
}
//修改购物车商品活动
export function setPromation(data,cartId,uuid,index){
  let url = dataHostUrl + "/f/app/s_10020/spCart/updateCartPromotion";
  let params = {
    id:cartId,
    promotionId:data[index].proId,
    uuid:uuid
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}

