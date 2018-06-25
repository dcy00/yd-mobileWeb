<template>
  <div>
    <scroll class="scroll-view scroll-view-right"
            ref="scroll"
    >
      <div>
        <!--轮播-->
        <slider
          :interval="2000"
          :click="true"
          :currentPage="true"
          @tellCurrentPage="setCurrentPage">
          <div class="slider-item" v-for="(item,index) in goodsInfo.pictures" @click.stop="imgExchange(true)"
               style="display: block">
            <a>
              <img class="needsclick" @load="loadImage" :src="item.filepath"
                   style="height: auto;width:6rem;margin: 0 auto"/>
            </a>
          </div>
        </slider>
        <!--秒杀团购-->
        <div class="active-wrapper" v-if="goodsInfo.goodsType === 2 || goodsInfo.goodsType === 3">
          <div class="left">
            <span class="sale-price">{{priceType}} ¥{{goodsInfo.minPrice | myPrice}}</span>
           <!-- <span>原价 ¥{{goodsInfo.maxTagPrice | myPrice}}</span>-->
          </div>
          <div class="right">
            <count-down
              :startTime="goodsInfo.systemTime"
              :endTime="goodsInfo.endTime"
              :isTime="false"
              :isBlack="false">
            </count-down>
          </div>
        </div>
        <!--商品信息-->
        <div class="goods-info-wrapper">
          <h3 class="goods-name" :class="{'world':goodsInfo.goodsGenre === 2}"><span>{{goodsInfo.title}}</span></h3>
          <div class="line"></div>
          <p class="goods-name-detail">{{goodsInfo.recommendSpeech}}</p>
          <div class="price-wrapper">
            <span class="title">{{priceType}}</span>
            <span class="price">{{goodsInfo.minPrice | myPrice}}</span>
          </div>
        </div>
        <mt-cell class="cell-border">
          <span slot="title" class="left-text">原价 <i>¥{{goodsInfo.maxPrice | myPrice}}</i></span>
          <span>已售：{{goodsInfo.salesVolume}}</span>
        </mt-cell>
        <mt-cell v-if="goodsInfo.goodsGenre === 2">
          <div slot="title">
            <span class="left-text">税费 <span>¥{{goodsInfo.taxationPrice | myPrice}}</span><span
              class="icon iconfont icon-icon-ask" @click="priceAsk"></span></span>
          </div>
        </mt-cell>
        <mt-cell class="cell-margin" is-link @click.native="_getPromotion">
          <div slot="title" class="cell-slot-title">
            <span class="title">促销</span>
            <span class="content" v-if="goodsInfo.promotionName != undefined">{{goodsInfo.promotionName}}</span>
          </div>
        </mt-cell>
        <mt-cell class="cell-margin" is-link v-if="goodsInfo.spectypes != undefined" @click.native="showSpec">
          <div slot="title" class="cell-slot-title">
            <span class="title">选择规格</span>
            <span class="content-rule" v-for="item in goodsInfo.spectypes" v-if="item.specList!=undefined">{{item.specList[0].specValue}}</span>
          </div>
        </mt-cell>
        <div v-if="goodsInfo.spComments!=undefined">
          <div class="comment">
            <mt-cell title="商品评价" is-link @click.native="goToComment"></mt-cell>
          </div>
          <comment v-for="(item,index) in goodsInfo.spComments" :comment="item" :key="index" v-if="index<3"></comment>
        </div>
      </div>
    </scroll>
    <img-enlarge v-if="imgBig && goodsInfo"
                 :initCurrentPage="initPage"
                 :imgArr="goodsInfo.pictures"
                 @hideImg="imgExchange">
    </img-enlarge>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Cell, Toast, MessageBox} from 'mint-ui';
  import {getPromotion} from '@/api/goods-detail'
  import ImgEnlarge from '@/base/img-enlarge/img-enlarge'
  import CountDown from '@/base/count-down/count-down'
  import Scroll from '@/base/scroll/scroll'
  import Slider from '@/base/slider/slider'
  import CartControl from '@/base/cart-control/cart-control'
  import Comment from '@/base/comment/comment'

  export default {
    data(){
      return {
        imgBig: false, //显示大图
        initPage: 0, //默认大图
        isClick: true //禁止加入购物车或立即购买时快速点击标示符
      }
    },
    props: {
      data: {
        type: Object
      },
    },
    computed: {
      goodsInfo(){
        return this.data;
      },
      priceType(){
        switch (this.data.goodsType) {
          case 1:
            return "价格";
            break;
          case 2:
            return "秒杀价";
            break;
          case 3:
            return "团购价";
            break;
          default:
            return '价格';
            break;
        }
      }
    },
    components: {Scroll, Slider, ImgEnlarge, Comment, CartControl, CountDown},
    methods: {
      _getPromotion(){
        this.$parent.getDataPromotion();
      },
      showSpec(){
        this.$parent.addCart(2);
      },

      loadImage () { //刷新better-scroll
        if (!this.checkloaded) {
          setTimeout(() => {
            this.$refs.scroll.refresh();
          }, 150);
          this.checkloaded = true
        }
      },
      imgExchange(status){ //图片轮播图片放大
        this.imgBig = status;
      },
      setCurrentPage(index){ //当前图片轮播
        this.initPage = index
      },
      priceAsk(){//税费说明
        MessageBox.confirm('税费说明', '').then((action) => {
          if (action === "confirm") {
          }
        }, () => {
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .slider-wrapper {
    position: relative;
  }

  .scroll-view {
    position: absolute;
    top: 0px;
    bottom: 50px;
    width: 100%;
    overflow: hidden;
  }

  .cell-margin {
    margin-bottom: 12px;
  }

  .mint-cell-allow-right:after {
    width: 14px;
    height: 14px;
    border-color: #999;
  }

  .line {
    margin: 10px 0;
    width: 100%;
    height: 1px;
    background-color: #f3f3f3;
  }

  .goods-info-wrapper {
    padding: 10px 0;
    background-color: #fff;
    .goods-name, .goods-name-detail {
      overflow: hidden;
      font-weight: bolder;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      padding: 0 10px;
      &.goods-name {
        font-size: 0.38rem;
        color: #3b404a;
        line-height: 0.5rem;
        max-height: 1rem;
        min-height: 0.5rem;
        display: flex;
        position: relative;
      }
      &.world {
        span {
          text-indent: 1.6rem;
        }
      }
      &.world:before {

        content: "全球购";
        width: 1.5rem !important;
        position: absolute;
        text-align: center;
        display: block;
        height: 0.44rem;
        line-height: 0.44rem;
        margin-right: 3px;
        padding: 2px 0;
        color: #fff;
        background-color: red;
      }
      &.goods-name-detail {
        font-size: 0.3rem;
        color: #3b404a;
        line-height: 0.32rem;
        height: 0.64rem;
      }
    }
    .price-wrapper {
      margin: 10px 10px 0 10px;
      background-color: #f2f5f9;
      display: flex;
      align-items: center;
      padding: 10px;
      .title {
        font-size: 0.32rem;
        color: #585454;
      }
      .price {
        color: #ff5d5d;
        font-size: 0.66rem;
        font-weight: bolder;
        font-family: arial;
        display: block;
        margin-left: 0.6rem;
        &:before {
          content: '￥';
          font-size: 0.36rem;
        }
      }
    }

  }

  .mint-cell-title .left-text {
    color: #8f949e;
    i {
      text-decoration: line-through;
      font-style: normal;
    }
  }

  .cell-border {
    border: none;
    border-bottom: 1px solid #f3f3f3;
  }

  .cell-slot-title {
    .title {
      color: #8f949e;
    }
    .content {
      background-color: #79bebe;
      padding: 4px 16px;
      height: 16px;
      line-height: 16px;
      color: #fff;
      border-radius: 4px;
      margin-left: 4px;
    }
    .content-rule {
      color: #444;
      margin-left: 6px;
    }
  }

  .icon-icon-ask {
    color: #377dcc;
    font-size: 0.38rem;
    display: inline-block;
    margin-left: 12px;
  }

  .active-wrapper {
    display: flex;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      background-color: #ff5d5d;
      padding-left: 5px;
      font-size: 12px;
      color: #fff;
      .sale-price {
        font-size: 16px;
        display: inline-block;
        margin-right: 6px;
      }
    }
    .right {
      width: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
