<template>
    <div class="successContainer">
      <header-youde :title="title"></header-youde>
      <div class="successCont">
        <i class="icon iconfont icon-duigou"></i>
        <span>订单支付成功！我们将马上为您处理！</span>
      </div>
      <div class="orderInfo">
        <p>订单支付金额：<em>{{payMoney/100}}</em></p>
        <p>订单号：{{orderUnionId}}</p>
      </div>
      <div class="btnCont">
        <router-link to="/" tag="span" class="btn go">继续购物</router-link>
        <span class="btn view" @click="goDetail">订单详情</span>
      </div>
    </div>
</template>

<script>
    import headerYoude from '@/base/header-youde/header-youde';
    import { getData } from '@/api/payCallback';
    import { Toast } from 'mint-ui';

    export default {
        data(){
            return {
                title:'订单支付成功',
                payMoney:'',
                orderUnionId:''
            }
        },
        created(){
            this._getData();
        },
        methods:{
          _getData(){
              let searchString = location.search;
              let orderNo = searchString.split('?')[1].split('&')[10].split('=')[1];
              //console.log(searchString.split('?')[1].split('&'));
              let requestData = {
                orderUnionId: orderNo,
                formType:2,
                useMoney:1
              };
              getData(requestData).then((res)=>{
                  if(res.status==='success'){
//                    console.log(res);
                    this.payMoney=res.data.orderMoney;
                    this.orderUnionId = res.data.orderUnionId;
                  }else{
                    let tip = Toast(res.message);
                    setTimeout(()=>{
                        tip.close();
                    })
                  }
              })
          },
          goDetail(){
              let initId = this.orderUnionId;
              let oId = initId.split('P')[1];
              this.$router.push(`/orderDetail/${oId}/${oId}`);
          }
        },
        components:{
            headerYoude
        },
        deactivated(){
          this.$destroy()
        }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/mixin.scss";
  .successContainer{
    padding:0 0.8rem;
    font-size:0.4rem;
    text-align:center;
    div.successCont{
      margin-top:15%;line-height:0.6rem;padding:0.8rem 0;display:flex;flex-direction: row;align-content: space-around;border-bottom:1px solid #efefef;justify-content: space-around;
      i{font-style:normal;color:#196dfa;font-size:0.6rem;}
      span{color:#333;padding-left:0.2rem;text-align:left;}
    }
    .orderInfo{padding:0.3rem 0;border-bottom:1px solid #efefef;}
    p{
      padding:0.1rem 0;font-size:0.28rem;text-align:left;
      em{font-style:normal;color:#FF5D5D;}
    }
    div.btnCont{
      padding:0.4rem 0;
      text-align:center;width:100%;
      .btn{
        display:inline-block;
        width:40%;
        height:0.6rem;
        line-height:0.6rem;
        font-size:0.3rem;
        text-align:center;
        &.go{
          background:#196dfa;
          color:#fff;
          margin-right:5%;
        }
        &.view{
          border:1px solid #196dfa;
          color:#196dfa;
          margin-left:5%;
        }
      }
    }

  }

</style>
