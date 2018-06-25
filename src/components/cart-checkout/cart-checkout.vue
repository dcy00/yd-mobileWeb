<template>
    <div class="container">
      <header-youde :title="title"></header-youde>
      <div class="addressWrap">
        <div class="addressInfo" @click="goAddress">
          <p>
            <span>{{addressData.recivieName}}</span>
            <span>{{addressData.mobile}}</span>
          </p>
          <p>{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.address}}</p>
        </div>
      </div>

      <div class="columnContainer margin-bottom">
        <ul>
          <li class="idCard noArrow margin-bottom" v-if="data.globalPurchase">
            身份证号 <label>{{cardId}}</label>
            <span class="cardEdit" @click="cardHandle">
              <img src="./cardEdit.png" alt="">
            </span>
          </li>
          <li @click="changePayHandle">
            支付方式
            <span v-if="data.payType==1">在线支付</span>
            <span v-else>货到付款</span>
          </li>
        </ul>
      </div>

      <div class="siteContainer margin-bottom" v-for="(siteItem,index) in data.orderCartList">
        <header class="siteHeader">
          <span>{{siteItem.siteName}}</span>
        </header>
        <div class="siteContent" v-for="gItem in siteItem.cartList">
          <span class="imgBox">
            <img :src="gItem.thumbnail" alt="">
          </span>
          <div class="goodsInfo">
            <p><em v-if="data.globalPurchase">全球购</em>{{gItem.goodsName}}</p>
            <p>{{gItem.specValue}}</p>
            <p>
              <span>￥{{gItem.goodsPrice/100}}</span>
              <span>{{gItem.num}}</span>
            </p>
          </div>
        </div>

        <!--赠品 begin-->
        <div class="siteContent" v-if="siteItem.giftList.length>0" v-for="giftItem in siteItem.giftList">
          <span class="imgBox">
            <img :src="giftItem.imgUrl" alt="">
            <em>赠品</em>
          </span>
          <div class="goodsInfo">
            <p>{{giftItem.name}}</p>
            <p>
              <span>￥{{giftItem.price/100}}</span>
              <span>{{giftItem.num}}</span>
            </p>
          </div>
        </div>
        <!--赠品 end-->

        <div class="columnContainer">
          <ul>
            <li class="noArrow">
              促销
              <span>-￥{{siteItem.promotionMoney/100}}</span>
            </li>
            <li class="noArrow" v-if="data.globalPurchase">
              税费
              <span>+{{siteItem.taxation/100}}</span>
            </li>
            <router-link to="/cartCoupon/shop" tag="li">
              店铺优惠券
              <span v-if="siteItem.couponCount==0">暂无可用店铺券</span>
              <span v-else>
                <em v-if="siteItem.couponId =='' ">请选择店铺券</em>
                <em v-else>-￥{{siteItem.couponMoney/100}}</em>
              </span>
            </router-link>
            <li @click="changeFreightHandle">
              配送方式
              <span>{{freightObj.name}}&nbsp;&nbsp;￥{{freightObj.price/100}}</span>
            </li>
            <li class="textAreaCont noArrow">
              <textarea placeholder="选填：给商家留言" v-model="siteItem.message"></textarea>
            </li>
            <li class="orderTotal noArrow">
              <em class="fl">共{{siteItem.goodsCount}}件商品</em>
              <span class="fr">合计：￥{{siteItem.totalPrice/100}}</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="columnContainer margin-bottom">
        <ul>
          <li @click="setInvoiceHandle">
            发票
            <span v-if="data.invoceId!=''">{{data.invoceDetails}}</span>
            <span v-else>无发票</span>
          </li>
          <router-link to="/cartCoupon/platform" tag="li">
            平台券
            <span v-if="data.couponCount==0">暂无可用平台券</span>
            <span v-else>
              <em v-if="data.platformCouponId==''">请选择店铺券</em>
              <em v-else>-￥{{data.couponMoney/100}}</em>
            </span>
          </router-link>
        </ul>
      </div>
      <div class="costList">
        <ul>
          <li>
            <span>商品金额</span>
            <span>￥{{data.goodsMoney/100}}</span>
          </li>
          <li>
            <span>促销金额</span>
            <span>-￥{{data.promotionMoney/100}}</span>
          </li>
          <li>
            <span>店铺券</span>
            <span>-￥{{data.shopCouponMoney/100}}</span>
          </li>
          <li>
            <span>平台券</span>
            <span>-￥{{data.plateformCouponMoney/100}}</span>
          </li>
          <li>
            <span>实体券</span>
            <span>-￥{{data.entityCouponMoney/100}}</span>
          </li>
          <li>
            <span>总运费</span>
            <span>+￥{{data.totalPostMoney/100}}</span>
          </li>
          <li v-if="data.globalPurchase">
            <span>总税费</span>
            <span>+￥{{data.totalTaxation/100}}</span>
          </li>
        </ul>
      </div>
      <action-sheet :isShow="actionShow" @actionReturn="actionReturnHandle">
        <ul class="actionList" v-if="payActionData.length>0">
          <li v-for="(item,index) in payActionData" @click="checkAction(index)">{{item.payName}}</li>
        </ul>
        <ul class="actionList" v-if="freightinfoDtoList.length>0">
          <li v-for="(item,index) in freightinfoDtoList" @click="checkFreightAction(index)">{{item.name}}</li>
        </ul>
      </action-sheet>
      <div class="cartFixedBtm">
        <cart-fixed-btm :realMoney="realMoney" @createOrder="createOrderHandle"></cart-fixed-btm>
      </div>
    </div>
</template>

<script>
  import { Toast,MessageBox,Indicator } from "mint-ui";
  import headerYoude from "@/base/header-youde/header-youde";
  import actionSheet from "./action-sheet";
  import cartFixedBtm from "./cart-fixed-btm";
  import { getAdrId,getData,freightFn,createOrderData } from "@/api/cartCheckout";
  import { local } from '@/common/js/util';
  export default {
      data(){
          return {
            title:'确认订单',
            addressData:{},
            adrDefaultId:'',
            requestData:{
              memberAddressId:'',
              payType:'',
              invoceId:local.get('invoiceId') || '',
              platformCouponId:local.get('platformCouponId') || '',
              entityCouponId: '',
              orderType: '',
              ostype: '',
              param: [
                {
                  siteId: 's_10020',
                  couponId: local.get('shopCouponId') || '',
                  cartIds: '',
                  freightTemplateId: local.get('freightTemplateId') || '',
                  message: ''
                }
              ]
            },
            payActionData:[],
            shippingActionData:[],
            cardId:'',
            actionShow:false,
            data:{},
            freightObj:{},
            realMoney:0.00,
            freightinfoDtoList:[]
          }
      },
      created(){
          this.requestData.param[0].cartIds = this.$route.params.ids;
          //console.log(this.requestData.param[0].cartIds);
          this._getData();
      },
      deactivated(){
        this.$destroy()
      },
      methods:{
        _getData(){
            let that = this;
            that._Indicator('加载中...');
            getAdrId().then((res)=>{
                Indicator.close();
                if(res.status==='success' && res.statusCode==='200'){
                    if(res.data!==undefined){
                        that.adrDefaultId = res.data.id;
                        that.requestData.memberAddressId = res.data.id;
                        that.addressData = res.data;

                        getData(that.requestData).then((res)=>{
                            console.log(res);
                            if(res.data !== undefined){
                                that.payActionData = res.data.payList;
                                that.data = res.data;
                                that.freightObj = freightFn(res.data.orderCartList);
                                that.realMoney = parseInt(res.data.realMoney);
                                local.save('invoiceId',res.data.invoceId);
                            }else{
                                let tip = Toast(res.message);
                                setTimeout(()=>{
                                    tip.close();
                                    this.$router.back();
                                },1000);
                            }
                        })


                    }else{
                        let instance = Toast('请编辑收货地址');
                        setTimeout(() => {
                          instance.close();
                          that.$router.push("/addAdr");
                        }, 2000);
                    }
                }
            })
        },
        cardHandle(){
          let that = this;
          let cardTest = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          MessageBox.prompt('因海关需要，请填写收货人的身份证号','身份证号').then(({ value, action }) => {

            if(cardTest.test(value)){
              that.cardId = value;
            }else{
              let tip = Toast("身份证格式不正确");
              setTimeout(()=>{
                  tip.close();
              },1500);
            }

          },()=>{});
        },
        goAddress(){
            //window.location.href='/address';
          this.$router.push('/address');
        },
        changePayHandle(){
          this.actionShow = true;
          this.payActionData = this.data.payList;
          this.freightinfoDtoList = [];
        },
        changeFreightHandle(){
            let initData = this.data;
            this.actionShow = true;
            this.payActionData = [];
            this.freightinfoDtoList=initData.orderCartList[0].freightinfoDtoList;
        },
        actionReturnHandle(option){
            this.actionShow = option.isShow;
        },
        checkAction(index){
          this.actionShow = false;
          this.data.payType = this.payActionData[index].payTypeId;
          //console.log(this.payActionData[index].payTypeId+":"+this.payActionData[index].payName);
        },
        checkFreightAction(index){
          let initData = this.data;
          let initFreightData = this.freightinfoDtoList;
          initData.orderCartList[0].freightTemplateId = initFreightData[index].templateId;
          initData.orderCartList[0].postMoney = initFreightData[index].price;
          this.freightObj = freightFn(initData.orderCartList);
          this.actionShow = false;
        },
        //提交订单
        createOrderHandle(opt){
          if(opt.isBl){
            //此处为结算事件
            this._settlementHandle();
          }
        },
        //提交订单事件处理函数
        _settlementHandle(){
          let that = this;
          let initData = that.data;

          if(initData.globalPurchase){
            if(that.cardId===''){
              that._toast('此商品为全球购商品，身份证号不能为空');
              return false;
            }else{
              initData.idCard = that.cardId;
              initData.globalPurchase = 1;
            }
          }
          that._Indicator('提交中...');
          createOrderData(initData,that.adrDefaultId).then((res)=>{
              Indicator.close();
              if(res.status==='success' && res.statusCode==='200'){
                that.$router.replace('/pay/'+res.data.orderNo)
              }else{
                  let tip = Toast(res.message);
                  setTimeout(()=>{
                      tip.close();
                  },2000)
              }
          })
        },
        //发票
        setInvoiceHandle(){
          let initData = this.data;
          let sites = [];
          for(let i=0;i<initData.orderCartList.length;i++){
            sites.push(initData.orderCartList[i].siteId);
          }
          this.$router.push('/invoice/'+sites.toString());
        },
        _toast(msg){
            let tip = Toast(msg);
            setTimeout(()=>{
                tip.close();
            },1500);
        },
        _Indicator(text){
          Indicator.open({
            text: text,
            spinnerType: 'fading-circle'
          });
        },
      },
      components:{
        headerYoude,
        cartFixedBtm,
        actionSheet
      }
  }
</script>

<style lang="scss" scoped>
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  $color-font:#484848;
  .container{
    width:100%;
    font-size:0.28rem;
    color:#484848;
    padding:0.96rem 0 1.3rem;
    background:#f0f1f3;
    .margin-bottom{
      margin-bottom:0.24rem;
    }
    .addressWrap{
      margin:0.24rem;
      padding:0.15rem;
      background-color:#3d8ac3;
      color:#fff;
      position:relative;
      @include border-radius();
      &:after{
        display:block;
        content:'';
        overflow:hidden;
        width: 0.2rem;
        height:0.2rem;
        border-top:1px solid #fff;
        border-right:1px solid #fff;
        transform:rotate(45deg);
        position:absolute;
        top:50%;
        right:0.15rem;
        margin-top:-0.11rem;
      }
      .addressInfo{
        padding-right:0.3rem;
        p{
          padding:0.06rem 0;
          line-height:140%;
          span:nth-child(2){
            padding-left:0.24rem;
          }
        }
      }
    }
    .columnContainer{
      width:100%;
      em{font-style:normal;}
      li{
        position:relative;
        padding:0 0.24rem;
        height:1rem;
        line-height:1rem;
        background:#fff;
        border-bottom:1px solid $cart-border-color;
        &.noArrow{
          span{
            padding-right:0;
          }
          &:after{
            display:none;
          }
        }
        &:after{
          display:block;
          content:'';
          overflow:hidden;
          width: 0.2rem;
          height:0.2rem;
          border-top:1px solid $color-font;
          border-right:1px solid $color-font;
          transform:rotate(45deg);
          position:absolute;
          top:50%;
          right:0.24rem;
          margin-top:-0.11rem;
        }
        span{
          float:right;
          padding-right:0.24rem;
        }
        &.idCard{
          label{
            padding-left:0.15rem;
          }
          .cardEdit{
            display:block;
            width:0.48rem;
            height:0.48rem;
            margin-top:0.26rem;
            overflow:hidden;
            img{
              display:block;
              width:100%;
              height:100%;
            }
          }
        }
        &.textAreaCont{
          height:auto !important;
          padding:0.24rem;
          textarea{
            display:block;
            width:100%;
            height:0.8rem;
            padding:0.1rem;
            border:1px solid #ccc;
            box-sizing:border-box;
            outline: none;
            @include border-radius(3px);
          }
        }
        &.orderTotal{
          em{font-style:normal;}
        }
      }
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
    .costList{
      width:100%;
      background:#fff;
      padding:10px 0;
      overflow:hidden;
      li{
        display:flex;
        flex-direction: row;
        align-items: stretch;
        width:40%;
        height:0.6rem;
        line-height: 0.6rem;
        padding:0 5%;
        float:left;
        span{
          display:block;
          width:50%;
          &:last-child{
            text-align:right;
          }
        }
      }
    }
    .cartFixedBtm{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
    }
    .actionList li{
      width:100%;
      height:1rem;
      line-height:1rem;
      border-bottom:0.1rem solid #f3f3f3;
      text-align:center;
    }
  }
</style>
