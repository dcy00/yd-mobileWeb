<template>
  <transition name="fade">
  <div class="img-wrapper"  @click="hideImg">
    <div class="slider-wrapper">
      <slider :loop="false"
              :autoPlay="false"
              :currentPage="true"
              :initPage="initCurrentPage"
              :click="true"
              @tellCurrentPage="setCurrentPage">
        <div v-for="(item,index) in imgArr" @click.stop="hideImg">
          <img class="needsclick img" :src="item.filepath"/>
        </div>
      </slider>
    </div>
    <div class="bottom">
      <span>{{initPage+1}}/{{imgArr.length}}</span>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Slider from '@/base/slider/slider'
  export default {
    props: {
      imgArr: {
        type: Array,
        require: true
      },
      initCurrentPage: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        initPage :this.initCurrentPage
      }
    },
    methods: {
      setCurrentPage(index) {
        this.initPage = index
      },
      hideImg(){
        this.$emit('hideImg',false)
      }
    },
    components: {Slider}
  }
</script>
<style scoped>
  .img-wrapper {
    position: fixed;
    top: 0px;
    bottom: 0px;
    background-color: #000;
    width: 100%;
    display: flex;
    z-index: 100;
    align-items: center;
  }

  .slider-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .img {
    width: 100%;
    height: auto;
    background-color: #fff;
  }

  .bottom {
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0px;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
</style>
