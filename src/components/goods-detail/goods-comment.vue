<template>
  <div>
    <scroll class="scroll-view scroll-view-right"
            ref="scroll"
    >
      <div>
        <div v-if="comment">
          <comment v-for="(item,index) in comment" :comment="item" :key="index"></comment>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '@/base/scroll/scroll'
  import Comment from '@/base/comment/comment'

  export default {
    props: {
      data: {
        type: Array
      },
    },
    computed: {
      comment(){
        return this.data;
      },
    },
    components: {Scroll, Comment},
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .slider-wrapper {
    position: relative;
  }

  .scroll-view {
    position: absolute;
    top: 0px;
    bottom: 50px;
    width: 100%;
    overflow: hidden;
  }
</style>
