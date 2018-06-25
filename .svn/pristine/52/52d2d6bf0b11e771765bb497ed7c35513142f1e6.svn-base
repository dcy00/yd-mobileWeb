/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2018/3/12 0012 上午 11:54
 * description:
 */
import axios from 'axios';
import {dataHostUrl} from './config.js';
import {local} from '@/common/js/util';

let springraintoken = local.get('springraintoken');

//
export function getInvoice(){
  let url = dataHostUrl+'/uc/app/s_10020/invoiceList?springraintoken='+springraintoken;

  return axios.get(url,{params:{}}).then((res)=>{
    //return Promise.resolve(res.data);
    console.log(res.data);
  })
}
//店铺是否可开发票
export function verfiyOpenInvoice(id){
  let url = dataHostUrl+'/uc/app/s_10020/verfiyOpenInvoice?springraintoken='+springraintoken;
  let data = {
    siteIds:id
  };
  return axios.get(url,{params:data}).then((res)=>{
    return Promise.resolve(res.data);
  })
}

//保存发票
export function saveInvoice(type,data){
  let url = dataHostUrl+'/uc/app/s_10020/saveSpInvoice?springraintoken='+springraintoken;
  let invoiceId = local.get('invoiceId');
  switch(type){
    case '1':
      if(invoiceId){
        data.id = invoiceId;
      }
      return axios.get(url,{params:data}).then((res)=>{
        //console.log(res.data);
        return Promise.resolve(res.data);
      });
      break;
    case '2':
      let paramData = new URLSearchParams();

      paramData.append('invoiceType',2);
      paramData.append('companyName',data.companyName);
      paramData.append('code',data.code);
      paramData.append('regAddress',data.regAddress);
      paramData.append('regMobile',data.regMobile);
      paramData.append('bankName',data.bankName);
      paramData.append('bankAccount',data.bankAccount);
      paramData.append('license',data.license);
      paramData.append('certificates',data.certificates);
      paramData.append('content','明细');

      if(invoiceId){
        paramData.append('id',invoiceId)
      }

      return axios.post(url,paramData).then((res)=>{
        //console.log(res.data);
        return Promise.resolve(res.data);
      });
      break;
  }

}

//删除发票
export function delInvoice(){
  let url = dataHostUrl+"/uc/app/s_10020/deleteSpInvoice?springraintoken="+springraintoken;
  let param = {
    id:local.get('invoiceId')
  };
  return axios.get(url,{params:param}).then((res)=>{
    return Promise.resolve(res.data);
  })
}
