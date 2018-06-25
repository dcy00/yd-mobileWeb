<template>
    <div>
      <header-youde :title="title"></header-youde>
      <div class="wrapper">
        <div class="expressContent">
          <div class="expressHead" v-for="item in data.dtos">
            <p>物流信息：{{item.expressName}}</p>
            <p>运单号：{{item.orderId}}</p>
          </div>
          <ul class="expressList">
            <li v-for="item in data.orderlogList">
              <span class="expressData">{{item.operationTime}}</span>
              <p>{{item.operationView}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import headerYoude from '@/base/header-youde/header-youde';
  import emptyData from '@/base/empty-data/empty-data';
  import { mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import {dataHostUrl} from '@/api/config';
  import {local} from '@/common/js/util';
  export default {
      data(){
          return {
              title:'物流信息',
              orderNo:'',
              data:{}
          }
      },
      created(){
          this.orderNo = this.$route.params.orderNo;
          this._getData();
      },
      methods:{
          _getData(){
            let url = dataHostUrl+"/uc/app/s_10020/sporder/query/express?springraintoken="+local.get('springraintoken');
            let param = {
                orderNo:this.orderNo
            };
            axios.get(url,{params:param}).then((res)=>{
                //console.log(res.data);
                if(res.data.status==='success'){
                  this.data = res.data.data;
                }else{
                    this._toast(res.data.message);
                }
            });
          },
          _toast(msg){
            let tip = Toast(msg);
            setTimeout(()=>{
              tip.close();
            },1500);
          },
          ...mapMutations({
            SET_Loading: 'SET_Loading'
          })
      },
      components:{
          headerYoude,emptyData
      },
      deactivated(){
          this.$destroy()
      }
  }
</script>

<style scoped lang="scss">
  .wrapper{
    padding-top:0.96rem;
    font-size:0.28rem;
    .expressContent{
      padding:0.24rem;
    }
    .expressHead{
      border-bottom:1px solid #efefef;
      padding-bottom:0.2rem;
      p{padding:0.1rem 0;}
    }
    .expressList{
      padding:0.2rem 0;
      li{
        padding:0.06rem 0 0.06rem 0.3rem;
      }
      li:first-child{
        color:#f06751;
        .expressData:before{
          background:#FF5D5D;
        }
      }
      p{line-height:160%;}
      .expressData{
        position:relative;
        display:block;
        margin:0.1rem 0;
        &:before{
          display:block;
          content:'';
          overflow:hidden;
          width:0.2rem;
          height:0.2rem;
          border-radius:50%;
          background: #c9c9c9;
          position:absolute;
          top:50%;
          left:-0.3rem;
          margin-top:-0.1rem;
        }
      }


    }
  }
</style>
