<template>
    <div class="container">
      <header-youde :title="title"></header-youde>
      <div class="detailWrapper">
        <div class="statusWrap">
          <div class="statusText overflow">
            <span class="statusIcon"></span>
            <span>{{initData.orderStateStr}}</span>
          </div>
          <div class="addressInfo">
            <p><span>{{memberAddress.recivieName}}</span><span>{{memberAddress.mobile}}</span></p>
            <p>{{memberAddress.province}}{{memberAddress.city}}{{memberAddress.area}}{{memberAddress.address}}</p>
          </div>
        </div>
        <div class="siteContainer margin-bottom">
          <header class="siteHeader">
            <span>{{initData.siteName}}</span>
          </header>
          <div class="siteContent" v-for="item in orderInfoList">
            <span class="imgBox">
              <img :src="item.pictureUrl" alt="">
            </span>
            <div class="goodsInfo">
              <p><em v-if="item.goodsGenre===2">全球购</em>{{item.goodsName}}</p>
              <p>{{item.propertyDes}}</p>
              <p>
                <span>￥{{item.price/100}}</span>
                <span>x{{item.num}}</span>
              </p>
            </div>
          </div>

          <!--赠品 begin-->
          <div class="siteContent" v-if="initData.giftList.length>0" v-for="giftItem in initData.giftList">
          <span class="imgBox">
            <img :src="giftItem.imgUrl" alt="">
            <em>赠品</em>
          </span>
            <div class="goodsInfo">
              <p>{{giftItem.name}}</p>
              <p>adad</p>
              <p>
                <span>￥{{giftItem.price/100}}</span>
                <span>x 1</span>
              </p>
            </div>
          </div>
          <!--赠品 end-->
        </div>

        <ul class="orderInfo margin-bottom">
          <li>
            <label>订单编号：</label>
            <span>{{initData.id}}</span>
            <!--<em>复制</em>-->
            <button class="copyHandle" v-clipboard:copy="initData.id" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
          </li>
          <li>
            <label>下单时间：</label>
            <span>{{initData.startTime}}</span>
          </li>
          <li>
            <label>支付方式：</label>
            <span v-if="initData.payType=='1'">在线支付</span>
            <span v-else>货到付款</span>
            <em class="gray">{{initData.orderStateStr}}</em>
          </li>
          <li>
            <label>配送方式：</label>
            <span>{{initData.wuliuName}}</span>
          </li>
          <li>
            <label>发票抬头：</label>
            <span v-if="spInvoice.title!=undefined">{{spInvoice.title}}</span>
            <!--<span v-else>企业发票</span>-->
          </li>
          <li>
            <label>发票内容：</label>
            <span>{{spInvoice.content}}</span>
          </li>
        </ul>
        <ul class="priceDtos margin-bottom">
          <li v-for="item in priceDtos">
            <label>{{item.name}}</label>
            <span>{{item.price}}</span>
          </li>
        </ul>
      </div>
      <div class="fixedBtm" v-if="orderInfoList.length">
        <div class="detailBtnCont overflow">
          <template v-if="initData.orderState!=7">

            <em class="fl red" v-if="initData.orderState==0"></em>

            <router-link :to="/pay/+initData.unionId" tag="span" class="active fr" v-if="initData.orderState==0">去付款</router-link>

            <template v-if="initData.orderState==2">
              <span v-if="initData.globalPurchase!=1" @click="cancelOrderHandle(initData.id)">取消订单</span>
            </template>
            <span v-if="initData.orderState==0" @click="cancelOrderHandle(initData.id)">取消订单</span>

            <span v-if="initData.orderState==2" @click="remindOrderHandle(initData.id)">提醒发货</span>

            <template v-if="initData.orderState==5">
              <span class="active" @click="confirmOrderHandle(initData.id)">确认收货</span>
              <span @click="delayHandle(initData.id)">延长收货</span>
              <span @click="goExpress(initData.id)">物流信息</span>
            </template>

            <template v-if="initData.orderState==6">
              <span class="active" @click="goComment(initData.id,initData.mainId)">去评价</span>
              <span @click="againBuy(initData.id)">再次购买</span>
            </template>

            <template v-if="initData.orderState==8">
              <span class="active" @click="againBuy(initData.id)">再次购买</span>
              <span @click="delOrderHandle(initData.id)">删除订单</span>
            </template>

          </template>

          <template v-else>
            <span class="active" @click="againBuy(initData.id)">再次购买</span>
            <span @click="delOrderHandle(initData.id)">删除订单</span>
          </template>
        </div>
      </div>
    </div>

</template>

<script>
  import headerYoude from '@/base/header-youde/header-youde';
  import { getOrderDetail,againBuy,cancelOrder,delOrder,remindOrder,confirmOrder,delayOrder } from '@/api/orderDetail';
  import { Toast,MessageBox } from 'mint-ui';
  import { mapMutations }  from 'vuex';
  export default {
    data(){
      return {
          title:'订单详情',
          requestData:{
            orderId:'',
            orderMainId:''
          },
          initData:{},
          memberAddress:{},
          spInvoice:{},
          priceDtos:[],
          orderInfoList:[]
      }
    },
    created(){
      this.requestData.orderId = this.$route.params.orderId;
      this.requestData.orderMainId = this.$route.params.orderMainId;
      this._getData(this.requestData);
    },
    methods:{
      //获取数据
      _getData(params){
        this.SET_Loading(true);
        getOrderDetail(params).then((res)=>{
            this.SET_Loading(false);
            if(res.status==='success'){

              this.initData = res.data;
              this.memberAddress = res.data.memberaddress;

              this.priceDtos = res.data.orderDetailPriceDtos;
              this.orderInfoList = res.data.orderInfoList;

              if(res.data.spInvoice!==undefined){
                this.spInvoice = res.data.spInvoice;
              }

            }else{
                this._toast(res.message);
            }
        });
      },
      //再次购买
      againBuy(ids){
        this.SET_Loading(true);
        againBuy(ids).then((res)=>{
          this.SET_Loading(false);
          if(res.status==='success'){
            this._toast(res.message);
            setTimeout(()=>{
              location.href='/cart';
            },2000);

          }else{
            this._toast(res.message);
          }
        })
      },
      //取消订单
      cancelOrderHandle(orderNo){
        this.SET_Loading(true);
        this._messageBox('温馨提示','是否要取消订单').then((res)=>{
          cancelOrder(orderNo).then((res)=>{
            this.SET_Loading(false);
            if(res.status==='success'){
              this._toast(res.message);
              setTimeout(()=>{
                this._changeState('cancel');
              },2000);
            }else{
              this._toast(res.message);
            }
          })
        });

      },
      //删除订单
      delOrderHandle(orderNo){
        this.SET_Loading(true);
        this._messageBox('温馨提示','是否要删除订单').then((res)=>{
          if(res){
            delOrder(orderNo).then((res)=>{
              this.SET_Loading(false);
              if(res.status==='success'){
                this._toast(res.message);
                setTimeout(()=>{
                  this.$router.replace('/orders/all');
                },2000);
              }else{
                this._toast(res.message);
              }
            })
          }
        });
      },
      //提醒发货
      remindOrderHandle(orderNo){
        remindOrder(orderNo).then((res)=>{
          if(res.status==='success'){
            this._toast(res.message);
          }else{
            this._toast(res.message);
          }
        });
      },
      //延长收货
      delayHandle(orderNo){
        delayOrder(orderNo).then((res)=>{
          if(res.status==='success'){
            this._toast(res.message);
          }else{
            this._toast(res.message);
          }
        });
      },
      //确认收货
      confirmOrderHandle(orderNo){
        confirmOrder(orderNo).then((res)=>{
          if(res.status==='success'){
            this._toast(res.message);
            setTimeout(()=>{
              this._changeState('delivery');
            },2000);
          }else{
            this._toast(res.message);
          }
        });
      },
      //去评价
      goComment(oId,mId){
        this.$router.push('/commentGoods/'+oId+'/'+mId);
      },
      //前往物流信息
      goExpress(id){
        this.$router.push('/express/'+id);
      },
      //提示
      _toast(msg){
        let tip = Toast(msg);
        setTimeout(()=>{
          tip.close();
        },1500)
      },
      //二次确认框
      _messageBox(title,msg){
        return MessageBox({
          title:title,
          message:msg,
          showCancelButton: true
        }).then((action)=>{
          if(action==='confirm'){
            return Promise.resolve(true);
          }else{
            return Promise.resolve(false);
          }
        })
      },
      //改变订单状态
      _changeState(iType){
        let initData = this.initData;
        switch(iType){
          case "cancel":
            initData.orderState=8;
            initData.orderStateStr='取消已关闭';
            this.initData = initData;
            break;
          case "delivery":
            initData.orderState=6;
            initData.orderStateStr='待评价';
            this.initData = initData;
            break;
        }
      },
      //复制
      onCopy(){
        this._toast('复制成功！');
      },
      onError(){
        this._toast('复制失败！');
      },
      ...mapMutations({
        SET_Loading: 'SET_Loading'
      })
    },
    deactivated(){
      this.$destroy()
    },
    components:{
      headerYoude
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  .fl{float:left;}
  .fr{float:right;}
  .overflow{overflow:hidden;}
  .red{color:#FF5D5D;}
  .container{
    background:#f0f1f3;
  }
  .detailWrapper{
    padding:$header-height 0 1.08rem;
    font-size:0.28rem;
    .statusWrap{
      width:100%;
      height:2rem;
      background:#114076;
      color:#fff;
      position:relative;
    }
    .statusText{
      height:0.8rem;
      line-height:0.8rem;
      padding:0.24rem 0.24rem 0;
      span{
        &.statusIcon{
          display:block;
          width:0.38rem;
          height:0.38rem;
          border:1px solid #fff;
          -webkit-box-sizing:border-box;
          -moz-box-sizing:border-box;
          box-sizing:border-box;
          border-radius:50%;
          position:relative;
          margin:0.2rem 0 0;
          float:left;
          &:after{
            display:block;
            content:'';
            overflow:hidden;
            width:0.3rem;
            height:0.3rem;
            background:#114076;
            position:absolute;
            top:-0.08rem;
            left:-0.08rem;
            padding:0;
            z-index:1;
          }
          &:before{
            display:block;
            content:'';
            overflow:hidden;
            width:0.12rem;
            height:0.14rem;
            border-right:1px solid #fff;
            border-bottom:1px solid #fff;
            position:absolute;
            top:50%;
            left:50%;
            margin:-0.1rem 0 0 -0.1rem;
            z-index:2;
          }
        }
        &:last-child{
          display:inline-block;
          height:0.5rem;
          line-height:0.5rem;
          margin-left:0.24rem;
        }
      }
    }
    .addressInfo{
      width:6.54rem;
      background:#3d8ac3;
      color:#fff;
      @include border-radius();
      padding:0.24rem;
      position:absolute;
      left:0.24rem;
      right:0.24rem;
      bottom:-0.5rem;
      p{padding:0.1rem 0;}
      p:first-child{
        span:last-child{padding-left:0.24rem;}
      }
    }
  }
  .siteContainer{
    margin-top:0.8rem;
  }
  .siteHeader{
    height:1rem;
    line-height:1rem;
    background:#fff;
    border-bottom:1px solid $cart-border-color;
    position:relative;
    &:before{
      display:block;
      content:"";
      overflow:hidden;
      width:0.12rem;
      height:0.4rem;
      background:#02a8df;
      position:absolute;
      top:50%;
      left:0;
      border-top-right-radius:3px;
      border-bottom-right-radius:3px;
      margin-top:-0.2rem;
    }
    span{
      padding-left:0.24rem;
    }
  }
  .siteContent{
    display:flex;
    flex-direction: row;
    padding:0.24rem;
    background:#fff;
    border-bottom:1px solid $cart-border-color;
    .imgBox{
      display:block;
      width:1.56rem;
      height:1.56rem;
      margin-right:0.15rem;
      position:relative;
      img{
        width:100%;
        height:100%;
      }
      em{
        display:block;
        position:absolute;
        right:0;
        bottom:0;
        background:$cart-red-color;
        color:#fff;
        font-style:normal;
        font-size:0.24rem;
        padding:0.05rem;
        /*@include border-radius(3px);*/
      }
    }
    .goodsInfo{
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      width:5.3rem;
      p:first-child{
        line-height:140%;
        em{
          color:#fff;
          background:$cart-red-color;
          margin-right:0.05rem;
          font-style:normal;
          padding:0.04rem 0.06rem;
          font-size:0.22rem;
          @include border-radius(3px);
        }
      }
      p:nth-child(2){
        color:#8a8a8a;
        font-size:0.24rem;
      }
      p:last-child{
        display:flex;
        flex-direction: row;
        align-items: flex-end;
        span{
          display:inline-block;
          width:50%;
          &:first-child{
            color:$cart-red-color;
          }
          &:last-child{
            text-align:right;
          }
        }
      }
    }
  }
  .margin-bottom{
    margin-bottom:0.24rem;
  }
  .orderInfo{
    padding:0.24rem;
    background:#fff;
    li{
      height:0.6rem;
      line-height: 0.6rem;
      overflow:hidden;
      label{float:left;}
      span{float:left;}
      button.copyHandle{
        height:0.54rem;
        background:none;
        border:1px solid $cart-border-color;
        padding:0 0.3rem;
        float:right;
        font-style:normal;
        @include border-radius(0.27rem);
      }
      em.gray{
        color:#999;
        float:right;
      }
      label,span,em{
        display:inline-block;
        font-style:normal;
      }
    }
  }
  .priceDtos{
    padding:0.24rem;
    background:#fff;
    li{
      height:0.6rem;
      line-height: 0.6rem;
      overflow:hidden;
      label{float:left;}
      span{float:right;}
      label,span{
        display:inline-block;
      }
      &:last-child span{
        color:#1661df;
      }
    }
  }
  .fixedBtm{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    padding:0.24rem;
    background:#fff;
    -webkit-box-shadow:0 0 10px rgba(0,0,0,0.2);
    -moz-box-shadow:0 0 10px rgba(0,0,0,0.2);
    box-shadow:0 0 10px rgba(0,0,0,0.2);
  }
  .detailBtnCont{
    line-height:0.6rem;
    font-size:0.28rem;
    em{float:left;}
    span{
      display:inline-block;
      width:1.75rem;
      height:0.6rem;
      line-height:0.6rem;
      text-align:center;
      -webkit-box-sizing:border-box;
      -moz-box-sizing:border-box;
      box-sizing:border-box;
      @include border-radius(0.3rem);
      border:1px solid $cart-border-color;
      margin-left:0.2rem;
      float:right;
      &.active{
        color:#1661df;
        border:1px solid #1661df;
      }
    }
  }
</style>
