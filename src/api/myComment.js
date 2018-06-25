/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/26 0026 上午 11:30
 * description:
 */
import axios from 'axios'
import {dataHostUrl} from './config.js'
import {local} from './../common/js/util'

export function getData(pageIndex){
  let springraintoken = local.get('springraintoken');
  let url = dataHostUrl+"/uc/app/s_10020/comment/getCommentList?springraintoken="+springraintoken;
  let param = {
    pageIndex:pageIndex
  };
  return axios.get(url,{params:param}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
