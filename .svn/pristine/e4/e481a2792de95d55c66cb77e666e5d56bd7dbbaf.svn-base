/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/9 0009 上午 9:02
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';


export function getRedData(uid,pid){
  let url = dataHostUrl+"/f/pc/s_10020/redpackage/shareData";
  let params = {
    user_id:uid,
    packet_id:pid,
  };
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
