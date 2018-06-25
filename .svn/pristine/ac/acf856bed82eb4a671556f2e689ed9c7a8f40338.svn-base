<template>
    <div>
      <header-youde :title="title"></header-youde>
      <div class="wrapper">
        <div class="imgBox">
          <img src="./goodsImg.jpg" alt="">
        </div>
        <div class="goodsInfo">
          <p>原生态铁轨山药，是上好的中草药。原生态铁轨山药，是上好的中草药。</p>
          <p>
            积分 <span>800</span>
          </p>
          <p>库存60</p>
        </div>
        <div class="goodsContent">

        </div>
      </div>
      <div class="fixedBtm">
        <div class="leftCont">使用<span>800</span>积分兑换</div>
        <div class="rightCont" @click="exchangeHandle">
          <span>兑换</span>
        </div>
      </div>
      <pop-menu :popShow="popObj"></pop-menu>
    </div>
</template>

<script>
  import headerYoude from "@/base/header-youde/header-youde";
  import popMenu from "@/base/pop-menu";
  export default {
    data(){
        return {
          title:"积分商品详情",
          popObj:{
              isShow:false
          }
        }
    },
    components:{
      headerYoude,
      popMenu
    },
    methods:{
      _getId(){
          this.id = this.$route.params.id;
          //console.log(this.id);
      },
      exchangeHandle(){
          this.popObj.isShow = true;
      }
    },
    created(){
      this._getId();
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  $color-font:#3b404a;
  $color-red:#ff5d5d;
  .wrapper{
    padding-top:0.96rem;
    padding-bottom:1.06rem;
    .imgBox{
      width:100%;
      img{
        display:block;
        width:100%;
      }
    }
    .goodsInfo{
      color:$color-font;
      padding:0.24rem;
      background:#fff;
      p{
        &:first-child{
          font-size:0.34rem;
          margin-bottom:0.1rem;
          padding:0.15rem 0;
        }
        &:nth-child(2){
          background:#f2f5f9;
          font-size:0.3rem;
          padding:0.32rem 0.15rem;
          margin-bottom:0.1rem;
          @include border-radius(8px);
          span{
            font-size:0.49rem;
            color:$color-red;
          }
        }
        &:last-child{
          font-size:0.26rem;
          padding:0.15rem;
        }
      }
    }
    .goodsContent{
      margin:0.24rem 0;
      background:#fff;
      padding:0.24rem;
    }
  }

  .fixedBtm{
    position: fixed;
    right:0;
    bottom:0;
    left:0;
    width:100%;
    height:1.06rem;
    font-size:0.3rem;
    background:#fff;
    border-top:1px solid $cart-border-color;
    .leftCont{
      float:left;
      padding:0 0.24rem 0 0.39rem;
      line-height:1.06rem;
      span{
        padding:0 0.1rem;
        color:$color-red;
      }
    }
    .rightCont{
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
      &.disabled{
        background:linear-gradient(150deg,rgba(0,0,0,0.3),#7e8c8d);
      }
    }
  }
</style>
