<template>
  <div class="container">
    <header-youde :search="true" :keywords="keywords"></header-youde>
    <div class="wrapper" v-if="this.pageCount > 0">
      <ul class="tab">
        <li :class="{active:order === 'updateTime'}" @click="changeOrder('updateTime')">新品</li>
        <li :class="{active:order === 'salesVolume'}" @click="changeOrder('salesVolume')">销量</li>
        <li :class="{active:order === 'minPrice'}" @click="changeOrder('minPrice',true)">价格<span class="icon iconfont"
                                                                                                 :class="[sort === 'asc' ? 'icon-asc' : 'icon-desc']"></span>
        </li>
      </ul>
      <Scroll @scroll="scroll"
              @scrollEndInit="scrollEndInit"
              :pullup="true"
              class="scroll-view"
              ref="scroll"
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
                    <span class="goods-price">¥{{item.minPrice | myPrice}}</span>
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
    <demand-button></demand-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderYoude from '@/base/header-youde/header-youde';
  import demandButton from '@/base/demand-button';
  import {mapMutations} from 'vuex';
  import {getSearch} from '@/api/search';
  import EmptyData from '@/base/empty-data/empty-data';
  import Scroll from '@/base/scroll/scroll';
  import GoTop from '@/base/go-top/go-top';
  import {InfiniteScroll} from 'mint-ui';
  export default {
    data() {
      return {
        keywords: '',
        pageCount: 1, //共几页
        initData: [],
        pageIndex: 1,//当前页
        sort: 'asc', //升序降序
        order: 'salesVolume', //搜索方式，新品，销量，价格
        loadMore: false,
        scrollY: 0,
        isLoading: false,//加载中不可重复请求
        secondCategoryId: '',//二级分类
        thirdCategoryId: '',//三级分类
        pCateId: ''//一级分类'
      }
    },
    created() {
     this.getKeyWords()
    },
    deactivated(){
      this.$destroy()
    },
    components: {HeaderYoude, EmptyData, Scroll, GoTop, demandButton},
    methods: {
        getKeyWords(){
          if (this.$route.query.keywords) {
            this.keywords = this.$route.query.keywords;
          }
          if (this.$route.query.pCateId) {
            this.pCateId = this.$route.query.pCateId;
          }
          if (this.$route.query.secondCategoryId) {
            this.secondCategoryId = this.$route.query.secondCategoryId;
          }
          if (this.$route.query.thirdCategoryId) {
            this.thirdCategoryId = this.$route.query.thirdCategoryId;
          }
          this._initData();
          this.SET_Loading(true);
        },
      _initData() {
        if (this.pageIndex - this.pageCount > 0) {
          return;
        }
        getSearch(this.keywords, this.pageIndex, this.sort, this.order, this.pCateId, this.secondCategoryId, this.thirdCategoryId).then((res) => {
          if (res.status === 'success') {
            this.pageCount = res.page.pageCount;
            this.SET_Loading(false);
            this.loadMore = false;
            if (this.pageCount > 0) {
              this.initData = this.initData.concat(res.data);
              this.pageIndex = res.page.pageIndex + 1;
              this.isLoading = false;
            }
          }
        })
      },
      changeOrder(type, desc){ //改变排序
        if (this.order !== type) {
          this.order = type;
          this.pageIndex = 1;
          this.initData = [];
          this._initData();
          this.SET_Loading(true);
        } else {
          if (desc) {
            this.sort = this.sort === 'asc' ? 'desc' : 'asc';
            this.pageIndex = 1;
            this.initData = [];
            this._initData();
            this.SET_Loading(true);
          }
        }

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
          console.log(goodsId)
        this.$router.push({path: `/goodsDetail/${goodsId}`})
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

  .wrapper {
    .tab {
      position: fixed;
      top: $header-height;
      width: 100%;
      height: $tab-height;
      line-height: $tab-height;
      display: flex;
      border-bottom: 1px solid #ddd;
      z-index: 10;
      background-color: #fff;
      li {
        color: #444;
        flex: 1;
        font-size: 14px;
        text-align: center;
        &.active {
          color: #377dcc;
          .iconfont {
            color: #377dcc;
          }
        }
        .iconfont {
          font-size: 14px;
          color: #444;
          font-weight: bolder;
        }
      }
    }

  }

  .tab-wrapper {
    position: absolute;
    top: $header-height;
    bottom: 0px;
    width: 100%;
  }

  .scroll-view {
    position: fixed;
    top: $tab-top;
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
      .goods-price {
        font-size: 12px;
        color: #eb4344;
      }
    }
  }
</style>


