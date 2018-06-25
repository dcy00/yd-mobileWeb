<template>
  <header class="header-container">
    <div class="f_logo" @click="back">
      <i class="icon iconfont icon-back"></i>
    </div>
    <div class="title-box">
      <div v-for="(item,index) in title"    :class="{active:active===(idName+index),titleTab:titleTab,titleSet:titleSet}" @click="tabChange(index)" :key="index"><span>{{item}}</span></div>
    </div>
    <div class="right" @click="goHome">
      <i class="icon iconfont icon-home2"></i>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      active: {
        type: String,
        default:"tab-container0"
      },
      idName:{
        type: String,
        default:"tab-container"
      },
      title: {
        type: Array
      },
      isBack: {
        type: Boolean,
        default:false
      },
      titleTab: {
        type: Boolean,
        default:true
      },
      titleSet: {
        type: Boolean,
        default:false
      },
    },
    methods: {
      back(){
          if(this.isBack){
              this.$emit("back")
          }else {
            this.$router.back()
          }
      },
      tabChange(index) {
          this.$emit('tabChange',index)
      },
      goHome() {
          this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  .header-container {
    position: fixed;
    width: 100%;
    height: $header-height;
    padding-top: $color-fix-padding;
    line-height: 1.5;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
    border-bottom: 1px solid #e7e7e7;
    .f_logo, .right {
      box-sizing: border-box;
      height: $header-height;
      position: absolute;
      text-align: center;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      &.f_logo {
        left: 10px;
        width: 0.4rem;
        i {
          font-size: 0.4rem;
          color: #585959;
          font-weight: bold;
        }
      }
      &.right {
        right: 10px;
        width: 0.6rem;
        i {
          font-size: 0.5rem;
          color: #6c6f74;
        }
      }
    }


    .title-box {
      width: auto;
      position: absolute;
      box-sizing: border-box;
      display: flex;
      display: -webkit-box;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      border-radius: 3px;
      top:50%;
      .titleTab {
        height: 0.52rem;
        box-sizing: border-box;
        color: #585454;
        font-size: 0.26rem;
        padding: 0 0.3rem;
        line-height: 0.52rem;
        background-color: #fff;
        border: 1px solid #377dcc;
        border-right: none;
        &.active {
          background-color: #377dcc;
          color: #fff;
        }
        &:last-child{
          border-radius: 0 3px 3px 0;
          border-right: 1px solid #377dcc;
        }
        &:first-child{
          border-radius: 3px 0 0 3px;
        }
      }
    }

  }
  .titleSet{
    font-weight: 400;
    font-size: .35rem;
    color: #585959;
  }
</style>
