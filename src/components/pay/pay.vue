<template>
    <div class="wrapper">
      <div class="gHeader">
        <div class="f_logo" @click="backHandle">
          <i class="icon iconfont icon-back"></i>
        </div>
        <div class="search-box"><h2>{{title}}</h2></div>
      </div>
      <div class="container">
        <div class="orderInfo disabled">
          <span>订单号：{{orderNo}}</span>
          <span>需支付：<em>￥{{orderMoney/100}}</em></span>
        </div>
        <ul>
          <li class="payItem" :class="{'disabled': userMoney==0}" @click="checkBalance" v-if="userMoney !==0 && globalPurchase !=1 ">
            <span class="iconBox"><img src="./yu_eIcon.png" alt=""></span>
            <span>余额支付</span>
            <span>余额：￥{{userMoney/100}}元</span>
            <label :class="{'active':isBalanceCheck}"></label>
          </li>
          <li class="payItem" :class="{'disabled': userMoney==0 || globalPurchase ==1}" v-else>
            <span class="iconBox"><img src="./yu_eIcon.png" alt=""></span>
            <span>余额支付</span>
            <span>余额：￥{{userMoney/100}}元</span>
            <label></label>
          </li>
        </ul>
        <ul>
          <li class="payItem" v-for="(item,index) in typeList" @click="checkType(index)" :class="{'hide':item.id=='3001'}">
            <span class="iconBox"><img :src="item.logoUrl" alt=""></span>
            <span>{{item.name}}</span>
            <label :class="{'active':item.isCheck}"></label>
          </li>
        </ul>
        <!--<div v-html="aliPayData"></div>-->
        <div class="fixedBtm" @click="payOrder">
          {{btnText}}
        </div>
      </div>
    </div>
</template>

<script>
  import {Toast,MessageBox} from 'mint-ui';
  import {replaceHTMLTag,is_weixin} from '@/common/js/util';
  import { getPayList,balancePay,forWordPay,unescape,aliPay,wxPay } from '@/api/pay';
  import {mapActions,mapMutations} from 'vuex';
  export default {
      data(){
          return {
              title:"支付订单",
              orderNo:'',
              orderUnionId:'',
              orderMoney:0.00,
              typeList:[],
              globalPurchase:0,
              userMoney:0,
              use:0,
              queryBean:'',
              isBalanceCheck:false,
              btnText:'支付订单',
              aliPayData:''
          }
      },
      created(){
          this.orderNo = this.$route.params.orderNo;
          this._getPayList();
          this.SET_Loading(true);
          console.log(this.$route);
      },
      deactivated(){
        this.$destroy()
      },
      methods:{
        //获取支付数据
        _getPayList(){
          let requestData = {
            orderUnionId: this.orderNo,
            formType:2,
            useMoney:1
          };
          this.getCartNumber();
          //console.log(requestData);
          getPayList(requestData).then((res)=>{
              this.SET_Loading(false);
              if(res.status==='success' && res.statusCode==='200'){
                let initTypeList = res.data.typeList;
                this.orderUnionId = res.data.orderUnionId;
                this.orderMoney = res.data.orderMoney;
                this.queryBean = res.queryBean;
                this.use = res.data.use;
                this.userMoney = res.data.userMoney;
                this.globalPurchase = res.data.globalPurchase;
                for(let i=0;i<initTypeList.length;i++){
                  initTypeList[i].isCheck = false;
                  if(initTypeList[i].id==='2001'){//微信环境中不显示支付宝
                      if(is_weixin()){
                        initTypeList.splice(i,1);
                      }
                  }
                }
                this.typeList = initTypeList;
              }else{
                let tip = Toast(res.message);
                setTimeout(()=>{
                  tip.close();
                },1500)
              }
          });
        },
        //支付方式切换
        checkType(index){
          let that = this;
          let initTypeList = that.typeList;
          for(let i=0;i<initTypeList.length;i++){
            initTypeList[i].isCheck = false;
          }
          that.isBalanceCheck = false;
          if(initTypeList[index].isCheck){
            initTypeList[index].isCheck = false;
            that.btnText = "支付订单";
          }else{
            initTypeList[index].isCheck = true;
            that.btnText = "使用"+initTypeList[index].name+"支付￥"+that.orderMoney/100;
          }
        },
        //选择余额支付
        checkBalance(){
          let that = this;
          let initTypeList = that.typeList;
          for(let i=0;i<initTypeList.length;i++){
            initTypeList[i].isCheck = false;
          }
          that.typeList = initTypeList;
          if(that.isBalanceCheck){
            that.isBalanceCheck = false;
            that.btnText = "支付订单";
          }else{
            that.isBalanceCheck = true;
            that.btnText = "使用余额支付￥"+that.orderMoney/100;
          }
        },
        payOrder(){
          let that = this;
          let typeCheckNum = 0;
          let initTypeList = that.typeList;
          let isBalanceCheck = that.isBalanceCheck;
          let forwordParam={
            unionId:that.orderUnionId
          };
          this.SET_Loading(true);
          for(let i=0;i<initTypeList.length;i++){
            if(initTypeList[i].isCheck){
              typeCheckNum+=1;
              if(initTypeList[i].id==='1001'){
                forwordParam.payTypeId = initTypeList[i].id;
              }else if(initTypeList[i].id==='2001'){
                forwordParam.payTypeId = '2002';
              }else if(initTypeList[i].id==='3001'){
                forwordParam.payTypeId = initTypeList[i].id;
              }
            }
          }
          if(!isBalanceCheck && typeCheckNum<1){
            let tip=Toast("您未选择支付方式");
            setTimeout(()=>{
              tip.close();
            },1500);
            return;
          }
          if(isBalanceCheck){
            let balanceParam = {
              orderUnionId:that.orderUnionId,
              useMoney:1,
              payConfigId: '余额支付'
            };

            balancePay(balanceParam).then((res)=>{
              this.SET_Loading(false);
              //console.log(res);
              if(res.status==='success'){
                  this._toast(res.message);
                  setTimeout(()=>{
                    this.$router.replace("/orders/all");
                  },1500);
              }
            });

          }else{
            console.log(forwordParam);
            forWordPay(forwordParam).then((res)=>{
              //console.log(res);
              this.SET_Loading(false);
              if(res.status==='success'&&res.statusCode==='200'){
                if(forwordParam.payTypeId==='1001'){     //微信



                }else if(forwordParam.payTypeId==='2002'){   //支付宝

                    const div = document.createElement('div');
                    div.innerHTML = replaceHTMLTag(res.data);
                    div.style.display = 'none';
                    document.body.appendChild(div);
                    document.getElementsByTagName('form')[0].submit();

                }else if(forwordParam.payTypeId==='3001'){   //网银
                    const div = document.createElement('div');
                    div.innerHTML = replaceHTMLTag(res.data);
                    div.style.display = 'none';
                    document.body.appendChild(div);
                    document.getElementById('pay_form').submit();
                }
              }else{
                  let tip = Toast(res.message);
                  setTimeout(()=>{
                    tip.close();
                  },1500);
              }
            })
          }
        },
        _toast(msg){
            let tip = Toast(msg);
            setTimeout(()=>{
                tip.close();
            },1000);
        },
        backHandle(){
          MessageBox.confirm(this.queryBean,'温馨提示').then((action)=>{
            if(action === 'confirm'){
              this.$router.replace("/orders/all");
            }
          },()=>{});
        },
        ...mapActions({
          getCartNumber: 'getCartNumber'
        }),
        ...mapMutations({
          SET_Loading: 'SET_Loading'
        })
      }
  }
</script>

<style lang="scss" scoped>
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  .container{
    background:none !important;
  }
  .hide{
    display:none !important;
  }
  .gHeader {
    position: fixed;
    width: 100%;
    height: $header-height;
    padding-top: $color-fix-padding;
    line-height: 1.5;
    top: 0;
    left: 0;
    z-index: 2;
    margin: auto;
    right: 0;
    background: #fff;
    border-bottom: 1px solid #e7e7e7;
    .search-wrapper{
      margin-left: 0.48rem;
    }
    .search-box {
      margin: 0 0.48rem;
      text-align: center;
      line-height: $header-height;
      color: #585959;
      h2 {
        font-size: 0.35rem;
      }
    }
    .f_logo {
      box-sizing: border-box;
      width: 0.4rem;
      height: $header-height;
      position: absolute;
      left: 10px;
      text-align: center;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 0.4rem;
        color: #585959;
        font-weight: bold;
      }
    }

  }
  .container{
    padding:0.96rem 0 1.02rem;
    font-size:0.28rem;
    color:#666;
    .disabled{
      background:#f1f2f3;
      span:nth-child(2){
        color:#000;
      }
    }
    .orderInfo{
      height:0.42rem;
      line-height:0.42rem;
      padding:0.25rem;
      border-bottom:1px solid $cart-border-color;
      span{
        display:block;

        &:first-child{
          float:left;
          color:#666;
          font-size:0.24rem;
        }
        &:last-child{
          float:right;
          color:#353535;
          em{
            font-style:normal;
            color:$cart-red-color;
          }
        }
      }
    }
    li.payItem{
      height:0.38rem;
      line-height:0.38rem;
      padding:0.25rem;
      border-bottom:1px solid $cart-border-color;
      span{
        float:left;
        &:nth-child(2){
          margin:0 0.25rem;
        }
        &:nth-child(3){
          font-size:0.22rem;
          color:#999;
        }
        &.iconBox{
          display:block;
          width:0.38rem;
          height:0.38rem;
          overflow:hidden;
          img{
            display:block;
            width:100%;
            height:100%;
          }
        }
      }
      label{
        display:inline-block;
        width: 0.38rem;
        height:0.38rem;
        background:url('checkIcon.png') no-repeat;
        background-size:0.38rem 0.86rem;
        float:right;
        &.active{
          background-position:0 -0.48rem;
        }
      }
    }
    .fixedBtm{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      height:1rem;
      line-height:1rem;
      background:$cart-red-color;
      color:#fff;
      font-size:0.3rem;
      text-align:center;
    }
  }
</style>
