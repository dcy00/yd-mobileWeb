<template>
  <div class="container">
    <header-youde :search="true"></header-youde>
    <div v-if="showPage">
      <!--左侧导航-->
      <scroll class="scroll-view scroll-view-left">
        <ul class="ul-wrapper">
          <li v-for="(item, index) in initData" @click="changeCurrentItem(index)"
              :class="{ 'active': index == current }">
            {{item.name}}
          </li>
        </ul>
      </scroll>
      <!--右侧数据-->
      <scroll class="scroll-view scroll-view-right"
              @scroll="scroll"
              ref="scroll"
              :probe-type="3"
              :listenScroll="true"
      >
        <div class="right-wrapper">
          <div class="right-item" v-for="item in currentRightData">
            <p class="name">{{ item.name}}</p>
            <div class="item-wrapper clearfix">
              <div class="goods-item" v-for="(goods, index) in item.leaf" :class="{boderTop: index!=0 && index != 1}" @click="searchByCategory(item.id,goods.id)">
                <img class="goods-img" :src="goods.cover"/>
                <p class="goods-name">{{goods.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <go-top @goTop="goTop" :scrollY="scrollY"></go-top>
    <footer-tab></footer-tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCategory} from '@/api/category';
  import Scroll from '@/base/scroll/scroll';
  import HeaderYoude from '@/base/header-youde/header-youde';
  import GoTop from '@/base/go-top/go-top';
  import FooterTab from '@/components/footerTab/footerTab';
  import {mapMutations} from 'vuex';
  export default {
    data() {
      return {
        initData: "",//分类页数据
        current: 2, //当前选中的菜单
        scrollY: -1,
        showPage: false//是否显示页面
      }
    },
    created(){
      //获取数据
      this._getCategory();
      this.SET_Loading(true);
    },
    computed: {
      currentRightData(){//右侧当前数据
        if (this.initData !== "" && this.initData[this.current].leaf.length > 0) {
          return this.initData[this.current].leaf;
        } else {
          return "";
        }

      }
    },
    components: {Scroll, HeaderYoude, GoTop,FooterTab},
    methods: {
      //初始化数据
      _getCategory(){
        getCategory().then((res) => {
          if (res.status === "success") {
            this.initData = res.data;
            this.showPage = true;
          }
          this.SET_Loading(false);
        })
      },
      searchByCategory(second,third){
        this.$router.push({path: 'searchList',query: {secondCategoryId:second,thirdCategoryId:third}})
      },
      //点击选中一级菜单
      changeCurrentItem(i){
        this.current = i;

        this.$refs.scroll.refresh();
        this.goTop();
      },
      scroll(pos){
        this.scrollY = pos.y;
      },
      goTop(){//回到顶部
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
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .scroll-view {
    overflow: hidden;
    position: fixed;
    top: $header-height;
    bottom: 50px;
    left: 0px;
    &.scroll-view-left {
      width: 2.2rem;
      background-color: #f0f1f3;
      .ul-wrapper {
        li {
          font-size: 0.3rem;
          height: 1rem;
          text-align: center;
          line-height: 1rem;
          border-bottom: 1px solid #e4e5e7;
          &.active {
            background-color: #fff;
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
    &.scroll-view-right {
      left: 2.2rem;
      right: 10px;
      padding-left: 10px;
      .right-item {
        padding-bottom: 30px;
        .name {
          font-size: 0.3rem;
          height: 0.4rem;
          line-height: 0.4rem;
          margin: 0.2rem 0;
          display: flex;
          align-items: center;
          &:before {
            content: " ";
            display: inline-block;
            width: 0.07rem;
            height: 0.34rem;
            margin-right: 0.16rem;
            border-radius: 0.07rem;
            background-color: #89c1e1;
          }
        }
        .item-wrapper {
          border: 1px solid #eee;
          border-radius: 0.14rem;
          .goods-item {
            width: 50%;
            float: left;
            box-sizing: border-box;
            text-align: center;
            padding: 0.2rem 0;
            &.boderTop {
              border-top: 1px solid #eee;
            }
            &:nth-child(odd) {
              border-right: 1px solid #eee;
            }
            .goods-img {
              width: 1.8rem;
              height: 1.8rem;
            }
            .goods-name {
              font-size: 12px;
            }
          }
        }
      }
    }

  }
</style>
