<template>
  <div class="star">
    <i class="icon iconfont icon-star" v-for="(item,index) in length" :key="index" :class="itemClass(index)"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'star',
    props: {
      score: {
        type: Number,
        default: 5,
        validator: function (value) {
          if (value >= 0 && value <= 5) {
            return value
          } else {
            return 5
          }
        }
      }
    },
    data(){
      return {
        length: 5
      }
    },
    methods: {
      itemClass(index){
        if (this.score - index > 0) {
          return 'on';
        } else {
          return 'off';
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .star {
    display: flex;
    align-items: center;
    .icon {
      font-size: 22px;
      display: inline-block;
      margin-left: 1px;
      color: #7e8c8d;
      &.on {
        color: #ea3323;
      }
      &.off {
        color: #999;
      }
    }
  }
</style>
