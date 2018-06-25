/**
 * Created by liuxiaoya on 2017/12/25 0025.
 */
import axios from 'axios';
import {dataHostUrl} from './config';
export function getGroup( sort, order) {
  let url = dataHostUrl + '/f/app/s_10020/spgroupbuying/list/json';
  const data = {
      order: order,
      sort: sort,
    }
  ;
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
