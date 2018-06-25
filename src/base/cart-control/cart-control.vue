<template>
  <div class="cart-wrapper">
    <div class="decrease" @click="decrease">
      <i class="icon iconfont icon-jian"></i>
    </div>
    <input class="number" v-model="number"  v-on:keyup="clearNotNumber" type="number"/>
    <div class="add" @click="add">
      <i class="icon iconfont icon-jia"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {clearNotNumber} from '@/common/js/validate'
  export default {
      props:{
         max:{
             type:Number
         }
      },
      data(){
          return {
            number:1
          }
      },
    methods:{
      clearNotNumber(){
          this.number = clearNotNumber(this.number);
          this.checkNum();
          this.$emit("setNumber",this.number);
      },
      checkNum(){
        if(this.number-this.max>0){
            this.number = this.max;
        }
      },
      decrease(){
          if(this.number>1){
              this.number = this.number - 1;
            this.$emit("setNumber",this.number)
          }
      },
      add(){
        if(this.number-this.max<0){
          this.number = this.number + 1;
          this.$emit("setNumber",this.number)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .cart-wrapper{
    width: 120px;
    height: 28px;
    border: 1px solid #ccc;
    display: flex;
    background: #fff;
    .decrease,.add{
      width: 28px;
      height: 28px;
      font-size: 16px;
      text-align: center;
      line-height: 28px;
      color: #333;
    }
    .number{
      border-radius: 0;
      width: 64px;
      height: 28px;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      text-align: center;
    }
  }
</style>
