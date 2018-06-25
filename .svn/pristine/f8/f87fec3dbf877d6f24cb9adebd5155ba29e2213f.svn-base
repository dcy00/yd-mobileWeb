/**
 * Created by zhouxiangbo on 2018/3/4 0004.
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from '@/api/config';
//增加地址   省
export function addAdrData() {
  const url = dataHostUrl + "/f/xcx/s_10020/district/list";
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
