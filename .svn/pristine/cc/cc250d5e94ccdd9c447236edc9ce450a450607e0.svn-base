<template>
  <div class="container">
    <header-youde title="今日团购"></header-youde>
    <div class="wrapper" v-if="initData">
      <ul class="tab">
        <li :class="{active:type.order === 'saleNum'}" @click="changeOrder('saleNum')">
          销量<span class="icon iconfont" :class="[type.sort === 'asc' ? 'icon-asc' : 'icon-desc']"></span>
        </li>
        <li :class="{active:type.order === 'price'}" @click="changeOrder('price')">
          价格<span class="icon iconfont" :class="[type.sort === 'asc' ? 'icon-asc' : 'icon-desc']"></span>
        </li>
        <li :class="{active:type.order === 'startTime'}" @click="changeOrder('startTime',true)">
          发布时间<span class="icon iconfont" :class="[type.sort === 'asc' ? 'icon-asc' : 'icon-desc']"></span>
        </li>
      </ul>
      <Scroll @scroll="scroll"
              class="scroll-view"
              ref="scroll"
              :data="initData"
              :listenScroll="true"
              :probe-type="3">
        <div>
          <ul class="scroll-list">
            <li class="list-wrapper" v-for="(item,index) in initData" :key="index" @click="goToDetail(item.goodsId)">
              <a>
                <div class="list-box">
                  <div class="left">
                    <img :src="item.thumbnail"/>
                  </div>
                  <div class="right">
                    <span class="goods-name">{{item.title}}</span>
                    <span class="goods-price">¥{{item.price | myPrice}}</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
    <empty-data v-else title="抱歉暂时没有团购活动"></empty-data>
    <go-top @goTop="goTop" :scrollY="scrollY"></go-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderYoude from '@/base/header-youde/header-youde';
  import {mapMutations} from 'vuex';
  import {getGroup} from '@/api/group-buying';
  import EmptyData from '@/base/empty-data/empty-data';
  import Scroll from '@/base/scroll/scroll';
  import GoTop from '@/base/go-top/go-top';
  import {InfiniteScroll} from 'mint-ui';
  export default {
    data() {
      return {
        initData: [],
        type: {
          sort: 'desc', //升序降序
          order: 'saleNum', //搜索方式，新品，销量，价格
        },
        scrollY: 0,
      }
    },
    created() {
      this._initData();
      this.SET_Loading(true);
    },
    deactivated(){
      this.$destroy()
    },
    components: {HeaderYoude, EmptyData, Scroll, GoTop},
    methods: {
      _initData() {
        getGroup(this.type.sort, this.type.order).then((res) => {
          if (res.status === 'success') {
            this.initData = [];
            this.SET_Loading(false);
            this.initData = res.data;
          }
        })
      },
      changeOrder(orderVal, descVal){ //改变排序
        if (this.type.order !== orderVal) {
          this.$set(this.type, 'order', orderVal);
          this._initData();
          this.SET_Loading(true);
        } else {
          let sort = this.type.sort === 'asc' ? 'desc' : 'asc';
          this.$set(this.type, 'sort', sort);
          this._initData();
          this.SET_Loading(true);
        }
      },
      goToDetail(goodsId){
        this.$router.push({path: `/goodsDetail/${goodsId}`})
      },
      scroll(pos){ //监听滚动
        this.scrollY = pos.y;
      },
      goTop(){ //回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500)
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
      background-color: #f5f7f9;
      li {
        color: #444;
        flex: 1;
        font-size: 14px;
        text-align: center;
        &.active {
          color: #377dcc;
          border-bottom: 2px solid #377dcc;
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


