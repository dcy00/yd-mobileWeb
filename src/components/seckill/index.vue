<template>
  <div>
    <header-youde title="秒杀专场"></header-youde>
    <Scroll @scroll="scroll"
            class="scroll-view"
            ref="scroll"
            :data="seckillList"
            :listenScroll="true"
            :probe-type="3">
      <div>
        <div class="going">
          <div class="seckill-wrapper">
            <div class="going-type">{{title}}</div>
            <count-down v-if="seckillTime"
                        :startTime="seckillTime.nowSystemTime"
                        :endTime="seckillTime.endTime"
                        :isTime="false"
                        :countDownTitle="startendTitle">
            </count-down>
          </div>
        </div>
        <ul class="scroll-list" v-if="seckillList.length>0">
          <li class="list-wrapper" v-for="(item,index) in seckillList" :key="index" @click="goToDetail(item.goodsId)">
            <a>
              <div class="list-box">
                <div class="left">
                  <img :src="item.goodsThumbnail"/>
                </div>
                <div class="right">
                  <span class="goods-name">{{item.goodsTitle}}</span>
                  <span class="goods-price">¥{{item.minGoodsPrice | myPrice}}</span>
                </div>
                <img class="img-btn" v-if="item.canBuy !=undefined" src="./miao.png"/>
                <img v-else class="img-btn" src="./miaoAll.png"/>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Scroll>
    <go-top @goTop="goTop" :scrollY="scrollY"></go-top>
  </div>
</template>

<script>
  import CountDown from '@/base/count-down/count-down';
  import HeaderYoude from '@/base/header-youde/header-youde';
  import Scroll from '@/base/scroll/scroll';
  import {findPeriodsInfo,findSeckillData} from '@/api/home';
  import GoTop from '@/base/go-top/go-top';
  import {mapMutations} from 'vuex';
    export default{
      data() {
        return {
          seckillList: [],
          seckillTime: '',
          startendTitle: '',
          scrollY:0,
          title:"进行中"
        }
      },
        name: "seckill",
        props: {},
        components: {CountDown,HeaderYoude,Scroll,GoTop},
        created: function () {
          this._ininData();
          this.SET_Loading(true);
        },
        computed: {},
      deactivated(){
        this.$destroy()
      },
        methods: {
          //初始化数据
          _ininData(){
            findPeriodsInfo().then((res)=>{
              this.SET_Loading(false);
                if(res.status === 'success' && res.data!==undefined){
                    let d = res.data;
                    let seckillTime;
                    if(d.state===4){
                      this.startendTitle = "距结束";
                      this.title = "进行中";
                      seckillTime = {
                        endTime:d.endTime,
                        startTime:d.startTime,
                        nowSystemTime:d.nowSystemTime
                      };
                    }else if(d.state === 3){
                      this.startendTitle = "距开始";
                      this.title = "活动即将开始";
                      seckillTime = {
                        endTime: d.startTime,
                        nowSystemTime: d.nowSystemTime
                      }
                    }
                  findSeckillData(res.data.id).then((r) => {//获取秒杀数据
                    this.SET_Loading(false);
                    if (r.status === 'success') {
                      if(r.data) {
                        this.seckillTime = seckillTime;
                        let data = r.data;
                        this.seckillList = data;
                      }else {
                        this.seckillList = [];
                      }
                    }else {
                      this.title = "暂无活动";
                    }
                  });
                }else {
                   this.title = "暂无活动";
                }

            })

          },
          goToDetail(goodsId){
            this.$router.push({path: `/goodsDetail/${goodsId}`})
          },
          scroll(pos){ //监听滚动
            this.scrollY = pos.y;
          },
          goTop(){ //回到顶部
            this.$refs.scroll.scrollTo(0, 0, 500)
          },
          //加载动画
          ...mapMutations({
            SET_Loading: 'SET_Loading'
          })
        },
    }
</script>
<style  scoped lang="scss">
  @import "~@/common/css/variable.scss";
  .scroll-view{
    position: fixed;
    top: $header-height;
    bottom: 0;
    width: 100%;
  }
  .going{
    font-size: 15px;
    text-align:center; /*水平居中*/
    line-height: 20px; /*行距设为与div高度一致*/
    color: #007aff;
    .going-type{
      margin-bottom: 8px;
    }
  }
  .seckill-wrapper{
    background-color: #fff;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
.scroll-list{
  background-color: #fff;
}
  .list-wrapper {
    height: 80px;
    padding: 15px 12px;
    border-bottom: 1px solid #ddd;
    position: relative;
    a {
      display: block;
      flex-direction: row;
    }
  }
  .list-box {
    display: flex;
    align-items: center;
    .left {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: 22px;
      .goods-name {
        font-size: 13px;
        color: #656565;
        line-height: 18px;
        height: 36px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .goods-price {
        font-size: 12px;
        color: #eb4344;
      }
    }
    .img-btn{
      width: 40px;
      height: 40px;
      margin-left: 10px;
    }
  }
</style>
