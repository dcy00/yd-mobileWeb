<template>
  <swiper :options="swiperOption" ref="mySwiper" class="swiper-container-vertical" id="here">
    <!-- slides -->
        <swiper-slide class="swiper-slide-par">
          <img src="image/service1_img.png">
        </swiper-slide>
        <swiper-slide class="swiper-slide-par swiper-slide-par2">
          <div class="describe">
            <h3 class="title">药监认证</h3>
            <p class="content-p">
              优德医药网是河南省第一批获得国家食品药品监督管理局颁发的《互联网药品交易服务资格证书》的网上药店。
            </p>
            <p class="content-p">
              同时拥有线下连锁药店，权威认证，值得信赖！
            </p>
          </div>
          <swiper :options="swiperOption2" ref="mySwiper2" class="swiper-container1">
              <swiper-slide class=""><img id="mes" src="image/z1.jpg"></swiper-slide>
              <swiper-slide class="swiper-slide-mar"><img src="image/z2.jpg"></swiper-slide>
              <swiper-slide class="swiper-slide-mar"><img src="image/z3.jpg"></swiper-slide>
              <swiper-slide class="swiper-slide-mar"><img src="image/z4.jpg"></swiper-slide>
              <swiper-slide class="swiper-slide-mar"><img src="image/z5.jpg"></swiper-slide>
              <swiper-slide class="swiper-slide-mar"><img src="image/z6.jpg"></swiper-slide>
              <img class="left" src="image/z-h.png">
          </swiper>
        </swiper-slide>
        <swiper-slide class="swiper-slide-par">
          <div class="describe">
            <h3 class="title">79包邮</h3>
            <p class="content-p">
              百分百满意 、百分百周到、消费满99、邮费免单！
            </p>
          </div>
          <img class="baoyou" src="image/baoyou.png">
        </swiper-slide>
        <swiper-slide class="swiper-slide-par">
          <div class="describe">
            <h3 class="title">签收起7日内退换无忧</h3>
            <p class="content-p">
              退货是一种特权，因此我们在国家规定的7天无理由退换货基础上全面升级。您的安心，我的用心！
            </p>
          </div>
          <img class="t7" src="image/7t.png">
        </swiper-slide>
        <swiper-slide class="swiper-slide-par">
          <div class="describe">
            <h3 class="title">隐私配送</h3>
            <p class="content-p">
              优德医药网所有商品均是实行保密包装，充分保护您的商品信息。您的隐私，我的责任！
            </p>
            <p class="promise-p">
              我们承诺
            </p>
            <p class="content-p">
              <span>1. 隐私包装 , 便捷配送。</span>
              <span>2. 包装箱采用5层瓦楞纸加强材质，内部合理填充，不透视、不易破损、隐私性强。</span>
            </p>
          </div>
          <img class="yinsi" src="image/yinsi.png">
        </swiper-slide>
        <swiper-slide class="swiper-slide-par">
          <div class="describe">
            <h3 class="title">金牌药师</h3>
            <p class="content-p">
              金牌药师优德医药网为您打造“金牌药师团”，药师7*12小时免费为您提供专业的药学服务，一切只为更专！
            </p>
            <p class="content-p">
              业的解决您和您家人的每个健康问题。 因为专业，所以值得信赖！
            </p>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide-par">
          <div class="describe">
            <h3 class="title">货到付款</h3>
            <p class="content-p">
              不需要繁琐的在线支付流程，不用担心“眼见为虚”，享受先收货后付款的便捷体验，货到付款，购药更放心 ！
            </p>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide-par">
          <div class="describe">
            <h3 class="title">健康管家</h3>
            <p class="content-p">
              <span class="size12">优德医药网</span>
              超千万用户选择，最好使用的网上药店，药师导药、便捷支付、订单快查。
            </p>
          </div>
          <img class="code" src="image/code.png">
        </swiper-slide>
        <swiper-slide class="swiper-slide-par">
          <div class="describe">
            <h3 class="title">海量库存</h3>
            <p class="content-p" style="text-align: center;">
              实体品质，我们有自己的药品仓库！
            </p>
          </div>
        </swiper-slide>

      <!-- Add Pagination -->
      <div class="swiper-pagination"  slot="pagination"></div>

  </swiper>
</template>

<script>
  import '@/common/js/jquery-3.0.0.js';
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.min.css';
    export default{
        data(){
            return {
              swiperOption:{},
              swiperOption2:{},
            };
        },
        name: "index",
        props: {},
        components: { swiper, swiperSlide},
        created: function () {

        },
        computed: {},
        watch: {

        },
        updated: function () {

        },
        mounted: function () {
          $(".swiper-pagination").hide();
          $(".swiper-slide-par").css("height",'568px');
          $(".swiper-slide-mar").css("height",'568px');
          this.swiperOption={
          direction : 'vertical',
          pagination: {
            el: '.swiper-pagination',
          },
          paginationClickable :true,
          onTransitionEnd: function (swiper) {
            var el = swiper.activeIndex;
            if(el>=1){
              $(".swiper-pagination").show();
            }else{
              $(".swiper-pagination").hide();
            }
          }
        };
          this.swiperOption2={
          direction : 'horizontal',
          onTransitionStart: function (swiper) {
            $(".left").hide();
          }
        };

        },
        methods: {

        },
    }
</script>
<style scoped>
  html, body {
    position: relative;
    height: 100%;
    font-family:  "微软雅黑";
    color: #ffffff;
    background-color: #ffffff;
  }
  body {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  .swiper-container1 {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    margin-top: 50px;
  }


  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet{
    width: 35px;
    height:35px;
    background: none;
    opacity: 1;
    border-radius: 100%;
    margin: 12px auto;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background-color: #ffffff;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(1){
    width: 0px;
    height: 0px;
  }

  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(2){
    background: url("./image/service2.png") no-repeat -35px -8px;
    background-size: 70px auto;

  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(2).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -8px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(3){
    background: url("./image/service2.png") no-repeat -35px -59px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(3).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -59px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(4){
    background: url("./image/service2.png") no-repeat -35px -110px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(4).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -110px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(5){
    background: url("./image/service2.png") no-repeat -35px -161px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(5).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -161px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(6){
    background: url("./image/service2.png") no-repeat -35px -213px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(6).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -213px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(7){
    background: url("./image/service2.png") no-repeat -35px -264px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(7).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -264px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(8){
    background: url("./image/service2.png") no-repeat -35px -315px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(8).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -315px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(9){
    background: url("./image/service2.png") no-repeat -35px -367px;
    background-size: 70px auto;
  }
  .swiper-container-vertical>.swiper-pagination .swiper-pagination-bullet:nth-of-type(9).swiper-pagination-bullet-active{
    background: url("./image/service2.png") no-repeat left -367px;
    background-size: 70px auto;
  }
  .swiper-slide-par:nth-of-type(1){
    background:url("./image/service_bg1.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(2){
    background:url("./image/service_bg2.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(3){
    background:url("./image/service_bg3.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(4){
    background:url("./image/service_bg4.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(5){
    background:url("./image/service_bg5.jpg") no-repeat center center ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(6){
    background:url("./image/service_bg6.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(7){
    background:url("./image/service_bg7.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(8){
    background:url("./image/service_bg8.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide-par:nth-of-type(9){
    background:url("./image/service_bg9.jpg") no-repeat center center  ;
    background-size: cover;
  }
  .swiper-slide.swiper-slide-par:nth-of-type(1){
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .swiper-slide-par:nth-of-type(1) img {
    width: 70%;
    height: auto;

  }
  .swiper-container1 img{
    display: block;
    width: 90%;
    height:auto;
    margin-left: -34px;
  }
  /*  .swiper-container1 .swiper-slide:nth-of-type(1) img{
        width: 70%;
        height:auto;
        margin: 0px auto 0;
    }*/
  .swiper-container1 .swiper-slide{
    height: 100%;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
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
    padding: 0 45px;
  }
  h3{
    font-size: 20px;
    padding-top: 30px;
    display: block;
    width: 100%;
    color: #ffffff;
    font-family: "微软雅黑";
  }
  .swiper-slide-mar img{
    /*    margin-top: 100px;*/
  }
  .describe{
    position: relative;
    margin: 0 44px 0 20px;
  }
  .swiper-slide p{
    font-size: 13px;
    display: block;
    width: 100%;
    color: #ffffff;
    font-family: "微软雅黑"
  }
  .swiper-slide p span.size12{
    font-size: 12px;
    line-height: 20px;
  }
  .swiper-slide p.content-p{
    line-height: 18px;
    margin-top: 8px;
    text-align: left;
  }
  .swiper-slide p.promise-p{
    margin-top: 10px;
    font-size: 15px;
    text-align: left;
  }
  .swiper-slide p.content-p span{
    display: block;
  }
  .baoyou{
    width: 71.56%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    margin: auto;
  }
  .t7{
    width: 59.53%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .yinsi{
    width: 78%;
    height: auto;
    margin-top: 30px;
    position: absolute;
    left: 20px;
  }
  .world{
    width: 82%;
    height: auto;
    margin-top: 30px;
    position: absolute;
    left: 8px;
  }
  .code{
    width: 61.71%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 30px;
    margin: auto;
    padding-right: 30px;
  }
  @media screen and (max-height: 481px) {
    .swiper-slide h3{
      padding-top: 16px;
    }
    .swiper-slide p.content-p{
      line-height: 18px;
      margin-top: 6px;
      text-align: left;
    }
    .swiper-slide p.promise-p{
      margin-top: 8px;
      font-size: 15px;
      text-align: left;
    }
  }
  @media screen and (max-height: 600px) and (min-height: 500px){
    .swiper-container1{
      margin-top: 64px;
    }
    .yinsi{
      margin-top: 30px;;
    }
  }
  @media screen and (max-height: 700px) and (min-height: 600px){
    .swiper-container1{
      margin-top: 66px;
    }
    .yinsi{
      margin-top: 50px;;
    }
    .swiper-container1{
      margin-top: 84px;
    }
  }
  @media screen and (min-height: 700px) {
    .swiper-container1{
      margin-top:106px;
    }
    .yinsi{
      margin-top: 70px;;
    }
  }
  .swiper-container1 img.left,.swiper-container1 img.right{
    position: absolute;
    display: block;
    width: 100px;
    height: auto;
    top: 50%;
    margin-top: -50px;
    left: 50%;
    z-index: 2;
  }
  .swiper-container1 img.left{
    margin-left: -50px;
    animation: leftSwipe 1.4s 1s ease-in infinite;
    -moz-animation: leftSwipe 1.4s 1s ease-in infinite;	/* Firefox */
    -webkit-animation: leftSwipe 1.4s 1s ease-in infinite;	/* Safari 和 Chrome */
    -o-animation: leftSwipe 1.4s 1s ease-in infinite;
  }

  @keyframes leftSwipe {
    0%   {left:50%;}
    100% {left:20%;}
  }
  @-webkit-keyframes leftSwipe {
    0%   {left:50%;}
    100% {left:20%;}
  }
</style>
