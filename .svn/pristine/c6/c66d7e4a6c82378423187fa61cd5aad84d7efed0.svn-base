<template>
    <div class="popupContainer">
      <div class="shadowLayer" :class="{'show':popShow.isShow}" @click="hideHandle"></div>
      <div class="popupWrap" :class="{'show':popShow.isShow}">
        <div class="popupHeader">
          {{popShow.title}}
          <em class="closeBtn" @click="hideHandle"></em>
        </div>
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        popShow:Object
      },
      methods:{
        hideHandle(){
            this.popShow.isShow = false;
          /*this.closeHandle();*/
        },
        /*closeHandle(){
          this.$emit('closeHandle',{isShow:false});
        }*/
      }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";

  .shadowLayer{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0);
    transform:translateY(100%);
    @include transition(all,linear,0.3s);
    &.show{
      bottom:0;
      transform:translateY(0);
      background:rgba(0,0,0,0.2);
    }
  }
  .popupWrap{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#fff;
    color:#494949;
    transform:translateY(100%);
    @include transition(all,linear,0.3s);
    z-index:200;
    &.show{
      transform:translateY(0);
    }
    .popupHeader{
      width:100%;
      height:0.5rem;
      line-height: 0.5rem;
      padding:0.1rem 0;
      text-align:center;
      font-size:0.3rem;
      border-bottom:1px solid $cart-border-color;
      position:relative;
      em{
        display:block;
        width:0.36rem;
        height:0.36rem;
        line-height: 0.36rem;
        font-style:normal;
        text-align:center;
        background:$cart-red-color;
        padding:0.02rem;
        position: absolute;
        top:0.15rem;
        right:0.24rem;
        @include border-radius(50%);
        @include transform-rotate(45deg);
        &:before,&:after{
          display:block;
          content:'';
          background:#fff;
          overflow:hidden;
          position:absolute;
        }
        &:before{
          width:14px;
          height:2px;
          top:50%;
          left:50%;
          margin:-1px 0 0 -7px;
        }
        &:after{
          width:2px;
          height:14px;
          top:50%;
          left:50%;
          margin:-7px 0 0 -1px;
        }
      }

    }

  }
</style>
