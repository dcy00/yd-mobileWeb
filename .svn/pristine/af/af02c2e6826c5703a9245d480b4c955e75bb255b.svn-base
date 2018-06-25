<template>
    <div>
      <div class="goodsCount">
        <span class="de" :class="{'active': num > 1}" @click="changeNum(-1)"></span>
        <em>{{num}}</em>
        <span class="add" :class="{'active': num < max }" @click="changeNum(1)"></span>
      </div>
    </div>
</template>

<script>
    export default {
        props:{
            max:{
                type:Number
            },
            num:{
                type:Number
            },
            id:{
                type:String
            },
            isGlobal:{
                type:Boolean
            }
        },
        methods:{
            changeNum(n){
                let params={
                    isGlobal:this.isGlobal,
                    id:this.id,
                    changeType:n,
                };

                if(n<0 && this.num===1){
                    return false;
                }else if(this.num===this.max && n>0){
                    return false;
                }else{
                  this.$emit("setNumber",params);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";

  .goodsCount{
    float:right;
    height:0.56rem;
    margin-top:0.04rem;
    em{
      display:block;
      width:0.9rem;
      height:0.48rem;
      text-align:center;
      font-size:0.28rem;
      font-style:normal;
      float:left;
    }
    span{
      display:block;
      width:0.48rem;
      height:0.48rem;
      background:#999;
      float:left;
      position:relative;
      @include border-radius(50%);
      &:before,&:after{
        display:block;
        content:'';
        overflow:hidden;
        background:#fff;
        position:absolute;
        top:50%;
        left:50%;
      }
      &:before{
        width:14px;
        height:2px;
        margin:-1px 0 0 -7px;
      }
      &:after{
        width:2px;
        height:14px;
        margin:-7px 0 0 -1px;
      }
      &.de{
        &:after{
          display:none;
        }
      }
      &.active{
        background:#58b3e7;
      }
    }
  }
</style>
