<template>
  <div class="go-top-wrapper" @click="goTop" v-show="isShow">
    <i class="icon iconfont icon-top"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
        scrollY:{
            type:Number,
            default:0
        }
      },
    data() {
          return{
            isShow:false
          }
    },
      methods:{
          goTop(){
              this.$emit("goTop")
          }
      },
    watch:{
          scrollY(newY){
            if (-newY > window.innerHeight) {
              this.isShow=true
            }else {
              this.isShow=false
            }
          }
    }
  }
</script>
<style scoped>
  .go-top-wrapper{
    position: fixed;
    display: flex;
    box-sizing: border-box;
    bottom: 52px;
    right: 10px;
    width: 40px;
    height: 40px;
    background-color: rgba(255,255,255,0.6);
    border-radius: 100%;
    overflow: hidden;
    border: 1px solid #efefef;
    box-shadow: 1px 1px 1px #efefef;
    justify-content: center;
    align-items: center;

  }
  .icon-top{
    display: block;
    font-size: 16px;
    color: #686868;
    font-weight: bold;
  }
</style>
