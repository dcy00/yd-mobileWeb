<template>
  <div class="cartWrap">

    <header-youde title="购物车" :hasBack="false" :edit="true" @editHandle="editHandle" v-if="hasData"></header-youde>
    <header-youde title="购物车" :hasBack="false" :edit="false" @editHandle="editHandle"v-else></header-youde>
    <div class="wrapPadding" v-if="hasData">

      <!-- 普通商品 begin -->
      <div class="cartList" v-if="cartList.commonCartList.length>0">
        <div class="listHeader">
          <label :class="{'active': commonCheckAll}" @click="typeSelectHandle('common')"></label>
          <span>优德电商平台</span>
        </div>
        <ul>
          <li class="listItem" v-for="(item,index) in cartList.commonCartList">
            <div class="listItemContainer">
              <div class="checkBox">
                <label :class="{'active': item.toOrderState==1}" @click="checkItemHandle(item.id,item.toOrderState)"></label>
              </div>

              <router-link :to="/goodsDetail/+item.goodsId" tag="span" class="goodsImg">
                <img :src="item.thumbnail" alt="" class="imgSize">
              </router-link>
              <div class="goodsRight">
                <h3 class="goodsName">{{item.goodsName}}</h3>
                <span class="goodsSize">{{item.specValue}}</span>
                <div class="goodsRightBtm">
                  <span class="goodsPrice">¥{{item.goodsPrice/100}}</span>
                  <cart-changeNum :isGlobal="false" :id="item.id" :num="item.num" :max="item.stockNum" @setNumber="changeNum"></cart-changeNum>
                </div>
              </div>
            </div>
            <div class="listItemBtm">
              <ul>
                <li v-for="proItem in item.promotionDtoList" :data-id="proItem.proId">
                  <i>{{proItem.proName}}</i>
                  <span>{{proItem.proDes}}</span>
                  <em @click="changeActHandle(item.id,item.goodsId,proItem.proType)">修改</em>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- 普通商品 end -->

      <!-- 全球购 begin -->
      <div class="cartList" v-if="cartList.globalCartList.length>0">
        <div class="listHeader">
          <label :class="{'active': globalCheckAll}" data-type="global" @click="typeSelectHandle('global')"></label>
          <span><i>全球购</i>优德电商平台</span>
        </div>
        <ul>
          <li class="listItem" v-for="(item,index) in cartList.globalCartList">
            <div class="listItemContainer">
              <div class="checkBox">
                <label :class="{'active': item.toOrderState==1}" @click="checkItemHandle(item.id,item.toOrderState)"></label>
              </div>
              <router-link :to="/goodsDetail/+item.goodsId" tag="span" class="goodsImg">
                <img v-lazy="item.thumbnail" alt="" class="imgSize">
              </router-link>
              <div class="goodsRight">
                <h3 class="goodsName">{{item.goodsName}}</h3>
                <span class="goodsSize">{{item.specValue}}</span>
                <div class="goodsRightBtm">
                  <span class="goodsPrice">¥{{item.goodsPrice/100}}</span>
                  <cart-changeNum :isGlobal="true" :id="item.id" :num="item.num" :max="item.stockNum" @setNumber="changeNum"></cart-changeNum>
                </div>
              </div>
            </div>
            <div class="listItemBtm">
              <ul>
                <li v-for="proItem in item.promotionDtoList" :data-id="proItem.proId">
                  <i>{{proItem.proName}}</i>
                  <span>{{proItem.proDes}}</span>
                  <em @click="changeActHandle(item.id,item.goodsId,proItem.proType)">修改</em>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- 全球购 end -->

      <!-- 结算/删除 按钮 begin -->
      <div class="cartFixedBtm">
        <div class="cartCheckAll" @click="allSelectHandle">
          <label :class="{'active':allSelected}"></label>
          全选
        </div>
        <div class="cartTotal" v-if="!isDelete">
          <p>合计：<strong>{{totalMoney}}</strong></p>
        </div>
        <div class="cartFixedRight" :class="{'bgRed': isDelete}">
          <span v-if="!isDelete" @click="nextHandle">结算</span>
          <span v-else @click="delHandle">删除</span>
        </div>
      </div>
      <!-- 结算/删除 按钮 end -->

      <!-- 商品活动列表弹窗 begin -->
      <cart-btm-popup :popShow="popObj" @closeHandle="closeHandleSelf">
        <div class="promotionList">
          <ul>
            <li v-for="(item,index) in promotionList" @click="checkPromation(index)">
              <span>{{item.proName}}</span>
            </li>
          </ul>
        </div>
      </cart-btm-popup>
      <!-- 商品活动列表弹窗 end -->

      <!-- 选择不同类型的商品去结算 begin -->
      <cart-goods-confirm v-if="confirmBl" :confirmData="confirmData" @confirmEmit="confirmHandle"></cart-goods-confirm>
      <!-- 选择不同类型的商品去结算 end -->

    </div>

    <!-- 无数据 begin -->
    <empty-data :title="noData" v-if="!hasData"></empty-data>
    <!-- 无数据 end -->
    <footer-tab></footer-tab>
  </div>

</template>

<script type="text/ecmascript-6">
  import {mapMutations,mapGetters,mapActions} from 'vuex';
  import { Toast,Indicator,MessageBox } from 'mint-ui';
  import {getCartData,changeNum,splitCartData,refreshData,checkItem,whetherTypeCheckAll,cartDel,getPromationData,setPromation} from '@/api/cart';
  import { local,getUid } from '@/common/js/util';

  import emptyData from '@/base/empty-data/empty-data';
  import cartFixedBtm from "./cart-fixed-btm";
  import cartBtmPopup from "./cart-btm-popup";
  import cartGoodsConfirm from "./cart-goods-confirm";
  import cartChangeNum from "@/base/cart-changeNum/cart-changeNum";
  import headerYoude from "@/base/header-youde/header-youde";
  import FooterTab from '@/components/footerTab/footerTab';
  export default {
    data(){
        return {
            hasData:false,
            cartList:{},
            typeAllCheck:false,
            itemCheck:false,
            isDelete:false,
            allSelected:false,
            popupShow:false,
            popObj:{
              isShow:false,
              title:"修改促销"
            },
            noData:"购物车空空如也",
            selectedIds:[],
            commonCheckAll:false,
            globalCheckAll:false,
            totalMoney:0.00,
            confirmBl:false,
            confirmData:[],
            targetCartId:'',
            promotionList:[],
            isLogin:false
        }
    },
    computed:{
      ...mapGetters([
        'uuid'
      ])
    },
    components:{headerYoude,emptyData,cartFixedBtm,cartBtmPopup,cartChangeNum,cartGoodsConfirm,FooterTab},
    created(){
        this.SET_Loading(true);
        this._getCartList();
        this._getLoginState();
        local.remove('shopCouponId');
        local.remove('platformCouponId');
    },
    deactivated(){
      this.$destroy()
    },
    methods:{
      //判断是否登录
      _getLoginState(){
        let springraintoken = local.get('springraintoken');
        if(springraintoken){
            this.isLogin = true;
        }else{
            this.isLogin = false;
        }
      },
      //全选
      allSelectHandle(){
          let that = this;
          let params = {
            selectSpCartIds:'',
            uuid:''
          };
          let commonList = that.cartList.commonCartList;
          let globalList = that.cartList.globalCartList;
          let springraintoken = local.get("springraintoken");
          if(!springraintoken){
            params.uuid = local.get('uuid');
          }
          that.selectedIds=[];
          if(!that.allSelected){
            for(let i=0;i<commonList.length;i++){
              that.selectedIds.push(commonList[i].id);
            }
            for(let j=0;j<globalList.length;j++){
              that.selectedIds.push(globalList[j].id);
            }
          }
          params.selectSpCartIds = that.selectedIds.toString();
          that._Indicator('操作中...');
          checkItem(params).then((res)=>{
              Indicator.close();
              if(res.status==='success' && res.statusCode==='200'){
                if(res.data != undefined){
                  that.cartList = splitCartData(res.data);
                  whetherTypeCheckAll(that); //检测类型商品是否为全选
                  that._totalMoney(); //计算总金额
                }
              }
          });
      },
      //类型全选
      typeSelectHandle(type){
          let that = this;
          let commonData = that.cartList.commonCartList;
          let globalData = that.cartList.globalCartList;
          let params = {
            selectSpCartIds:'',
            uuid:''
          };
          let springraintoken = local.get("springraintoken");
          if(!springraintoken){
            params.uuid = local.get('uuid');
          }
          if(type==='common'){
              if(!that.commonCheckAll){
                for(let i=0;i<commonData.length;i++){
                  that.selectedIds.push(commonData[i].id);
                }
              }else{
                for(var i=0;i<commonData.length;i++){
                  //that.selectedIds.remove(commonData[i].id);
                  var id = commonData[i].id;

                  for(var j=0;j<that.selectedIds.length;j++){
                    if(id==that.selectedIds[j]){
                      that.selectedIds.splice(j,1);
                    }
                  }
                }
              }
          }else if(type==="global"){
              if(!that.globalCheckAll){
                for(let i=0;i<globalData.length;i++){
                  that.selectedIds.push(globalData[i].id);
                }
              }else{
                for(var i=0;i<globalData.length;i++){

                  var id = globalData[i].id;

                  for(var j=0;j<that.selectedIds.length;j++){
                    if(id==that.selectedIds[j]){
                      that.selectedIds.splice(j,1);
                    }
                  }
                }
              }
          }
          params.selectSpCartIds = that.selectedIds.toString();
          this._Indicator('操作中...');
          checkItem(params).then((res)=>{
              Indicator.close();
            if(res.status==='success' && res.statusCode==='200'){
              if(res.data != undefined){
                that.cartList = splitCartData(res.data);
                whetherTypeCheckAll(that); //检测类型商品是否为全选
                that._totalMoney(); //计算总金额
              }
            }
          });
      },
      //单选
      checkItemHandle(id,state){
        let that = this;
        let params = {
          selectSpCartIds:'',
          uuid: ''
        };
        let selectedIds = that.selectedIds;
        let springraintoken = local.get("springraintoken");
        if(!springraintoken){
          params.uuid = local.get('uuid');
        }

        if(state){
          for(let i=0;i<selectedIds.length;i++){
            if (selectedIds[i] === id){
              selectedIds.splice(i, 1);
            }
          }
        }else{
            selectedIds.push(id);
            that.selectedIds = selectedIds;
        }
        params.selectSpCartIds = that.selectedIds.toString();
        that._Indicator('操作中...');
        checkItem(params).then((res)=>{
            Indicator.close();
            if(res.status==='success' && res.statusCode==='200'){
              if(res.data != undefined){
                that.cartList = splitCartData(res.data);
                whetherTypeCheckAll(that); //检测类型商品是否为全选
                that._totalMoney(); //计算总金额
              }
            }
        });
      },
      //合计
      _totalMoney(){
          let that = this;
          let commonList = that.cartList.commonCartList;
          let globalList = that.cartList.globalCartList;
          let commonTotal = 0;
          let globalTotal = 0;

          for (var i = 0; i < commonList.length; i++) {

              var currentState = commonList[i].toOrderState;
              if(currentState){
                var goodsPrice = commonList[i].goodsPrice;
                var num = commonList[i].num;
                commonTotal += goodsPrice*num;
              }
          }

          for (var i = 0; i < globalList.length; i++) {

            var currentState = globalList[i].toOrderState;
            if(currentState){
              var goodsPrice = globalList[i].goodsPrice;
              var num = globalList[i].num;
              globalTotal += goodsPrice*num;
            }
          }

          that.totalMoney = ((commonTotal+globalTotal)/100).toFixed(2);

      },
      //获取购物车列表
      _getCartList(){
          let that = this;
          let uuid = '';
          let springraintoken = local.get("springraintoken");
          if(!springraintoken){
              uuid = local.get('uuid');
          }
          that.getCartNumber();
          getCartData(uuid).then((res)=>{
              if(res.status==='success' && res.statusCode==='200'){
                  if(res.data !== undefined){
                      that.hasData = true;
                      that.cartList = splitCartData(res.data);
                  }else{
                      that.hasData = false;
                  }
              }
              this.SET_Loading(false);
          })
      },
      //改变购物车商品数量
      changeNum(options){
          //console.log(options);
          let that = this;
          let uuid = '';
          let cartList = that.cartList;
          let springraintoken = local.get("springraintoken");
          if(!springraintoken){
            uuid = local.get('uuid');
          }
          this._Indicator('操作中...');
          changeNum(options,uuid).then((res)=>{
            Indicator.close();
            if(res.status==='success' && res.statusCode==='200'){
                that.cartList = refreshData(options,cartList);
                that.getCartNumber();
                that._totalMoney();
            }
          })
      },
      //隐藏结算二次确认框
      confirmHandle(option){
          this.confirmBl = option.confirmBl;
      },
      //结算
      nextHandle(){
          let that = this;
          let commonList = that.cartList.commonCartList;
          let globalList = that.cartList.globalCartList;
          let commonIds = [];
          let globalIds = [];

          let springraintoken = local.get('springraintoken');
          for(let i=0;i<commonList.length;i++){
              if(commonList[i].toOrderState){
                commonIds.push(commonList[i].id);
              }
          }
          for(let i=0;i<globalList.length;i++){
            if(globalList[i].toOrderState){
              globalIds.push(globalList[i].id);
            }
          }
          if(that.isLogin){
              if(commonIds.length>0 && globalIds.length>0){
                  let againData = [
                    {
                      isCheck:true,
                      text: '优德全球购商品（' + globalIds.length + '个）',
                      type:'global',
                      ids: globalIds.toString()
                    },
                    {
                      isCheck: false,
                      text: '其他商品（' + commonIds.length + '个）',
                      type:'common',
                      ids: commonIds.toString()
                    }
                  ];
                  that.confirmData = againData;
                  that.confirmBl = true;
              }else{
                  if(globalIds.length>0 && commonIds.length===0){
                    this.$router.push('/cartCheckout/'+globalIds.toString());
                  }else if(globalIds.length===0 && commonIds.length>0){
                    this.$router.push('/cartCheckout/'+commonIds.toString());
                  }else{
                    let tip = Toast('您未选择商品');
                    setTimeout(function(){
                        tip.close();
                    },1500);
                  }
              }
          }else{
              MessageBox.confirm('请先登录').then((action)=>{
                  if(action === 'confirm'){
                      that.$router.push('/login');
                  }
              },()=>{});
          }
      },
      //购物车删除
      delHandle(){
          let uuid = '';
          let springraintoken = local.get("springraintoken");
          if(!springraintoken){
            uuid = local.get('uuid');
          }
          if(this.selectedIds.length>0){
              this._Indicator('删除中...');
              cartDel(this.cartList,uuid).then((data)=>{
                  if(data.status==='success' && data.statusCode==='200'){
                    let tip = Toast(data.message);
                    setTimeout(()=>{
                      tip.close();
                    },1500);
                    this._getCartList();
                    this.getCartNumber();
                    this.selectedIds=[];
                  }else{
                    let tip = Toast(data.message);
                    setTimeout(()=>{
                      tip.close();
                    },1500)
                  }
                  Indicator.close();
              });
          }else{
              let tip = Toast('您未选择要删除的商品');
              setTimeout(()=>{
                  tip.close();
              },1500)
          }

      },
      //删除/完成按钮切换
      editHandle(){
        this.isDelete = !this.isDelete;
      },
      //获取商品活动列表
      changeActHandle(cartId,gid,iType){
        let params = {
            goodsId:gid,
            proType:iType
        };
        getPromationData(params).then((res)=>{
            console.log(res);
            if(res.status==='success' && res.statusCode==='200'){
              if(res.data !== undefined){
                  this.promotionList = res.data;
                  this.popObj.isShow = true;
                  this.targetCartId=cartId;
              }else{
                  this.promotionList = [];
              }
            }
        })
      },
      //购物车内修改商品参加的活动
      checkPromation(index){
          let promotionData = this.promotionList;
          let uuid = '';
          this._Indicator('加载中...');
          let springraintoken = local.get("springraintoken");
          if(!springraintoken){
            uuid = local.get('uuid');
          }
          setPromation(promotionData,this.targetCartId,uuid,index).then((res)=>{
              Indicator.close();
              if(res.status==='success' && res.statusCode==='200'){
                  this._getCartList();
                  this.popObj.isShow = false;
              }
          })
      },
      //关闭商品活动列表弹窗
      closeHandleSelf(opt){
        this.popupShow = opt.isShow;
      },
      _Indicator(text){
        Indicator.open({
          text: text,
          spinnerType: 'fading-circle'
        });
      },
      ...mapMutations({
        SET_Loading: 'SET_Loading'
      }),
      ...mapActions({
        getCartNumber: 'getCartNumber'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";

  .cartWrap{
    width:100%;
    .wrapPadding{
      padding:0.96rem 0 2rem;
    }
    label{
      display:inline-block;
      width: 0.38rem;
      height:0.38rem;
      background:url('checkIcon.png') no-repeat;
      background-size:0.38rem 0.86rem;
      &.active{
        background-position:0 -0.48rem;
      }
    }

    .cartList{
      background:#fff;
    }
    .listHeader{
      width:100%;
      height:0.86rem;
      line-height:0.86rem;
      font-size:0.3rem;
      color:#464646;
      border-bottom:1px solid $cart-border-color;
      label,span{
        float:left;
        display:inline-block;
      }
      label{
        float:left;
        margin:0.24rem;
      }
      i{
        font-style:normal;
        color:#fff;
        background:$cart-red-color;
        font-size:0.20rem;
        padding:0.05rem 0.1rem;
        @include border-radius(3px);
        margin-right:0.1rem;
      }
    }
    .listItemContainer{
      padding:0.1rem 0.24rem;
      height:1.56rem;
      position:relative;
      .goodsImg{
        display:inline-block;
        width:1.56rem;
        height:1.56rem;
        overflow:hidden;
        float:left;
        margin-left:0.24rem;
        .imgSize{
          width:1.56rem;
          height:1.56rem;
        }
      }
      label{
        position:absolute;
        top:50%;
        left:0;
        margin-top:-0.19rem;
      }
      .goodsRight{
        float:right;
        width:4.6rem;
        height:1.56rem;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .goodsName{
        font-size:0.28rem;
        color:#464646;
      }
      .goodsSize{
        font-size:0.22rem;
        color:#898989;
      }
      .goodsPrice{
        font-size:0.24rem;
        color:$cart-red-color;
        float:left;
      }

      .checkBox{
        width: 0.38rem;
        height:1.56rem;
        position:relative;
        float:left;
      }
      .goodsRightBtm{
        height:0.56rem;
        line-height:0.56rem;
        overflow:hidden;
      }
    }
    .listItemBtm{
      position:relative;
      width:100%;
      padding:0.1rem 0;
      background:$cart-activity-bg;
      border-bottom:1px solid $cart-border-color;
      &:before{
        content:'';
        overflow:hidden;
        width:0.18rem;
        height:0.18rem;
        background:$cart-activity-bg;
        -webkit-transform:rotate(45deg);
        transform:rotate(45deg);
        position:absolute;
        top:-0.1rem;
        left:0.34rem;
      }
      li{
        padding:0.08rem 0.24rem 0.08rem 0.86rem;
        height:0.32rem;
        line-height: 0.32rem;
        font-size:0.23rem;
        i{
          display:inline-block;
          padding:0 0.09rem;
          font-size:0.21rem;
          -webkit-box-sizing:border-box;
          -moz-box-sizing:border-box;
          box-sizing:border-box;
          border:1px solid #78bfc3;
          background:#fff;
          color:#78bfc3;
          margin-right:0.05rem;
          @include border-radius(4px);
        }
        span{
          color:#797979;

        }
        em,i{font-style:normal;}
        em{
          float:right;
          color:#666;
        }
        &:after{
          display:block;
          content:'';
          overflow:hidden;
          clear:both;
        }
      }
    }
  }
  .promotionList{
    padding:0.24rem;
    li{
      height:0.38rem;
      line-height:0.38rem;
      font-size:0.28rem;
      padding:0.15rem;
      &:after{
        display:block;
        content:'';
        clear:both;
        overflow:hidden;
      }
      label,span{
        float:left;
      }
      label{
        display:inline-block;
        width: 0.38rem;
        height:0.38rem;
        background:url('checkIcon.png') no-repeat;
        background-size:0.38rem 0.86rem;
        margin-right:0.2rem;
        &.active{
          background-position:0 -0.48rem;
        }
      }
    }
  }

  .cartFixedBtm{
    position:fixed;
    right:0;
    bottom:48px;
    left:0;
    width:100%;
    height:1.06rem;
    background:#fff;
    border-top:1px solid $cart-border-color;
    font-size:0.3rem;
    color:#424e5a;
    .cartCheckAll{
      float:left;
      height:1.06rem;
      line-height:1.06rem;
      padding-left:0.24rem;

      label{
        display:inline-block;
        width: 0.38rem;
        height:0.38rem;
        background:url('checkIcon.png') no-repeat;
        background-size:0.38rem 0.86rem;
        margin:0.34rem 0.08rem 0 0;
        float:left;
        &.active{
          background-position:0 -0.48rem;
        }
      }
    }
    .cartTotal{
      float:left;
      height:1.06rem;
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left:0.24rem;
      strong{
        color:$cart-red-color;
      }
    }
    .cartFixedRight{
      float:right;
      width:2.2rem;
      height:1.08rem;
      line-height:1.08rem;
      text-align:center;
      background:linear-gradient(150deg,rgba(55,150,208,0.9),#36c);
      span{
        color:#fff;
        font-size:0.34rem;
      }
      &.bgRed{
        background:linear-gradient(150deg,rgba(255,0,0,0.5),#f00);
      }
    }
  }
</style>
