<template>
    <div class="actionSheetWrap">
      <div class="shadowLayer" :class="{'show':isShow}" @click="hideHandle"></div>
      <div class="actionSheet" :class="{'show':isShow}">
        <slot></slot>
        <div class="cancel" @click="hideHandle">取消</div>
      </div>
    </div>
</template>

<script>
    export default {
        props:{
            isShow:Boolean
        },
      methods:{
        hideHandle(){
            this.$emit('actionReturn',{isShow:false});
        }
      }
    }
</script>

<style lang="scss" scoped>
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
      transform:translateY(0);
      background:rgba(0,0,0,0.3);
    }
  }
  .actionSheet{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#fff;
    color:#494949;
    transform:translateY(100%);
    @include transition(all,linear,0.3s);
    z-index:2;
    &.show{
      transform:translateY(0);
    }
    .cancel{
      width:100%;
      height:1rem;
      line-height:1rem;
      text-align:center;
    }
  }
</style>
