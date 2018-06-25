/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/20 0020 下午 3:11
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';
import { local } from '@/common/js/util';
let springraintoken = local.get('springraintoken');

//获取优惠券列表
export function getCouponData(tag){
  let url = dataHostUrl+"/uc/app/s_10020/spcoupon/ajaxCouponlist?springraintoken="+springraintoken;
  let param = {
    siteId: 's_10020',
    couponType: tag
  };
  return axios.get(url,{params:param}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
