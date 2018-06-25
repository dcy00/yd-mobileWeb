<template>
  <div class="container"  v-title="name">
    <header-youde :title="name" v-if="showHeader"></header-youde>
    <div class="wrapper" v-if="this.pageCount > 0">

      <Scroll @scroll="scroll"
              @scrollEndInit="scrollEndInit"
              :pullup="true"
              class="scroll-view"
              ref="scroll"
              :style="{top:showHeader?'.96rem':0}"
              :data="initData"
              :listenScroll="true"
              :probe-type="3">
        <div>
          <ul class="scroll-list">
            <li class="list-wrapper" v-for="(item,index) in initData" :key="index" @click="goToDetail(item.id)">
              <a>
                <div class="list-box">
                  <div class="left">
                    <img :src="item.thumbnail"/>
                  </div>
                  <div class="right">
                    <span class="goods-name">{{item.title}}</span>
                    <div>
                      <div class="vip" v-if="item.entityCardId"><span class="name">vip卡</span><span class="rule"></span>满{{item.entityCardMoneyLimit | myPrice}}元减{{item.entityCardMoney | myPrice}}元
                      </div>
                      <span class="goods-price">¥{{item.minPrice | myPrice}}</span>
                    </div>

                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div v-show="loadMore" style="padding: 10px 0">
            <mt-spinner :size="30" style="display:flex;justify-content: center" type="fading-circle">
            </mt-spinner>
          </div>

        </div>
      </Scroll>
    </div>
    <empty-data v-else title="抱歉没有找到商品"></empty-data>
    <go-top @goTop="goTop" :scrollY="scrollY"></go-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderYoude from '@/base/header-youde/header-youde';
  import {mapMutations} from 'vuex';
  import {getCategoryList} from '@/api/search';
  import EmptyData from '@/base/empty-data/empty-data';
  import Scroll from '@/base/scroll/scroll';
  import GoTop from '@/base/go-top/go-top';
  import {InfiniteScroll} from 'mint-ui';
  import {goToGoodsDetail,showTitle} from '@/common/js/go-android';
  export default {
    data() {
      return {
        pageCount: 1, //共几页
        initData: [],
        pageIndex: 1,//当前页
        sort: 'asc', //升序降序
        order: 'salesVolume', //搜索方式，新品，销量，价格
        loadMore: false,
        scrollY: 0,
        isLoading: false,//加载中不可重复请求
        name: "",
        type: {},
        showHeader:false
      }
    },
    created() {
      this.getKeyWords();

    },
    deactivated(){
      this.$destroy()
    },
    components: {HeaderYoude, EmptyData, Scroll, GoTop},
    methods: {
      getKeyWords(){
        if (this.$route.query.type) {
          this.type = this.$route.query.type.split('/');
          //this.name = this.type.name;
        }
        this._initData();
        this.SET_Loading(true);
      },
      _initData() {
        if (this.pageIndex - this.pageCount > 0) {
          return;
        }
        getCategoryList(this.type[0],this.type[1], this.type[2], this.type[3],this.pageIndex).then((res) => {
          if (res.status === 'success') {
            this.name = res.queryBean.name;
            if(window.native){
              showTitle(this.name);
            }else {
                this.showHeader = true;
            }
            this.SET_Loading(false);
            this.loadMore = false;
            this.pageCount = res.page ? res.page.pageCount : 0;
            if (this.pageCount > 0) {
              this.initData = this.initData.concat(res.data);
              this.pageIndex = res.page.pageIndex + 1;
              this.isLoading = false;
            }
          }
        })
      },
      scroll(pos){ //监听滚动
        this.scrollY = pos.y;
      },
      goTop(){ //回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      scrollEndInit(){//滚动到底部
        if (this.pageIndex - this.pageCount > 0) {
          return;
        }
        this.loadMore = true;
        !this.isLoading && this._initData();
        this.isLoading = true;
      },
      goToDetail(goodsId){
        if (window.native) {
          goToGoodsDetail(goodsId)
        } else {
          this.$router.push({path: `/goodsDetail/${goodsId}`})
        }

      },
      ...mapMutations({
        SET_Loading: 'SET_Loading'
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

  .scroll-view {
    position: fixed;
    top: $header-height;
    width: 100%;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }

  .list-wrapper {
    height: 80px;
    padding: 15px 12px;
    border-bottom: 1px solid #ddd;
    position: relative;
    a {
      display: block;
      flex-direction: row;
    }
  }

  .list-box {
    display: flex;
    .left {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: 22px;
      font-size: 0;
      .goods-name {
        font-size: 13px;
        color: #656565;
        line-height: 18px;
        height: 36px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .vip {
        font-size: 12px;
        margin-top: 3px;
        .name {
          display: inline-block;
          width: 36px;
          height: 16px;
          line-height: 16px;
          border: 1px solid red;
          text-align: center;
          color: red;
          margin-right: 10px;
        }
      }

      .goods-price {
        font-size: 12px;
        color: #eb4344;
      }
    }
  }
</style>


