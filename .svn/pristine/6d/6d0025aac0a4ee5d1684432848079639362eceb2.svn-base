<template>
    <div class="cartFixedBtm">
      <div class="cartCheckAll">
        <label :class="{'active':cartBtmData.allSelected}"></label>
        全选
      </div>
      <div class="cartTotal" v-if="!cartBtmData.isDelete">
        <p>合计：<strong>0.00</strong></p>
      </div>
      <div class="cartFixedRight" :class="{'bgRed': cartBtmData.isDelete}">
        <span v-if="!cartBtmData.isDelete">结算</span>
        <span v-else>删除</span>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        cartBtmData:Object
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
    .cartCheckAll{
      float:left;
      height:1.06rem;
      line-height:1.06rem;
      padding-left:0.24rem;

      label{
        display:inline-block;
        width: 0.38rem;
        height:0.38rem;
        background:url('checkIcon.png') no-repeat;
        background-size:0.38rem 0.86rem;
        margin:0.34rem 0.08rem 0 0;
        float:left;
        &.active{
          background-position:0 -0.48rem;
        }
      }
    }
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
      &.bgRed{
        background:linear-gradient(150deg,rgba(255,0,0,0.5),#f00);
      }
    }
  }
</style>
