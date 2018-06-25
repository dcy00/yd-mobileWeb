/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/7 0007 上午 9:41
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';
import {local} from '@/common/js/util';
//获取默认地址ID
export function getAdrId(){
  let springraintoken = local.get('springraintoken');
  let getUrl = dataHostUrl + "/uc/app/s_10020/getDefaultMemeberAddress";
  let data = {
    springraintoken:springraintoken
  };
  return axios.get(getUrl, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
//获取确认订单数据
export function getData(params){
  let springraintoken = local.get('springraintoken');
  let url = dataHostUrl+"/uc/app/s_10020/sporder/calculatedMoney?springraintoken="+springraintoken;
  let siteParam = [
    {
      siteId: 's_10020',
      couponId: params.param[0].couponId,
      cartIds: params.param[0].cartIds,
      freightTemplateId: params.param[0].freightTemplateId,
      message: params.param[0].message
    }
  ];
  let getDataParam = {
    memberAddressId: params.memberAddressId,
    payType: params.payType,
    invoceId: params.invoceId,
    platformCouponId: params.platformCouponId,
    entityCouponId: params.entityCouponId,
    orderType: params.orderType,
    ostype: params.ostype,
  };
  getDataParam.param = JSON.stringify(siteParam);
  console.log(getDataParam);
  return axios.get(url,{params:getDataParam}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
//拆分出物流方式
export function freightFn(orderCartList){
  var freightObj = {};
  for (var i = 0; i < orderCartList.length; i++) {
    var freightId = orderCartList[i].freightTemplateId;
    var freightList = orderCartList[i].freightinfoDtoList;
    for (var j = 0; j < freightList.length; j++) {
      if (freightList[j].templateId == freightId) {
        freightObj.name = freightList[j].name;
        freightObj.price = freightList[j].price;
        freightObj.freightTemplateId = freightId;
        local.save('freightTemplateId',freightId);
      }
    }
  }
  return freightObj;
}
//提交订单
export function createOrderData(initData,adrDefaultId){
  let springraintoken = local.get('springraintoken');
  let url = dataHostUrl+"/uc/app/s_10020/sporder/createOrder?springraintoken="+springraintoken;
  let siteParam = [
    {
      siteId: 's_10020',
      couponId: initData.orderCartList[0].couponId,
      cartIds: initData.orderCartList[0].cartIds,
      freightTemplateId: initData.orderCartList[0].freightTemplateId,
      message: ''
    }
  ];

  let paramData = new URLSearchParams();
  paramData.append('memberAddressId',adrDefaultId);
  paramData.append('payType',initData.payType);
  paramData.append('invoceId',initData.invoceId);
  paramData.append('platformCouponId',initData.platformCouponId);
  paramData.append('entityCouponId',initData.entityCouponId);
  paramData.append('orderType',initData.orderType);
  paramData.append('ostype',initData.ostype);
  paramData.append('param',JSON.stringify(siteParam));

  if(initData.globalPurchase){
    paramData.append('idCard',initData.idCard);
    paramData.append('globalPurchase',1);
  }
  //params.param = JSON.stringify(siteParam);
  //console.log(url);
  return axios.post(url,paramData).then((res)=>{
    return Promise.resolve(res.data);
  });

}
