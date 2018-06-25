<template>
  <transition name="slide-down">
    <div class="container" v-show="popShow.isShow">
      <div class="level" @click.stop="hide()" ></div>
      <div class="content">
        <div class="close" @click="hide()">
          <i class="icon iconfont icon-2guanbi"></i>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      popShow: Object
    },
    methods: {
      hide(){
        this.popShow.isShow = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }

  .level {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(100, 100, 100, 0.1);
  }

  .content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    z-index: 101;
    background-color: #fff;
    overflow: auto;
    .close {
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      right: 12px;
      top: 12px;
      .icon {
        display: block;
        font-size: 0.4rem;
        color: #ff5d5d;
        text-align: center;
        line-height: 0.6rem;
      }
    }
  }

  .slide-down-enter-active, .slide-down-leave-active {
    transition: all .5s;
    transform: translate(0, 0);
  }

  .slide-down-enter, .slide-down-leave-to {
    transform: translate(0, 100%);
  }

</style>
