<template>
    <div class="container">
      <header-tab :title="title" :titleTab="false" :titleSet="true"></header-tab>
      <div class="wrapper">

        <Scroll @scroll="scroll"
                @scrollEndInit = "scrollEndInit"
                class="scroll-view"
                ref="scroll"
                :data="list"
                :pullup="true"
                :listenScroll="true"
                :probe-type="1" v-if="list.length>0">
            <ul>
              <li class="listItem" v-for="item in list">
                <dl>
                  <dt><img :src="item.goodsThumbnail" alt=""></dt>
                  <dd>
                    <p>{{item.goodsTitle}}</p>
                    <p>{{item.goodsSpecValue}}</p>
                    <p>￥{{item.goodsPrice/100}}</p>
                  </dd>
                </dl>
                <p class="commentCont">{{item.commentContent}}</p>
                <div class="grade">
                  <em>{{item.createTime}}</em>
                  <div class="starBox">
                      <span class="activeStar">
                        <i class="icon iconfont icon-star-full" v-for="starItem in item.avgGrade"></i>
                      </span>
                    <span class="grayStar">
                        <i class="icon iconfont icon-star-full" v-for="starIten in length"></i>
                      </span>
                  </div>
                </div>
                <div class="clearfix" v-if="item.reCommentTitle==undefined">
                  <span class="againBtn" @click="againComment(item.id)">追加评论</span>
                </div>
                <div class="againComment" v-else>
                  <span>{{item.reCommentTitle}}</span>
                  <p>{{item.reCommentContent}}</p>
                  <div>
                    <img :src="reImg" alt="" v-for="reImg in item.rePictureList">
                  </div>
                </div>
              </li>
            </ul>
            <div v-show="isLoading" style="padding: 10px 0">
              <mt-spinner :size="30" style="display:flex;justify-content: center" type="fading-circle">
              </mt-spinner>
            </div>
        </Scroll>
        <empty-data title="暂无数据" v-else></empty-data>
      </div>
    </div>
</template>

<script>
  import HeaderTab from '@/base/header-tab/header-tab';
  import Scroll from '@/base/scroll/scroll';
  import emptyData from '@/base/empty-data/empty-data';
  import { mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import {dataHostUrl} from '@/api/config';
  import {local} from '@/common/js/util';
  import {getData} from '@/api/myComment'
  export default {
    data(){
      return {
        title:['我的评价'],
        list:[],
        length:5,
        pageIndex: 1,
        pageCount: 1,
        scrollY: 0,
        loaderAll: false,
        isLoading:false,
      }
    },
    created(){
      this.SET_Loading(true);
      this._getData(this.pageIndex);
    },
    methods:{
      _getData(pageIndex){
          let that = this;
          getData(pageIndex).then((res)=>{
              that.SET_Loading(false);
              if(res.status==='success'){
                  if (res.data==undefined) {
                    that.loaderAll = true;
                    that.isLoading = false;
                    return;
                  }
                  that.isLoading = false;
                  if(that.pageCount > 0){
                    that.list = that.list.concat(res.data);
                    that.pageIndex = res.page.pageIndex + 1;
                  }
              }else{
                  that._toast(res.message);
              }
          })
      },
      scroll(pos){ //监听滚动
        this.scrollY = pos.y;
      },
      scrollEndInit(){
        if (!this.loaderAll) {
          //!this.isLoading && this._getData(this.pageIndex);
          if(!this.isLoading){
            this._getData(this.pageIndex)
          }
          this.isLoading = true;
        }
      },
      againComment(id){
          this.$router.push('/againComment/'+id);
      },
      _toast(msg){
        let tip = Toast(msg);
        setTimeout(()=>{
          tip.close();
        },1500);
      },
      ...mapMutations({
        SET_Loading: 'SET_Loading'
      })
    },
    components:{
      HeaderTab,emptyData,Scroll
    },
    deactivated(){
      this.$destroy()
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  .clearfix{clear:both;overflow:hidden;}
  .container{
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
    bottom:0;
    overflow: hidden;
  }
  .wrapper{

    padding-top:$header-height;
    font-size:0.28rem;
    .listItem{
      padding:0.24rem;
      border-bottom:1px solid $cart-border-color;
      dl{overflow:hidden;}
      dt{
        float:left;
        width:1.56rem;
        height:1.56rem;
        overflow:hidden;
        img{
          display:block;
          width:100%;
        }
      }
      dd{
        width:4.9rem;
        height:1.16rem;
        background:#f5f5f5;
        padding:0.2rem;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        float:right;
        font-size:0.26rem;
        p{line-height:140%;}
        p:nth-of-type(1){color:#333};
        p:nth-of-type(2){color:#999;}
        p:last-child{color:#666;}
      }
      .commentCont{padding:0.2rem 0;}
      .grade{
        overflow:hidden;
        height:0.5rem;
        line-height:0.5rem;
        padding:0.1rem 0;
        em{font-style:normal;color:#999;}
        .starBox{
          float:right;
          width:2rem;
          position:relative;
          i{margin:0 0.05rem;font-size:0.3rem;}
          .activeStar,.grayStar{position:absolute;text-align:right;}
          .grayStar{
            color:#eee;
          }
          .activeStar{
            color:#27abfa;
            z-index:2;
          }
        }
      }
      .againBtn{
        float:right;
        color: #27abfa;
      }
      .againComment{
        overflow:hidden;
        span{color:#0093e7;}
        p{line-height:160%;padding:0.1rem 0;}
        img{display:block;width:1.56rem;height:1.56rem;float:left;padding:0.05rem;}
      }
    }
  }

</style>
