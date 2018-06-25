<template>
  <div>
    <!--搜索框开始-->
    <header class="clearfix" id="gHeader">
      <div class="level1">
        <div class="f_logo">
          <img src="../zizhi/image/b.png"/>
        </div>
        <div class="search">
          <router-link to="/category">
            <img src="../zizhi/image/w.png"/>
          </router-link>
        </div>
        <div class="search_box">
          <router-link to="/search">
            <div class="wapSearch">
              <button type="submit" class="search_btn"></button>
              <input type="text" class="search_txt" placeholder="请输入你要搜索的商品" id="keyword"/>
            </div>
          </router-link>
        </div>
      </div>
      <div class="logoPacity" :style="{opacity:opacity}"></div>
    </header>
    <!--搜索框结束-->
    <section>
      <!--图片轮播-start-->
      <div class="slider-wrapper">
        <wap-swiper refName="mySwiper01" direction="horizontal">
          <template slot="slide">
            <swiper-slide v-for="(item, index) in turnData" :key="index">
              <!--跳转到外站-->
              <a :href="item.jumpVal" v-if="item.jumpType===1||item.jumpType===6"><img :src="item.turnImg"/></a>
              <!--跳转到商品详情-->
              <router-link v-else="item.jumpType === 4" :to="/goodsDetail/+item.jumpVal"><img :src="item.turnImg"/>
              </router-link>
            </swiper-slide>
          </template>
        </wap-swiper>
      </div>
      <!--图片轮播-end-->
      <div class="line"></div>
      <!--宫格图-start-->
      <div class="menu">
        <ul class="ind_navi clearfix">
          <li v-show="gonggeData" v-for="(item, index) in gonggeData" :key="index">
            <a @click="goToList(item)"><i><img :src="item.turnImg"/></i>{{item.name}}</a>
          </li>
        </ul>
      </div>
      <!--宫格图-end-->
      <div class="line"></div>
      <div  v-if="haibaoData.length >0">
        <div class="haibao-wrapper">
          <div class="item" v-for="(item,index) in haibaoData" :key="index" @click="goToList(item)">
            <img :src="item.turnImg"/>
          </div>
        </div>
        <div class="line"></div>
      </div>

      <!--秒杀-start-->
      <div v-if="seckillList.length">
      <div class="miaosha clearfix"><!--如果秒杀为空不渲染-->
        <div class="msTitle clearfix">
          <div class="msTitleLeft">
            <img src="../zizhi/image/msLeft.png" alt="">
            <span>秒杀</span>
          </div>
          <div class="msTitleRight">
            <count-down v-if="seckillTime"
                        :startTime="seckillTime.nowSystemTime"
                        :endTime="seckillTime.endTime"
                        :isTime="false"
                        :countDownTitle="startendTitle">
            </count-down>
          </div>
        </div>
        <router-link to="/seckill" tag="div" class="msCont">
          <wap-swiper v-if="seckillList.length>2" refName="mySwiper02" :pagination="false" direction="horizontal" :slidesPerView=3
                      :spaceBetween="10">
            <template slot="slide">
              <swiper-slide class="slider-item msGoods" v-for="(item, index) in seckillList" :key="index">
                <div class="msGoods-text">
                  <span>￥{{item.minGoodsPrice / 100}}</span>
                  <span class="deLine">￥{{item.maxGoodsPrice / 100}}</span>
                </div>
                <div class="killItemImg"><img v-lazy="item.goodsThumbnail" alt="" class="killImg"></div>
                <p class="msGoods-title">{{item.goodsTitle}}</p>
              </swiper-slide>
            </template>
          </wap-swiper>
          <div class="skill-wrapper" v-else="">
            <div class="slider-item msGoods" v-for="(item, index) in seckillList" :key="index">
              <div class="msGoods-text">
                <span>￥{{item.minGoodsPrice / 100}}</span>
                <span class="deLine">￥{{item.maxGoodsPrice / 100}}</span>
              </div>
              <div class="killItemImg"><img v-lazy="item.goodsThumbnail" alt="" class="killImg"></div>
              <p class="msGoods-title">{{item.goodsTitle}}</p>
            </div>
          </div>
        </router-link>
      </div>
        <!--秒杀-end-->
        <div class="line"></div>
      </div>
      <!--
      今日头条
      <div class="jinrituangou" style="height: 60px">
        <div class="jr-link">
      <wap-swiper refName="mySwiper03"  style="height: 60px" :pagination="false" direction="vertical">
        <template slot="slide">
          <swiper-slide style="height: 60px" v-for="(item, index) in groupData" :key="index">
            <div class="jrSwiperList">
              <div class="jrSwiperListText">
                <span class="jsSwiperP">加拿大进口/ YouHealth（优健康） 红景天胶囊 150mg*60粒</span>
                <span class="jsSwiperPrace">￥12</span>
              </div>
            </div>
          </swiper-slide>
        </template>
      </wap-swiper>
        </div>
      </div>-->

      <!--今日团购开始-->
      <div class="jinrituangou">
        <div class="jr-title">
          <span class="jr-title1">优德医药</span>
          <span class="jr-title2">今日团购</span>
        </div>
        <router-link tag="div" to="/groupBuying" class="jr-link">
          <wap-swiper refName="mySwiper03" direction="horizontal" :pagination="false">
            <template slot="slide">
              <swiper-slide v-for="(item, index) in groupData" :key="index">
                <div class="jrSwiperList">
                  <div class="jrSwiperListImg">
                    <img
                      :src="item.thumbnail"
                      alt="">
                  </div>
                  <div class="jrSwiperListText">
                    <span class="jsSwiperP">{{item.title}}</span>
                    <span class="jsSwiperPrace">￥{{item.price | myPrice}}</span>
                  </div>
                </div>
              </swiper-slide>
            </template>
          </wap-swiper>

        </router-link>
      </div>
      <!--今日团购结束-->
      <div class="line"></div>
      <!--栏目开始-->
      <div class="group clearfix">
        <div class="groupListCont groupListContEq" v-if="customData.length" v-for="(item, index) in customData"
             :key="index" @click="goToList(item)">
          <img :src="item.img" alt=""/>
        </div>
      </div>
      <div class="group group2" v-if="bannerData" @click="goToList(bannerData)">
        <div class="groupList-s">
          <img :src="bannerData.img" alt="">
        </div>
      </div>
      <!--栏目结束-->
      <div class="line"></div>
      <!--为您推荐开始-->
      <div class="recommend">
        <div class="recommendTitle">
          <img src="../zizhi/image/star.png" alt="">
          <span>为您推荐</span>
        </div>
        <div class="recommendCont clearfix">
          <router-link tag="div" :to="/goodsDetail/+item.id" class="recommendList" v-if="recommendData"
                       v-for="(item,index) in recommendData" :key="index">
            <div class="inner">
              <div class="recommendListImg"><img :src="item.thumbnail" alt="" class="recommendImgSize"></div>
              <span class="recommendListTitle">{{item.title}}</span>
              <span class="recommendListPrace">￥<span>{{item.minPrice | myPrice}}</span></span>
            </div>
          </router-link>
        </div>
      </div>
      <!--为您推荐结束-->
    </section>
    <div class="no-data">
      <div class="no-data-content"><p> 没有啦 </p></div>
    </div>
    <!--回到顶部开始-->
    <!--<div class="bottom-to-top"><img src="../../common/image/big.png" style="width: 100%"></div>-->
    <go-top @goTop="goTop" :scrollY="scrollY"></go-top>
    <!--回到顶部结束-->
    <!--底部菜单开始-->
    <footer-tab></footer-tab>
    <!--底部菜单结束-->
    <footer id="foot">
      <div id="footer">
        <nav class="download_link">
          <a @click="downApp()">下载客户端</a>
        </nav>
        <p>
          豫备案号ICP备14026278-1
          <a href='/zizhi' style="color: #0093e7">资质证书</a>
        </p>
        <p>版权信息：河南优德大药房连锁有限公司</p>
      </div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import WapSwiper from '@/base/vue-awesome-swiper/wapSwiper';
  import {swiperSlide} from 'vue-awesome-swiper';
  import CountDown from '@/base/count-down/count-down';
  import {
    getTurnImages,
    getGongGeData,
    getSeckillData,
    getCustomAdData,
    getBannerData,
    getRecommendData,
    getGroupData,
    getHaiBao
  } from '@/api/home';
  import {getLogin} from '@/api/goods-detail';
  import {mapMutations} from 'vuex';
  import FooterTab from '@/components/footerTab/footerTab';
  import GoTop from '@/base/go-top/go-top';
  import {goTop, downApp} from '@/common/js/util';


  export default{
    data() {
      return {
        turnData: [],
        gonggeData: [],
        seckillList: [],
        seckillTime: '',
        startendTitle: '',
        customData: [],
        bannerData: '',
        groupData: [],
        recommendData: [],
        haibaoData: [],
        scrollY: 0,
        opacity: 0
      }
    },
    props: {},
    components: {CountDown, FooterTab, GoTop, downApp, WapSwiper, swiperSlide},
    created: function () {
      this.SET_Loading(true);
      this._ininData();
    },
    computed: {},
    updated: function () {
      //console.info('222222222222222222222222222')


    },
    mounted: function () {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      _ininData(){//初始化数据
        getTurnImages().then((res) => {//获取轮播图数据
          if (res.status === 'success') {
            let data = res.data;
            this.turnData = data.map(function (item) {
              item.turnImg = JSON.parse(item.banner)[0].path;
              return item;
            });
          }
          ;

          //console.info(this.turnData);
          this.SET_Loading(false);
        });
        getGongGeData().then((res) => {//获取宫格图数据
          if (res.status === 'success') {
            let data = res.data;
            this.gonggeData = data.map(function (item) {
              item.turnImg = JSON.parse(item.banner)[0].path;
              return item;
            });
          }
          ;
        });
        getHaiBao().then((res) => {
          if (res.status === 'success') {
            let data = res.data;
            this.haibaoData = data.map(function (item) {
              item.turnImg = (JSON.parse(item.banner)).path;
              return item;
            });
          }
        });
        getSeckillData().then((res) => {//获取秒杀数据
          if (res.status === 'success') {
            if (res.data != undefined) {
              let data = res.data;
              this.seckillList = data;
              let seckillTime = res.map.periods;
              if(seckillTime.state === 4){
                this.seckillTime = {
                  endTime:seckillTime.endTime,
                  nowSystemTime: seckillTime.nowSystemTime
                }
                this.startendTitle = "距结束";
              }else if(seckillTime.state === 3){
                this.seckillTime = {
                  endTime:seckillTime.startTime,
                  nowSystemTime: seckillTime.nowSystemTime
                }
                this.startendTitle = "距开始";
              }
            }
            ;
          }
          ;
        });
        getCustomAdData().then((res) => {//获取自定义广告数据
          if (res.status === 'success') {
            let data = res.data;
            this.customData = data.map(function (item) {
              item.img = JSON.parse(item.banner).path;
              return item;
            });
          }
          ;
        });
        getBannerData().then((res) => {//获取通栏广告数据
          if (res.status === 'success') {
            let data = res.data;
            /*this.customData = data.map(function (item) {
             item.img = JSON.parse(item.banner).path;
             return item;
             });*/
            //this.bannerData=JSON.parse(data[0]).path
            let obj = data[0];
            obj.img = JSON.parse(obj.banner).path;
            this.bannerData = obj;
          }
          ;
        });
        getRecommendData().then((res) => {//获取推荐的商品数据
          if (res.status === 'success') {
            let data = res.data;
            this.recommendData = data;
            //console.log(data)
          }
          ;
        });
        getGroupData().then((res) => {//获取团购数据
          if (res.status === 'success') {
            this.groupData = res.data;
          }
        });
      },
      goToList(val){//跳转到列表页
        if (val.jumpType === 7 && val.jumpVal === '8') {//积分商城
          getLogin().then((res) => {
            if (res.status === 'success') {
              this.$toast({message: "积分商城暂未开启", duration: 2000})
              //this.$router.push('/integralMall');
            } else {
              this.$router.push('/login');
            }
          })

        } else if (val.jumpType === 7 && val.jumpVal === '7') {//秒杀专场
          this.$router.push('/seckill');
        } else if (val.jumpType === 4) {
          this.$router.push({path: `/goodsDetail/${val.jumpVal}`});
        } else if (val.jumpType === 6) {
          window.location.href=val.jumpVal;
        } else if (val.jumpType === 2) {
          this.$router.push({path: 'searchList',query: {keywords:val.jumpVal}});
        } else {
          let type = val.id + '/' + val.type + '/' + val.jumpVal + '/' + val.jumpType;
          this.$router.push({
            path: 'classify',
            query:{
                type:type
            }
          });
        }
      },
      goTop(){//回到顶部
        goTop();
      },
      downApp(){//下载app
        var link = downApp();
        window.location.href = link;
      },
      loadImage () {//刷新better-scroll
        if (!this.checkloaded) {
          setTimeout(() => {
            this.$refs.scroll.refresh();
          }, 50);
          this.checkloaded = true
        }
      },
      handleScroll () {
        this.scrollY = -window.scrollY;
        if (document.body.scrollTop >= 200) {
          this.opacity = 0.85;
        } else {
          if (document.body.scrollTop === 0) {
            this.opacity = 0
          } else {
            this.opacity = 0.45
          }
        }
      },
      ...mapMutations({
        SET_Loading: 'SET_Loading'
      })

    },
  }
</script>

<style scoped lang="scss">

  /*通用样式*/
  /*  *{margin: 0px;padding:0px;}*/
  div {
    font-size: 16px !important;
  }

  /*头部+搜索*/
  #gHeader {
    position: fixed;
    width: 100%;
    height: 47px;
    line-height: 1.5;
    top: 0;
    left: 0;
    z-index: 2;
    margin: auto;
    right: 0;
  }

  .level1 {
    z-index: 4;
  }

  .level1, .logoPacity {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  #gHeader .f_logo {
    width: 58px;
    padding-left: 10px;
    margin-top: 7px;
    height: 40px;
    position: absolute;
    left: 0;
  }

  #container img, .f_logo img {
    vertical-align: top;
  }

  .f_logo img {
    width: 100%;
    border: 0;
    height: 32px;
    max-width: 100%;
  }

  .search {
    position: absolute;
    right: 10px;
    top: 13px;
  }

  #container .search img {
    width: 22px;
    height: auto;
  }

  #container img, .f_logo img {
    vertical-align: top;
  }

  #gHeader .search_box {
    position: relative;
    margin: 0 50px 0 75px;
    padding: 6px 0;
    box-sizing: border-box;
  }

  .slider-wrapper {
    width: 100%;
    height:175px;
    overflow: hidden;
  }

  .wapSearch {
    background-color: #fff;
    border-radius: 4px;
    padding: 0 35px;
    margin: 0;
    display: block;
    font-size: 0rem;
  }

  #gHeader .search_btn {
    border: 0;
    background: url(../zizhi/image/search.png) no-repeat;
    background-size: 18px auto;
    width: 18px;
    height: 18px;
    left: 10px;
    position: absolute;
    top: 50%;
    margin-top: -9px;
  }

  #gHeader .search_txt {
    border: 0;
    background: 0;
    padding: 5px 0;
    height: 35px;
    font-size: 13px;
    display: inline-block;
    text-align: left;
  }

  #gHeader .search_txt, .ind_navi {
    width: 100%;
    box-sizing: border-box;
  }

  .logoPacity {
    z-index: 3;
    background: #1661df;
  }

  /*底部*/
  #footer {
    width: 100%;
    background-color: #f5f5f5;
    padding-bottom: 18px;
    padding-top: 12px;
    text-align: center;
  }

  #foot {
    position: inherit;
    padding-bottom: 45px;
  }

  .download_link {
    margin: 5px 0;
  }

  .download_link a {
    background: url(../zizhi/image/download.png) left center no-repeat;
    background-size: 24px auto;
    display: inline-block;
    line-height: 32px;
    margin: 0;
    padding: 0 0 2px 32px;
    color: #0093e7;
    font-size: 16px;
  }

  .search img {
    width: 22px;
    height: auto;
  }

  #footer p {
    font-size: 12px;
    color: #b6b6b6;
    line-height: 18px;
  }

  .scroll {
    width: 100%;
  }

  .scrollImg img {
    width: 100%;
  }

  .ind_navi {
    padding: 3% 0;
    top: 0;
    text-align: center;
  }

  .ind_navi li {
    float: left;
    width: 25%;
    min-height: 72px;
    margin-bottom: 10px;
  }

  .ind_navi li a {
    display: inline-block;
    font-size: 14px;
    color: #5e5e5e;
    font-family: "黑体";
    text-decoration: none;
  }

  .ind_navi li a i {
    display: block;
    margin: 0 auto 8px;
    width: 45px;
    font-style: normal;
  }

  .ind_navi li a i img {
    width: 100%;
  }

  /* 秒杀 */
  .miaosha {
    padding: 10px;
  }

  .msTitleLeft img {
    width: 20px;
    height: 20px;
  }

  .msTitleLeft span {
    font-size: 16px;
    vertical-align: 3px;
    margin-left: 10px;
    color: #EF6D6D;
    font-weight: bold;
  }

  .msTitleLeft {
    float: left;
    padding-bottom: 5px;
    border-bottom: 1px solid #F4F4F4;
  }

  .msTitleRight {
    font-size: 16px;
    float: right;
  }

  .msTitleRight .time {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #535353;
    color: #fff;
    text-align: center;
    line-height: 20px;
  }

  .msGoods {
    display: inline-block;
    margin-right: 10px;
    position: relative;
  }

  .killItemImg {
    width: 1.5rem;
    height:1.5rem;
    text-align: center;
    /*overflow: hidden;*/
    margin: 0 auto;
    display: block;
  }

  .killItemImg .killImg {
    width:75px;
    height:auto;
    float: left;
    /*background: red;*/
    display: block;
  }

  .msGoods-text {
    position: absolute;
    margin: 5px;
    height: 30px;
    padding: 5px;
    background-color: rgba(0, 0, 50, 0.7);
    color: #fff;
    font-size: 16px;
  }

  .msGoods-text span {
    display: block;
  }

  .msGoods-title {
    display: block;
    height: 0.36rem;
    line-height: 0.36rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.26rem;
  }

  .deLine {
    text-decoration: line-through;
    font-size: 0.24rem;
  }

  .line {
    height: 10px;
    background-color: #F0F1F3;
  }

  .jinrituangou {
    display: flex;
    display: -webkit-box;
    flex-direction: row;
    background-color: #FF5D5D;
    padding: 10px;
  }

  .jr-title {
    width: 100px;
    margin-top: 15px;

  }

  .jr-link {
    height: 70px;
    -moz-box-flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
    font-size: 0;
  }

  .youdeNew {
    display: flex;
    flex-direction: row;
    padding: 10px;
  }

  .newTitle {
    width: 13%;
  }

  .newCont {
    width: 87%;
  }

  .newTitle span {
    font-size: 18px;
    color: red;
    font-weight: bold;
  }

  .newSwiper {
    height: 50px;
  }

  .newText {
    height: 30px;
    padding: 10px;
    font-size: 14px;
    line-height: 30px;
  }

  .newTextNet {
    display: inline-block;
    width: 50px;
    height: 20px;
    font-size: 10px;
    text-align: center;
    line-height: 20px;
    border: 1px solid #FF5D5D;
    color: #FF5D5D;
  }

  .newTextNetCont {
    margin-left: 10px;
    vertical-align: -11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    width: 74%;
  }
.swiper-container{
  display: flex;
}
  .jr-title1 {
    font-size: 16px;
    color: #fff;
    display: block;
    margin: 5px 0px;
  }

  .jr-title2 {
    font-size: 20px;
    color: #fff;
    display: block;
    margin: 5px 0px;
    font-style: italic;
    font-weight: bold;
  }

  .jrSwiper {
    height: 70px;
  }

  .jrSwiperList {
    display: flex;
    flex-direction: row;
  }

  .jrSwiperListImg {
    width: 30%;
    margin-right: 10px;

  }

  .jrSwiperListText {
    width: 70%;
    font-size: 16px;
  }

  .jrSwiperListImg img {
    width: 70px;
    height: 70px;
  }

  .jsSwiperP, .jsSwiperPrace {
    display: block;
    color: #fff;
  }

  .jsSwiperP {
    font-size: 14px;
    height: 36px;
    line-height: 18px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .jsSwiperPrace {
    margin-top: 10px;
  }

  .group {
    padding: 10px;
  }

  .groupListCont {
    width: 48%;
    float: left;
  }

  .group .groupListCont:nth-of-type(odd) {
    margin-right: 10px;
  }

  .groupListCont img {
    width: 100%;
    height: 105px;
  }

  .groupList-s {
    height: 105px;
  }

  .groupList-s img {
    width: 100%;
    height: 100%;
  }

  .group2 {
    padding-top: 0px;
  }

  .recommendTitle {
    height: 30px;
    line-height: 30px;
    padding: 10px;
    border-bottom: 1px solid #F4F4F4;
  }

  .recommendTitle img {
    width: 20px;
    height: 20px;
    vertical-align: -3px;
    margin-right: 10px;
  }

  .recommendTitle span {
    font-size: 16px;
    font-weight: bold;
    color: #594C52;
  }

  .recommendCont {
    padding-bottom: 0px;
  }

  .recommendList {
    width: 50%;
    float: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-right: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    .inner {
      padding: 10px;
    }
  }

  .recommendList:nth-child(2n) {
    border-right: none;
  }

  .recommendListImg {
    width: 100%;
    text-align: center;
  }

  .recommendList .recommendImgSize {
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
  }

  .recommendList span {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recommendListTitle {
    color: #313131;
    display: block;
    overflow: hidden;
    height: 1rem;
  }

  .recommendListPrace {
    color: red;
    font-size: 12px;
  }

  .isGenre {
    display: inline-block;
    line-height: 10px;
    padding: 5px;
    background-color: red;
    color: #ffffff;
    margin-right: 5px;
  }

  .bottom-to-top {
    position: fixed;
    bottom: 56px;
    right: 8px;
    height: auto;
    width: 40px;
    z-index: 20;
  }

  .no-data {
    width: 100%;
    position: relative;
    box-sizing: border-box;
  }

  .no-data-content {
    width: 100%;
    height: 40px;
    text-align: center;
    background-color: #f5f5f5;
  }

  .no-data-content p {
    text-align: center;
    line-height: 20px;
    position: absolute;
    top: 10px;
    width: 100px;
    left: 50%;
    margin-left: -50px;
    color: #d3d3d3;
    font-size: 14px;
    display: block;
    background: #f5f5f5;
    z-index: 2;
    &:before, &:after {
      content: " ";
      height: 1px;
      width: 100px;
      position: absolute;
      background-color: #e1e0e0;
      top: 10px;
    }
    &:before {
      left: -100px;
    }
    &:after {
      right: -100px;
    }
  }

  .swiper-container .swiper-slide img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .scroll-x {
    width: 100%;
    overflow: hidden;
    .scroll-x-container {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      background-color: #fff;
    }
  }

  .haibao-wrapper {
    display: flex;
    width: 100%;
    flex-direction: row;
    background: #fff;
    .item {
      width: 33.33%;
      margin: 0 0.1rem;
      img {
        width:100%;
        height: auto;
      }
    }
  }
  .skill-wrapper{
    width:100%;
    display: flex;
    flex-direction: row;
    height:88px;
    /*background: red;*/
    float: left;
    .msGoods{
      width: 2.3rem;
      height: 1.5rem;
      display: block;
    }
  }
  /*2018.5.22  调试*/

  /*.swiper-wrapper{ height:150px!important; display: block;}*/
</style>
