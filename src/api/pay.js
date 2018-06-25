/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/9 0009 上午 9:02
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';
import {local} from '@/common/js/util';

let springraintoken = local.get('springraintoken');

//获取支付方式
export function getPayList(data){
  let springraintoken = local.get('springraintoken');
  let url = dataHostUrl+"/uc/app/s_10020/sporder/useRemainderMoney?springraintoken="+springraintoken;
  return axios.get(url,{params:data}).then((res)=>{
    return Promise.resolve(res.data);
  })
}

//余额支付
export function balancePay(data){
  let url = dataHostUrl+"/uc/app/s_10020/sporder/payOrder?springraintoken="+springraintoken;
  return axios.get(url,{params:data}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
export function forWordPay(data){
  let url = dataHostUrl+"/uc/app/s_10020/pay/forword?springraintoken="+springraintoken;
  return axios.get(url,{params:data}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//支付宝
export function aliPay(){
  let url = dataHostUrl+"/cbspay/dopay";
  let params = {
    WIDout_trade_no:'21313e213',
    WIDsubject:'2321323',
    WIDtotal_fee:0.01,
    WIDshow_url:'www.baidu.com',
    WIDbody:'youde'
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//微信支付
export function  wxPay(){


}














export function unescape(html){
  return html
    .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "\'");
}

