<template>
  <swiper :options="swiperOption" :ref="refName">
    <!-- slides -->
   <!-- <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <swiper-slide>I'm Slide 4</swiper-slide>
    <swiper-slide>I'm Slide 5</swiper-slide>
    <swiper-slide>I'm Slide 6</swiper-slide>
    <swiper-slide>I'm Slide 7</swiper-slide>-->
    <slot name="slide"></slot>
    <!-- Optional controls -->
    <div class="swiper-pagination"  v-if="pagination" slot="pagination"></div>
    <!--<div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css';
  export default{
    props: {
      refName: {//引用的名称
        type: String, Number,
        default: 'mySwiper'
      },
      pagination: {//小圆点的显示与隐藏
        type: Boolean,
        default: true
      },
      autoplay: {//是否自动
        type: Boolean,
        default: true
      },
      slidesPerView: {
        type: Number,
        default: 1
      },
      spaceBetween:{
        type: Number,
        default: 0
      },
      direction: {//方向控制
        type: String,
      }
    },
    data(){
      return {
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: this.autoplay,
          direction : this.direction,//horizontal：横向切换 vertical:竖向切换
          pagination: {
            el: '.swiper-pagination',
          },
          slidesPerView:this.slidesPerView,
          spaceBetween:this.spaceBetween,
          loop: true,
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          //pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
        }
      };
    },
    name: "index",

    components: { swiper, swiperSlide},
    created: function () {

    },
    computed: {},
    watch: {},
    updated: function () {

    },
    mounted: function () {
        //console.log(this.flag)
    },
    methods: {},
  }
</script>
<style scoped>
  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
