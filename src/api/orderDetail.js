/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/15 0015 下午 1:25
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';
import {local} from '@/common/js/util';

let springraintoken = local.get('springraintoken');

//获取订单详情
export function getOrderDetail(params){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/detail?springraintoken="+springraintoken;
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}

//再次购买
export function againBuy(ids){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/againBuy?springraintoken="+springraintoken;
  let params={
    orderNo:ids
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//取消订单
export function cancelOrder(orderNo){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/cancelOrder?springraintoken="+springraintoken;
  let params={
    orderNo:orderNo
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//删除订单
export function delOrder(orderNo){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/deleteOrder?springraintoken="+springraintoken;
  let params={
    orderNo:orderNo
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//提醒发货
export function remindOrder(orderNo){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/reminder/delivery?springraintoken="+springraintoken;
  let params={
    orderNo:orderNo
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//延长收货
export function delayOrder(orderNo){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/upDatedelay?springraintoken="+springraintoken;
  let params={
    orderNo:orderNo
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//确认收货
export function confirmOrder(orderNo){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/confirmReceipt?springraintoken="+springraintoken;
  let params={
    orderNo:orderNo
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
