<template>
  <div>
    <header-youde title="我的收藏" :edit="true" @editHandle="editHandle"></header-youde>
    <Scroll @scroll="scroll"
            @scrollEndInit="scrollEndInit"
            :pullup="true"
            class="scroll-view"
            ref="scroll"
            :data="initData"
            :listenScroll="true"
            :probe-type="3"
            :style="{bottom:isEdit?'1.06rem':0}"
            v-if="this.initData.length > 0">
      <div>
        <ul class="scroll-list">
          <li class="list-wrapper" v-for="(item,index) in initData" :key="index">
            <a>
              <div class="list-box">
                <label class="checkbox" v-show="isEdit" :class="{'active':checkModel[index]}"
                       @click="changeCheckState(index)">
                </label>
                <div class="left" @click="goToDetail(item.bid)">
                  <img :src="item.goodsThumbnail"/>
                </div>
                <div class="right" @click="goToDetail(item.bid)">
                  <span class="goods-name">{{item.goodsTitle}}</span>
                  <span class="goods-price">¥{{item.goodsMinPrice | myPrice}}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div v-show="isLoading" style="padding: 10px 0">
          <mt-spinner :size="30" style="display:flex;justify-content: center" type="fading-circle">
          </mt-spinner>
        </div>
      </div>
    </Scroll>
    <empty-data v-else title="您还没有收藏商品"></empty-data>
    <go-top @goTop="goTop" :scrollY="scrollY"></go-top>
    <div class="cartFixedBtm" v-show="isEdit">
      <div class="cartCheckAll">
        <label :class="{'active':checkedAll}" @click="changAllCheckState"></label>
        全选
      </div>
      <div class="cartFixedRight" @click="deleteCollect">
        <span>删除</span>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import HeaderYoude from '@/base/header-youde/header-youde';
  import EmptyData from '@/base/empty-data/empty-data';
  import Scroll from '@/base/scroll/scroll';
  import GoTop from '@/base/go-top/go-top';
  import {mapMutations} from 'vuex';
  import {getCollectList, deleteCollect} from '@/api/my-collect';
  import {InfiniteScroll, Toast} from 'mint-ui';
  export default {
    data(){
      return {
        pageIndex: 1,
        pageCount:1,
        scrollY: 0,
        loaderAll: false,
        isEdit: false,
        initData: [],//数据
        isLoading: false,//加载中不可重复请求
        checkedAll: false,//全选
        checkModel: [], //选择框
        ids: [] //选中数组id
      }
    },
    components: {HeaderYoude, EmptyData, Scroll, GoTop},
    created(){
      this._initData();
      this.SET_Loading(true);
    },
    deactivated(){
      this.$destroy()
    },
    methods: {
      _initData() { //获取收藏数据
        getCollectList(this.pageIndex).then((res) => {
          if (res.status === 'success') {
            if (res.data === undefined) {
              this.loaderAll = true;
              this.SET_Loading(false);
            }else{
              this.SET_Loading(false);
              this.isLoading = false;
              if (this.pageCount > 0) {
                res.data.forEach((value, index) => {
                  this.checkModel.push(false);
                })
                this.initData = this.initData.concat(res.data);
                this.pageIndex = res.page.pageIndex + 1;
              }
            }
          }
        })
      },
      deleteCollect(){ //取消收藏
        if (this.ids.length === 0) {
          Toast('您还没有选中商品');
          return;
        }
        deleteCollect(this.ids.join()).then((d) => {
          if (d.status === 'success') {
            for (var i = 0; i < this.checkModel.length; i++) {
              if (this.checkModel[i] === true) {
                this.checkModel.splice(i, 1);
                this.initData.splice(i, 1);
                i--;
              }
            }
            this.$refs.scroll.refresh();
            if (this.checkModel.length === 0) {
              this.pageCount = 0;
            }
          }
        })
      },
      changeCheckState(index){ //改变选中状态
        this.$set(this.checkModel, index, !this.checkModel[index])
      },
      changAllCheckState(status, type){//全选
        if (status !== 1) {
          type = !this.checkedAll;
        }
        this.checkModel.map((value, index) => {
          this.$set(this.checkModel, index, type);
        });
      },
      scroll(pos){ //监听滚动
        this.scrollY = pos.y;
      },
      goTop(){ //回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      scrollEndInit(){//滚动到底部
        if (!this.loaderAll) {
          !this.isLoading && this._initData();
          this.isLoading = true;
        }

      },
      goToDetail(goodsId){
        this.$router.push({path: `/goodsDetail/${goodsId}`})
      },
      ...mapMutations({
        SET_Loading: 'SET_Loading'
      }),
      editHandle(type){
        this.isEdit = type;
        if (type === false) {
          this.changAllCheckState(1, false);
        }
      }
    },
    watch: {
      checkModel: { //监听选中状态
        handler(){
          this.ids = [];
          let checkModel = this.checkModel.filter((value, index) => {
            if (value === true) {
              this.ids.push(this.initData[index].id)
              return value
            }
          });
          if (checkModel.length === this.initData.length) {
            this.checkedAll = true;
          } else {
            this.checkedAll = false;
          }
        },
        deep: true
      }
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
    align-items: center;
    label {
      display: inline-block;
      width: 0.38rem;
      height: 0.38rem;
      background: url('checkIcon.png') no-repeat;
      background-size: 0.38rem 0.86rem;
      margin-right: 10px;
      &.active {
        background-position: 0 -0.48rem;
      }
    }
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

  .cartFixedBtm {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.06rem;
    background: #fff;
    border-top: 1px solid $cart-border-color;
    font-size: 0.3rem;
    color: #424e5a;
    .cartCheckAll {
      float: left;
      height: 1.06rem;
      line-height: 1.06rem;
      padding-left: 0.24rem;

      label {
        display: inline-block;
        width: 0.38rem;
        height: 0.38rem;
        background: url('checkIcon.png') no-repeat;
        background-size: 0.38rem 0.86rem;
        margin: 0.34rem 0.08rem 0 0;
        float: left;
        &.active {
          background-position: 0 -0.48rem;
        }
      }
    }
    .cartFixedRight {
      float: right;
      width: 2.2rem;
      height: 1.08rem;
      line-height: 1.08rem;
      text-align: center;
      background: linear-gradient(150deg, rgba(255, 0, 0, 0.5), #f00);
      span {
        color: #fff;
        font-size: 0.34rem;
      }
    }
  }
</style>
