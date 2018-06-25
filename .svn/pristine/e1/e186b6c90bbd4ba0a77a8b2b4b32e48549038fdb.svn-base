<template>
  <div class="container">
    <!--头部-->
    <header-tab idName="tab-container" :active="active" :isBack="true" @back="back" :title="['商品','详情','评论']"
                @tabChange="tabChange"></header-tab>
    <div class="tab-wrapper">
      <!--商品信息-->
      <div class="tab-container" v-show="active==='tab-container0'">

        <goods-info v-if="initData" :data="initData"  v-title="title"></goods-info>
      </div>
      <!--详情-->
      <div class="tab-container" v-show="active==='tab-container1'">
        <mt-navbar v-model="selected" :fixed="true">
          <mt-tab-item id="tab1">商品详情</mt-tab-item>
          <mt-tab-item id="tab2">商品说明书</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="tab1">
            <div class="goods_desc" v-if="imgInfo" v-html="imgInfo">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab2">
            <div class="goods_desc">
              <ul class="goods-instruct" v-if="introList!=undefined">
                <li class="goods-txt-item" v-if="introList.medicineName">
                  <p class="">【药品名称】</p>
                  <p class="goods-txt-content">{{introList.medicineName}}</p>
                </li>
                <li class="goods-txt-item" v-if="introList.productNo">
                  <p class="">【药品批号】</p>
                  <p class="goods-txt-content">{{introList.productNo}}</p>
                </li>
                <li class="goods-txt-item" v-if="introList.productName">
                  <p class="">【厂家名称】</p>
                  <p class="goods-txt-content">{{introList.productName}}</p>
                </li>
                <li class="goods-txt-item" v-for="item in introList.paramsList" v-if="item.pvalue!==''">
                  <p class="">【{{item.name}}】</p>
                  <p class="goods-txt-content">{{item.pvalue}}</p>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <!--评论-->
      <div class="tab-container" v-show="active==='tab-container2'">
        <goods-comment v-if="initData && initData.spComments!=undefined" :data="initData.spComments"></goods-comment>
        <empty-data v-if="initData && initData.spComments==undefined" title="暂无评论"></empty-data>
      </div>
    </div>
    <!--底部操作，加入购物车，立即购买，收藏-->
    <div class="bottom-fix" v-if="initData">
      <div class="left">
        <!--<div class="left-item">
          <i class="icon iconfont icon-msg"></i>
          <span>咨询</span>
        </div>-->
        <div class="left-item" @click="setConcern">
          <i v-if="collectState === 0" class="icon iconfont icon-star-empty"></i>
          <i v-else="" class="icon iconfont icon-star-full"></i>
          <span :class="{'is-collect': collectState === 1}">收藏</span>
        </div>
        <router-link to="/cart" class="left-item left-item-cart">
          <div class="cart-num">{{cartNumber}}</div>
          <i class="icon iconfont icon-add_cart"></i>
          <span>购物车</span>
        </router-link>
      </div>
      <div class="right" v-if="initData.state === 2">
        <a class="btn-empty">商品已下架</a>
      </div>
      <div class="right" v-else-if="stock>0">
        <a class="btn-youde buy-now" @click="addCart(3)">立即购买</a>
        <a class="btn-youde join-cart" @click="addCart(2)">加入购物车</a>
      </div>
      <div class="right" v-else>
        <a class="btn-empty">库存不足</a>
      </div>
    </div>
    <!---规格促销详情-->
    <pop-menu :popShow="popShow" v-if="initData">
      <!--促销详情-->
      <div v-if="popState === 1" class="promotion-wrapper">
        <h3 class="title">促销活动</h3>
        <div class="item" v-for="item in promotionData">
          <span class="name active">{{item.proName}}</span>
          <span class="desc">{{item.proDes}}</span>
        </div>
      </div>
      <!--规格详情-->
      <div class="select-spec-wrapper" v-if="popState === 2 || popState === 3">
        <div class="selectGoodsCont">
          <div class='selectGoodsContImg'>
            <img :src="initData.thumbnail"/>
          </div>
          <div class='selectGoodsContNum'>
            <div class='selectGoodsPrice clearfix'>
              <span>¥{{initData.minPrice / 100}}</span>
            </div>
            <div class='kucun'><span> 库存{{stock}}件</span></div>
            <div class="buyNum">
              <span>购买数量:</span>
              <cart-control :max="stock" @setNumber="setJoinNumber"></cart-control>
            </div>
          </div>
        </div>
        <div class="select-spec">
          <div class="item-wrapper" v-for="(item,index) in initData.spectypes" v-if="item.specList!=undefined">
            <span class="title">{{item.name}}</span>
            <div class="item">
              <span v-for="it in item.specList" class="name" :class="{'active':it.id == specifications[index]}"
                    @click="changeSpec(it.id,index,it.id == specifications[index])">{{it.specValue}}</span>
            </div>
          </div>
        </div>
        <div class="fix-bottom">
          <button-youde v-if="initData && stock>0 &&initData.state ===1" title="确定"
                        @submitData="submitCart"></button-youde>
          <button-youde v-if="initData && stock===0 &&initData.state ===1" title="库存不足"
                        color="#9d9d9d"></button-youde>
          <button-youde v-if="initData && initData.state!==1" title="商品已下架" color="#9d9d9d"></button-youde>
        </div>
      </div>

    </pop-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderTab from '@/base/header-tab/header-tab';
  import CartControl from '@/base/cart-control/cart-control';
  import ButtonYoude from '@/base/button-youde/button-youde';
  import EmptyData from '@/base/empty-data/empty-data';
  import { Toast} from 'mint-ui';
  import {
    getGoodsDetail,
    getGoodsInstruct,
    getGoodsImg,
    setConcern,
    cancelConcern,
    getPromotion,
    getGoodsInfo,
    joinCart,
    getLogin
  } from '@/api/goods-detail';
  import GoodsInfo from './goods-info';
  import GoodsComment from './goods-comment';
  import PopMenu from '@/base/pop-menu';
  import {mapMutations, mapGetters, mapActions} from 'vuex';
  import {Navbar, TabItem} from 'mint-ui';
  import {getUid, replaceHTMLTag, local} from '@/common/js/util';
  export default {
    data(){
      return {
        active: 'tab-container0',//当前tab
        goodsId: "", //商品id
        initData: null, //数据
        goods_desc: null, //商品详情数据
        collectState: 0, //收藏状态0未收藏，1已收藏
        specId: "",//规格id
        businessId:"",//秒杀场次Id
        popShow: { //弹窗显示状态
          isShow: false
        },
        joinNumber: 1,//加入购物车数量
        popState: 1, //1促销弹框，2，选择规格弹窗加入购物车弹窗,3.立即购买弹窗,
        promotionData: [],
        specifications: [],//选中规格数组
        islogin: false,
        imgInfo: '', //商品详情数据
        introList: null, //说明书
        selected: 'tab1'
      }
    },
    computed: {
        stock(){
           if(this.initData.stock !== 0) {
               return this.initData.stock;
           }else if(this.initData.specValues.length>0){
               return this.initData.specValues[0].stock;
           }
        },
      title(){
         return this.initData?this.initData.title : '';
      },
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'cartNumber'
      ])
    },
    components: {GoodsInfo, HeaderTab, GoodsComment, PopMenu, CartControl, ButtonYoude, EmptyData},
    created (){
      this.goodsId = this.$route.params.id;
      if (this.goodsId === "") {
        return;
      }
      this.SET_Loading(true);
      this._ininData();
    },
    deactivated(){
      this.$destroy()
    },
    methods: {
      _ininData(){
        getGoodsDetail(this.goodsId).then((res) => { //初始化数据
          if (res.status === 'success') {
            let data = res.data;
            this.initData = data;
            this.collectState = data.collectState;
            this._getGoodsInstruct();
            if (data.spectypes) {
              this.specifications = data.spectypes.filter((value) => {
                    return value.specList!=undefined
              }).map((value)=>{
                  return value.specList[0].id;
              })
            }
          }
          this.SET_Loading(false);
        })
      },
      _getGoodsInstruct(){//商品详情数据,商品说明书数据
        getGoodsImg(this.goodsId).then((res) => {
          if (res.status === 'success') {
            this.imgInfo = replaceHTMLTag(res.data.datas);
          }

        });
        getGoodsInstruct(this.goodsId).then((res) => {
          if (res.status === 'success') {
           this.introList = res.data
          }

        })
      },
      getDataPromotion(){ //获取促销详情
        if(this.promotionData.length>0){
          this.popShow.isShow = true;
          this.popState = 1;
        }else {
          getPromotion(this.goodsId).then((res) => {
            if (res.status === 'success') {
              this.popShow.isShow = true;
              this.popState = 1;
              this.promotionData = res.data;
            }
          })
        }

      },
      changeSpec(id, index, status){ //选择规格
        if (!status) {
          this.$set(this.specifications, index, id);
          this._getGoodsInfo();
        }
      },
      _getGoodsInfo(type){ //获取specId
        getGoodsInfo(this.goodsId, this.specifications, this.initData.goodsType).then((res) => {
          if (res.status === 'success') {
            this.initData.maxTagPrice = res.data.price;
            this.initData.minPrice = res.data.xsPrice;
            this.initData.stock = res.data.stock;
            this.specId = res.data.id;
            this.businessId = res.data.businessId?res.data.businessId: "";
            if(type){
              this.submitCart();
            }
          }
        })
      },
      addCart(type){//点击加入购物车或立即购买
        this.popShow.isShow = true;
        this.popState = type;
      },
      submitCart(){//执行加入购物车或立即购买
        //加入购物车
        if(this.specId === ""){
          this._getGoodsInfo(1)
        }else {
          let uuid="";
          let loginState = false;
          getLogin().then((res)=>{
              if(res.status==='success'){
                loginState = true;
              }else {
                uuid= local.get('uuid');
                if (uuid === "") {
                  uuid = getUid();
                  local.save('uuid', uuid);
                }
              }
          }).then(()=>{
            joinCart(this.goodsId, this.joinNumber, this.initData.goodsType, this.specId, this.businessId, uuid).then((d) => {
              if (d.status === 'reload') {
                this.$router.push('/login');
              }
              else if(d.status === 'success'){
                if (this.popState === 2) {
                    Toast('加入购物车成功');
                  this.getCartNumber();
                  this.popShow.isShow = false;
                } else if (this.popState === 3) {
                  if (loginState) {

                    if(typeof(d.data)=='string'){
                      this.$router.push('/cartCheckout/' + d.data);
                    }else if(typeof(d.data)=='object'){
                      this.$router.push('/cartCheckout/' + d.data.orderCartList[0].cartIds);
                    }

                  }else {
                    this.$router.push('/login');
                  }
                }
              }else{

                  this.$toast(d.message);
              }
            })
          })
        }

      },
      setConcern(){//收藏
        let springraintoken = local.get("springraintoken");
        if (springraintoken === '') {
          this.$router.push('/login');
          return false;
        }
        if (this.collectState === 0) {//收藏
          setConcern(this.goodsId, springraintoken).then((res) => {
            if (res.status === 'success') {
              this.collectState = 1;
            }
          })
        } else if (this.collectState === 1) {//取消收藏
          cancelConcern(this.goodsId, springraintoken).then((res) => {
            if (res.status === 'success') {
              this.collectState = 0;
            }
          })
        }
      },
      setJoinNumber(number){//设置加入购物车数量
        this.joinNumber = number
      },
      back(){
        this.$router.back()
      },
      tabChange(item){ //切换tab
        this.active = 'tab-container' + item;
      },
      ...mapMutations({
        SET_Loading: 'SET_Loading'
      }),
      ...mapActions({
        getCartNumber: 'getCartNumber' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";

  .container {
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }

  .mint-navbar.is-fixed {
    top: $header-height;
  }
  .goods-instruct{
    margin-top: 30px;
    padding: 0 0.1rem;
    font-size: 0.26rem;
    overflow: hidden;
    .goods-txt-item{
      margin-top: 0.2rem;
      .goods-txt-content{
        text-indent: 0.8rem;
        margin-top: 0.15rem;
      }
    }
  }
  .tab-wrapper {
    position: absolute;
    top: $header-height;
    bottom: 0px;
    width: 100%;
  }

  .tab-container {
    width: 100%;
    height: 100%;
    background-color: #F0F1F3;
    overflow: auto;
  }

  .bottom-fix {
    position: fixed;
    bottom: 0px;
    height: 50px;
    width: 100%;
    background-color: #f5f5f5;
    z-index: 1;
    display: flex;
    display: -webkit-box;
    .left {
      width: 2.6rem;
      display: flex;
      box-sizing: border-box;
      border-top: 1px solid #e6e6e6;
      .left-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        &.left-item-cart {
          position: relative;
        }

        span {
          margin-top: 4px;
          font-size: 10px;
          color: #676767;
          &.is-collect {
            color: #377dcc;
          }
        }
        .icon {
          color: #444;
          font-size: 20px;
          &.icon-star-full {
            color: #377dcc;
          }
        }
        .cart-num {
          background-color: #ff5d5d;
          border-radius: 7px;
          color: #ffffff;
          display: block;
          font-family: Arial;
          font-size: 10px;
          height: 14px;
          line-height: 14px;
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          margin-left: 6px;
          top: 2px;
          box-sizing: border-box;
          padding: 0 3px;
          min-width: 16px;
          text-align: center;
        }
      }
    }
    .right {
      -moz-box-flex:1;
      box-flex:1;
      -webkit-box-flex:1;
      font-size: 0;
      .btn-youde, .btn-empty {
        display: inline-block;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 14px;
        &.join-cart {
          width: 50%;
          background-color: #ff5d5d;
        }
        &.buy-now {
          width: 50%;
          background-color: #4792d1;
        }
        &.btn-empty {
          width: 100%;
          background-color: #989898;
        }
      }
    }
  }

  .promotion-wrapper, .select-spec {
    &.promotion-wrapper {
      .title {
        padding: 10px;
        border-bottom: #f2f2f2 1px solid;
        font-size: 0.4rem;
        line-height: 0.6rem;
        color: #444;
        font-weight: bolder;
        text-align: center;
      }
      .item {
        display: flex;
        align-items: center;
        .name{
          margin-bottom: 0 !important;
        }
      }
    }
    &.select-spec {
      margin: 0 10px;
      .title {
        color: #989898;
        font-size: 0.3rem;
      }
      .item {
        border: none !important;
      }
    }
    .item {
      height: 0.6rem;
      padding: 6px;
      border-bottom: 1px solid #f2f2f2;
      .name, .desc {
        line-height: 0.4rem;
        height: 0.4rem;
        display: inline-block;
        margin-right: 10px;
        font-size: 0.3rem;
        &.name {
          border: 1px solid #ccc;
          border-radius: 3px;
          color: #444;
          padding: 2px 6px;
          margin-bottom: 0.2rem;

        }
        &.active {
          border: 1px solid #ff5d5d;
          color: #ff5d5d;
        }
        .desc {
          color: #444;
        }
      }
    }
  }

  .selectGoodsCont {
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin-top: 10px;
    font-size: 0.4rem;
  }

  .selectGoodsContImg {
    width: 1.6rem;
  }

  .selectGoodsContNum {
    margin-left: 12px;
  }

  .selectGoodsContImg img {
    width: 1.6rem;
    height: 1.6rem;
  }

  .selectGoodsPrice span {
    color: #ff5d5d;
  }

  .kucun, .buyNum {
    margin-top: 4px;
    display: flex;
    align-items: center;
    span {
      color: #90959F;
      line-height: 24px;
      display: inline-block;
      margin-right: 10px;
    }
  }

  .select-spec-wrapper {
    padding-bottom: 52px;
    font-size: 0px;
    .item-wrapper {
      margin-top: 4px;
    }
    .fix-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #4792d1;
    color: #4792d1;
  }
</style>
