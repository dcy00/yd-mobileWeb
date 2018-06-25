<template>
    <div class="confirmContainer">
      <div class="shadowLayer"></div>
      <div class="confirmWrap">
        <h3>以下商品请先分类再去结算</h3>
        <div class="inner">
          <ul>
            <li v-for="(item,index) in confirmData" @click="touchHandle(index)">
              <label :class="{'active':item.isCheck}"><i></i></label>
              <span>{{item.text}}</span>
            </li>
          </ul>
        </div>
        <div class="btm">
          <span @click="hideHandle">返回购物车</span>
          <span @click="nextHandle">去结算</span>
        </div>
      </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import { local,getUid } from '@/common/js/util';
    export default {
      props:{
          confirmData:Array
      },
      data(){
          return {
              ids:''
          }
      },
      methods:{
        touchHandle(index){
            let that = this;
            let data = that.confirmData;
            for(let i=0;i<data.length;i++){
              data[i].isCheck = false;
            }
            data[index].isCheck = true;
            that.ids = data[index].ids;
        },
        nextHandle(){
            let springraintoken = local.get('springraintoken');
            if(this.ids.length>0){
                if(springraintoken){
                  window.location.href='/cartCheckout/'+this.ids;
                  //this.$router.push('/cartCheckout/'+this.ids);
                }else{
                  this.$router.push('/login')
                }

            }else{
              let tip = Toast('您未选择类别');
              setTimeout(function(){
                tip.close();
              },1500)
            }
        },
        hideHandle(){
            this.$emit('confirmEmit',{confirmBl:false})
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  .shadowLayer{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.2);
    z-index:10;
  }
  .confirmWrap{
    position:fixed;
    top:50%;
    right:0.9rem;
    left:0.9rem;
    height:3rem;
    background:#fff;
    padding:0.15rem;
    margin-top:-2rem;
    font-size:0.28rem;
    @include border-radius(10px);
    z-index:12;
    h3{
      height:0.5rem;
      line-height:0.5rem;
      padding:0.1rem 0;
      border-bottom:1px solid $cart-border-color;
      font-size:0.28rem;
    }
    .inner{
      padding:0.15rem;
      border-bottom:1px solid $cart-border-color;
      li{
        height:0.38rem;
        line-height:0.38rem;
        padding:0.1rem 0;
        &:after{
          display:block;
          content:'';
          overflow:hidden;
          clear:both;
        }
        span{
          display:inline-block;
          padding-left:0.15rem;
          float:left;
        }
        label{
          display:inline-block;
          width:0.38rem;
          height:0.38rem;
          @include border-radius(50%);
          border:1px solid $cart-border-color;
          position:relative;
          float:left;
          i{
            display:none;
            width:0.2rem;
            height:0.1rem;
            border-left:1px solid #fff;
            border-bottom:1px solid #fff;
            @include transform-rotate(-45deg);
          }
          &.active{
            background:$cart-red-color;
            border:1px solid $cart-red-color;
            i{
              display:block;
              position:absolute;
              top:0.08rem;
              left:0.07rem;
            }
          }
        }
      }
    }
    .btm{
      padding-top:0.15rem;
      overflow:hidden;
      span{
        display:block;
        width:50%;
        height:0.58rem;
        line-height:0.58rem;
        text-align:center;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        float:left;
        &:first-child{
          border-right:1px solid $cart-border-color;
        }
        &:last-child{
          color:#36c;
        }
      }
    }
  }

</style>
