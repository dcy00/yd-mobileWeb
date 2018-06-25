<template>
    <div class="container">
      <header-youde :title="title"></header-youde>
      <div class="wrapper">
        <div class="navBar">
          <ul>
            <li :class="{'active':isClassify}" @click="switchMenu('classify')">分类 <span>全部</span></li>
            <li :class="{'active':isIntegral}" @click="switchMenu('integral')">积分 <span>低→高</span></li>
          </ul>
        </div>
        <div class="list">
          <ul>

            <router-link to="/integralDetail/2" tag="li">
              <div class="imgBox">
                <img src="./goodsImg.jpg" alt="">
              </div>
              <div class="itemInfo">
                <p>原生态铁轨山药，是上好的中草药。原生态铁轨山药，是上好的中草药。</p>
                <p>
                  <span>积分100</span>
                  <span>库存66</span>
                </p>
              </div>
            </router-link>
            <router-link to="/integralDetail/2" tag="li">
              <div class="imgBox">
                <img src="./goodsImg.jpg" alt="">
              </div>
              <div class="itemInfo">
                <p>原生态铁轨山药，是上好的中草药。</p>
                <p>
                  <span>积分100</span>
                  <span>库存66</span>
                </p>
              </div>
            </router-link>
            <router-link to="/integralDetail/2" tag="li">
              <div class="imgBox">
                <img src="./goodsImg.jpg" alt="">
              </div>
              <div class="itemInfo">
                <p>原生态铁轨山药，是上好的中草药。</p>
                <p>
                  <span>积分100</span>
                  <span>库存66</span>
                </p>
              </div>
            </router-link>
          </ul>
        </div>
      </div>

      <div class="shadowLayer" v-show="isShow" @click="menuHide"></div>
      <div class="menuWrap" :class="{'leftTopArrow':isClassify,'rightTopArrow':isIntegral}" v-show="isShow">
        <ul>
          <li>全部</li>
          <li>食品</li>
          <li>日用百货</li>
          <li>虚拟物品</li>
        </ul>
      </div>

    </div>
</template>

<script>
    import headerYoude from "@/base/header-youde/header-youde"
    export default {
        data(){
            return {
                title:"积分商城",
                isShow:false,
                isClassify:false,
                isIntegral:false,
            }
        },
        components:{
            headerYoude
        },
        methods:{
          switchMenu(type){
              let that = this;
              that.isShow = true;
              switch (type){
                case "classify":
                  that.isClassify = true;
                  that.isIntegral = false;
                  break;
                case "integral":
                  that.isClassify = false;
                  that.isIntegral = true;
                  break;
              }
          },
          menuHide(){
            let that = this;
            that.isShow = false;
            that.isClassify = false;
            that.isIntegral = false;
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  $color-font:#3b404a;
  $color-blue:#1074c9;
  .container{
    width:100%;
  }
  .wrapper{
    padding-top:0.96rem;
    color:$color-font;
    font-size:0.3rem;
    .navBar{
      padding:0.1rem;
      overflow:hidden;
      li{
        width:3.6rem;
        height:0.8rem;
        line-height:0.8rem;
        background:#fff;
        text-align:center;
        float:left;
        -webkit-box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.1);
        -moz-box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.1);
        box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.1);
        @include border-radius();
        &:first-child{
          margin-right:0.05rem;
        }
        &:last-child{
          margin-left:0.05rem;
        }
        &.active{
          background:#f4f5f6;
        }
        span{
          padding-left:0.15rem;
          color:$color-blue;
        }
      }
    }
    .list{
      padding:0 0.1rem;
      ul{width:100%;}
      li{
        width:3.65rem;
        padding:0.15rem;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        border-right:1px solid $cart-border-color;
        border-bottom:1px solid $cart-border-color;
        background:#fff;
        float:left;
        .imgBox{
          display:block;
          width:100%;
          overflow:hidden;
          img{
            width:100%;
          }
        }
        .itemInfo{
          p{
            &:first-child{
              line-height:140%;
              margin-bottom:0.15rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              -moz-line-clamp: 2;
              line-clamp: 2;
              overflow: hidden;
            }
            &:last-child{
              display:flex;
              flex-direction: row;
              align-content: space-between;
              height:0.5rem;
              line-height:0.5rem;
            }
            span{
              display:inline-block;
              &:first-child{
                width:60%;
                color:$color-blue;
              }
              &:last-child{
                width:40%;
                text-align:right;
                font-size:0.26rem;
              }
            }
          }
        }
      }
    }

  }
  .shadowLayer{
    position:fixed;
    top:1.96rem;
    right:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,0.3);
  }
  .menuWrap{
    position:fixed;
    top:1.96rem;
    right:0;
    left:0;
    width:100%;
    background:#fff;
    font-size:0.3rem;
    color:$color-font;
    &:before{
      display:block;
      content:'';
      overflow:hidden;
      width:0.3rem;
      height:0.3rem;
      background:#fff;
      @include transform-rotate(45deg);
      position:absolute;
      top:-0.12rem;
    }
    &.leftTopArrow{
      &:before{
        left:1.8rem;
      }
    }
    &.rightTopArrow{
      &:before{
        right:1.8rem;
      }
    }
    ul{
      display:block;
      padding:0.38rem 0.86rem;
      overflow:hidden;
    }
    li{
      width:2.23rem;
      margin:0.24rem 0.32rem;
      border:1px solid #d7dce0;
      height:0.64rem;
      line-height:0.64rem;
      text-align:center;
      -webkit-box-sizing:border-box;
      -moz-box-sizing:border-box;
      box-sizing:border-box;
      @include border-radius(0.32rem);
      float:left;
    }
  }
</style>
