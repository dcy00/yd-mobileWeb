<template>
    <div class="container">
      <header-tab :title="title" :titleTab="false" :titleSet="true"></header-tab>
      <div class="wrapper">
        <ul class="tab">
          <li :class="{'active':type=='all'}" @click="changeOrder('')">全部</li>
          <li :class="{'active':type=='0'}" @click="changeOrder('0')">待付款</li>
          <li :class="{'active':type=='2'}" @click="changeOrder('2')">待发货</li>
          <li :class="{'active':type=='5'}" @click="changeOrder('5')">待收货</li>
          <li :class="{'active':type=='6'}" @click="changeOrder('6')">待评价</li>
        </ul>
        <Scroll @scroll="scroll"
                @scrollEndInit="scrollEndInit"
                class="scroll-view"
                ref="scroll"
                :data="initData"
                :pullup="true"
                :listenScroll="true"
                :probe-type="1"  v-if="initData.length>0">
            <ul class="orderList">
              <li v-for="(item,index) in initData" class="overflow">
                <h3 class="overflow">
                  <span class="fl relative"><em v-if="item.globalPurchase">全球购</em>{{item.siteName}}</span>
                  <span class="fr color-gray">{{item.stateStr}}</span>
                </h3>

                <!-- 多个商品 begin -->
                <Scroll :scrollY="false" ref="MultipleItems" v-if="item.orderinfos.length>1" class="overflow itemGoodsCont">
                  <div class="scrollXWrapper" :style="{width: 2.34*item.orderinfos.length+'rem'}">
                    <span class="imgBox fl" v-for="gItem in item.orderinfos" @click='goOrderDetails(index)'><img :src="gItem.pictureUrl" alt=""></span>
                  </div>
                </Scroll>
                <!-- 多个商品 end -->

                <!-- 单个商品 begin -->
                <div @click='goOrderDetails(index)' class="itemGoodsCont overflow" v-for="gItem in item.orderinfos" v-else>
                  <span class="imgBox fl"><img :src="gItem.pictureUrl" alt=""></span>
                  <div class="goodsInfo fl">
                    <p>{{gItem.goodsName}}</p>
                    <p>{{gItem.propertyDes}}</p>
                    <p>
                      <span>￥{{gItem.price/100}}</span>
                    </p>
                  </div>
                </div>
                <!-- 单个商品 end -->

                <div class="itemStateCont overflow">
                  <span class="fl" v-if="item.payType===1">在线支付</span>
                  <span class="fl" v-else>货到付款</span>
                  <span class="fr">共 <em>{{item.totalNum}}</em>件商品 合计:￥{{item.totalPrice/100}}</span>
                </div>
                <div class="itemBtnCont overflow">
                  <template v-if="item.state!=7">

                    <em class="fl red" v-if="item.state==0">{{item.endString}}</em>

                    <router-link :to="/pay/+item.spOrder.unionId" tag="span" class="active fr" v-if="item.state==0">去付款</router-link>

                    <template v-if="item.state==2">
                      <span v-if="item.globalPurchase!=1" @click="cancelOrderHandle(index,item.id)">取消订单</span>
                    </template>
                      <span v-if="item.state==0" @click="cancelOrderHandle(index,item.id)">取消订单</span>
                      <!--<span v-if="item.state==0 || item.state==2" @click="cancelOrderHandle(index,item.id)">取消订单</span>-->


                    <span v-if="item.state==2" @click="remindOrderHandle(item.id)">提醒发货</span>

                    <template v-if="item.state==5">
                      <span class="active" @click="confirmOrderHandle(index,item.id)">确认收货</span>
                      <span @click="delayHandle(item.id)">延长收货</span>
                      <span @click="goExpress(item.id)">物流信息</span>
                    </template>

                    <template v-if="item.state==6">
                      <span class="active" @click="goComment(item.spOrder.id,item.spOrder.mainId)">去评价</span>
                      <span @click="againBuy(item.id)">再次购买</span>
                    </template>

                    <template v-if="item.state==8">
                      <span class="active" @click="againBuy(item.id)">再次购买</span>
                      <span @click="delOrderHandle(index,item.id)">删除订单</span>
                    </template>

                  </template>

                  <template v-else>
                    <span class="active" @click="againBuy(item.id)">再次购买</span>
                    <span @click="delOrderHandle(index,item.id)">删除订单</span>
                  </template>
                </div>
              </li>
            </ul>
            <div v-if="isLoading" style="padding: 10px 0">
              <mt-spinner :size="30" style="display:flex;justify-content: center" type="fading-circle">
              </mt-spinner>
            </div>
        </Scroll>
        <empty-data v-else title="订单列表暂无数据"></empty-data>
      </div>

    </div>
</template>

<script>
  import HeaderTab from '@/base/header-tab/header-tab';
  import EmptyData from '@/base/empty-data/empty-data';
  import Scroll from '@/base/scroll/scroll';
  import GoTop from '@/base/go-top/go-top';
  import { mapMutations }  from 'vuex';
  import { getOrderData,againBuy,cancelOrder,delOrder,remindOrder,confirmOrder,delayOrder } from '@/api/orders';
  import { Toast,MessageBox } from 'mint-ui';
  export default {
    data(){
        return {
          title:['订单中心'],
          initData:[],
          type:'',
          pageIndex: 1,
          pageCount: 1,
          scrollY: 0,
          loaderAll: false,
          isLoading:false,
        }
    },
    mounted(){
      this._getData(this.type);
    },
    created(){
      this.type = this.$route.params.type;
    },
    methods:{
      _getData(state){
          this.SET_Loading(true);
          getOrderData(state,this.pageIndex).then((res)=>{
              this.SET_Loading(false);
              if(res.status==='success'){
                  if(res.data!==undefined){
                      if(res.data.length===0){
                          this.loaderAll = true;
                          this.isLoading = false;
                          return;
                      }
                      this.initData = this.initData.concat(this._addCountDown(res.data));
                      this.pageIndex = res.page.pageIndex + 1;
                  }
                  //页面类型赋值
                  if(state===''){
                    this.type = 'all';
                  }else{
                    this.type = state;
                  }
              }else{
                  this._toast(res.message);
              }
          });
      },
      //往数据里面添加计时数据
      _addCountDown(data){
        let now = Date.parse(new Date());
        for(let i=0;i<data.length;i++){
          let endTime = Date.parse(new Date(data[i].cancelTime));
          let times = (endTime-now)/1000;
          let itemMinute = this._checkTime(parseInt(Math.floor((times / 60) % 60)));
          let itemHour = this._checkTime(parseInt(Math.floor(times / 3600) % 24));

          if (itemMinute > 0 && itemHour>=0){
            data[i].endString = "剩余: " + itemHour + "小时" + itemMinute +"分钟"
          }else{
            data[i].endString = "";
          }
        }
        return data;
      },
      _checkTime(i){
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
      //tab切换
      changeOrder(state){
        this.initData=[];
        this.pageIndex=1;
        this.loaderAll=false;
        this.isLoading=false;
        this._getData(state);
      },
      //再次购买
      againBuy(ids){
        this.SET_Loading(true);
        againBuy(ids).then((res)=>{
            this.SET_Loading(false);
            if(res.status==='success'){
                this._toast(res.message);
                setTimeout(()=>{
                  this.$router.push('/cart');
                },2000);

            }else{
                this._toast(res.message);
            }
        })
      },
      //取消订单
      cancelOrderHandle(index,orderNo){

        this.SET_Loading(true);
        this._messageBox('温馨提示','是否要取消订单').then((res)=>{

          cancelOrder(orderNo).then((res)=>{
            this.SET_Loading(false);
            if(res.status==='success'){
              this._toast(res.message);

              this._changeState(index,'cancel');

            }else{
              this._toast(res.message);
            }
          })
        });

      },
      //改变订单状态
      _changeState(index,iType){
          let initData = this.initData;
          switch(iType){
            case "cancel":
              initData[index].state=8;
              initData[index].stateStr='取消已关闭';
              this.initData = initData;
                break;
            case "delete":
              initData.splice(index,1);
              this.initData = initData;
                break;
            case "delivery":
              initData[index].state=6;
              initData[index].stateStr='待评价';
              this.initData = initData;
                break;
          }
      },
      //删除订单
      delOrderHandle(index,orderNo){
        this.SET_Loading(true);
        this._messageBox('温馨提示','是否要删除订单').then((res)=>{
          if(res){
            delOrder(orderNo).then((res)=>{
              this.SET_Loading(false);
              if(res.status==='success'){
                this._toast(res.message);
                this._changeState(index,'delete');
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
              setTimeout(()=>{
                this._getData(this.type);
              },2000);
            }else{
              this._toast(res.message);
            }
        });
      },
      //确认收货
      confirmOrderHandle(index,orderNo){
        confirmOrder(orderNo).then((res)=>{
            if(res.status==='success'){
                this._toast(res.message);
                this._changeState(index,'delivery')
            }else{
                this._toast(res.message);
            }
        });
      },
      //前往订单详情
      goOrderDetails(index){
        let initData = this.initData;
        let oId = initData[index].spOrder.id;
        let mainId = initData[index].spOrder.mainId;
        this.$router.push('/orderDetail/'+oId+'/'+mainId);
      },
      //前往物流信息
      goExpress(id){
          this.$router.push('/express/'+id);
      },
      //去评价
      goComment(oId,mId){
          this.$router.push('/commentGoods/'+oId+'/'+mId);
      },
      scroll(pos){ //监听滚动
        this.scrollY = pos.y;
      },
      //上拉加载
      scrollEndInit(){
        if (!this.loaderAll) {
          if(!this.isLoading){
              console.log(this.type);
            this._getData(this.type);
          }
          this.isLoading = true;
        }
      },
      goTop(){ //回到顶部
          this.$refs.scroll.scrollTo(0, 0, 500)
      },
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
      ...mapMutations({
          SET_Loading: 'SET_Loading'
      })
    },
    deactivated(){
      this.$destroy()
    },
    components:{
      HeaderTab,
      EmptyData,
      Scroll,
      GoTop
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
  .color-gray{color:#8a8a8a;}
  .relative{position:relative;}
  .container{
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    width:100%;
    height:100%;
    background:#f0f1f3;
  }
  .wrapper{
    font-size:0.28rem;
    .tab {
      position: fixed;
      top: $header-height;
      width: 100%;
      height: $tab-height;
      line-height: $tab-height;
      display: flex;
      background-color: #f5f7f9;
      li {
        color: #444;
        flex: 1;
        font-size: 14px;
        text-align: center;
        &.active {
          color: #377dcc;
          border-bottom: 2px solid #377dcc;
        }
      }
    }
    .scroll-view {
      position: fixed;
      top: 1.76rem;
      width: 100%;
      left: 0;
      bottom: 0;
      overflow: hidden;
    }
    .orderList{
      li{
        background:#fff;
        margin-bottom:0.24rem;
        em{font-style:normal;}
        h3{
          height:1rem;
          line-height:1rem;
          background:#fff;
          border-bottom:1px solid $cart-border-color;
          font-size:0.28rem;
          padding:0 0.24rem;
          em{
            background:$cart-red-color;
            color:#fff;
            font-style:normal;
            font-size:0.24rem;
            padding:0.05rem;
            margin-right:0.1rem;
            @include border-radius(3px);
          }
        }
        .itemGoodsCont,.itemStateCont,.itemBtnCont{
          padding:0.24rem;
        }
        .itemStateCont{
          border-top:1px solid $cart-border-color;
          border-bottom:1px solid $cart-border-color;
          color:#8a8a8a;
        }
        .itemBtnCont{
          line-height:0.6rem;
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
          justify-content: space-around;
          width:5.3rem;
          height:1.56rem;
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
          p:nth-child(3){
            color:$cart-red-color;
          }
        }
      }
    }
  }
</style>
