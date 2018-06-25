/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/17 0017 上午 11:09
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';
import {local} from '@/common/js/util';

let springraintoken = local.get('springraintoken');
///uc/xcx/s_10020/spuserassets/find/mybalance

//获取数据
export function getData(url,data){

  let requestUrl = dataHostUrl + url +"?springraintoken="+springraintoken;

  return axios.get(requestUrl,{params:data}).then((res)=>{
    return Promise.resolve(res.data);
  })

}
