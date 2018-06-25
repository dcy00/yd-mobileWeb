/**
 * Created by liuxiaoya on 2018/2/27 0027.
 */
import axios from 'axios'
import {dataHostUrl} from './config'
//获取商品分类数据
export function getCategory() {
  const url = dataHostUrl + "/f/app/s_10020/loadCategory";
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })

}
