/**
 * Created by liuxiaoya；
 *date 2017/9/25 0025.
 *description
 */
import axios from 'axios';
import {dataHostUrl} from '../api/config.js';
import * as types from './mutation-types'
import {local} from '@/common/js/util'
import router from '../router'
export function getCartNumber({commit, state}) {
  let url = dataHostUrl + "/f/pc/s_10020/spCart/getSpCartNum";
  let params;
   if(local.get('uuid')){
    params= {
      uuid: local.get('uuid')
    }
  }

  return axios.get(url, {params:params}).then((res)=> {
    if(res.data.status === 'success'){
      local.save('cartNum',res.data.data);
      commit(types.SET_CART_NUM,res.data.data);
      return Promise.resolve()
    }
  })
}
