/**
 * Created by zhouxiangbo on 2018/3/4 0004.
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from '@/api/config';
import {getUid,local} from '@/common/js/util';
//获取退换货数据
export function getBackData() {
  const url = dataHostUrl + "/uc/app/s_10020/sporderrefund/list/json?springraintoken="+local.get("springraintoken");
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })

}
