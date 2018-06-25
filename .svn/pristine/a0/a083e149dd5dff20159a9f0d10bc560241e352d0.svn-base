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
export function getData(data){
  let springraintoken = local.get('springraintoken');
  let url = dataHostUrl+"/uc/app/s_10020/sporder/useRemainderMoney?springraintoken="+springraintoken;
  return axios.get(url,{params:data}).then((res)=>{
    return Promise.resolve(res.data);
  })
}


