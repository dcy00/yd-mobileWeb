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

//获取订单信息
export function getData(param){
  let springraintoken = local.get('springraintoken');
  let url = dataHostUrl+"/uc/app/s_10020/comment/getComment?springraintoken="+springraintoken;
  return axios.get(url,{params:param}).then((res)=>{
    return Promise.resolve(res.data);
  })
}

//追加评论
export function againCommentUpdate(param){
  let springraintoken = local.get('springraintoken');
  let url = dataHostUrl+"/uc/app/s_10020/comment/updateRecomment?springraintoken="+springraintoken;

  return axios.get(url,{params:param}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
function add0(m){
  return m<10?'0'+m : m;
}
export function timestamp(){
  let time = new Date();
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return ""+y+add0(m)+add0(d)+add0(h)+add0(mm)+add0(s);
}
