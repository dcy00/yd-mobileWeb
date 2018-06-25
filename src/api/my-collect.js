/**
 * Created by liuxiaoya on 2017/11/14 0003.
 * 分类列表
 */
import axios from 'axios'
import {dataHostUrl} from './config.js'
import {local} from './../common/js/util'
//收藏列表请求
export function getCollectList(pageIndex) {
  let url = dataHostUrl+'/uc/pc/s_10020/spusercollect/list/json';
  const data = {
      pageIndex: pageIndex,
      collectType: 1,
      springraintoken: local.get('springraintoken')
    };
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
//删除收藏
export function deleteCollect(ids) {
  let url = dataHostUrl+'/uc/pc/s_10020/spusercollect/delete/more';
  const data = {
      ids: ids,
      collectType: 1,
      springraintoken: local.get('springraintoken')
    }
  ;
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
