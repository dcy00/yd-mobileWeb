<template>
    <div class="cartFixedBtm">
      <div class="cartTotal">
        <p>合计：<strong>{{realMoney/100}}</strong></p>
      </div>
      <div class="cartFixedRight" @click="createOrderFn">
        <span>结算</span>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        realMoney:Number
      },
      methods:{
        createOrderFn(){
            this.$emit('createOrder',{isBl:true});
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  .cartFixedBtm{
    width:100%;
    height:1.06rem;
    background:#fff;
    border-top:1px solid $cart-border-color;
    font-size:0.3rem;
    color:#424e5a;
    .cartTotal{
      float:left;
      height:1.06rem;
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left:0.24rem;
      strong{
        color:$cart-red-color;
      }
    }
    .cartFixedRight{
      float:right;
      width:2.2rem;
      height:1.08rem;
      line-height:1.08rem;
      text-align:center;
      background:linear-gradient(150deg,rgba(55,150,208,0.9),#36c);
      span{
        color:#fff;
        font-size:0.34rem;
      }
    }
  }
</style>
