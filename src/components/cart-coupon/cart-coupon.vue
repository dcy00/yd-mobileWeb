<template>
    <div class="container">
      <header-youde :title="title"></header-youde>
      <div class="couponWrapper">
        <Scroll @scroll="scroll"
                class="scroll-view"
                ref="scroll"
                :data="couponList"
                :listenScroll="true"
                :probe-type="1">

          <!-- 确认订单里的店铺券和平台券 begin -->
          <ul class="couponList" v-if="couponList.length>0">
              <li class="couponItem overflow" v-for="(item,index) in couponList">
                <div class="couponItemInner">
                  <div class="couponName" @click="checkItem(index)">

                      <label :class="{'active':item.isChecked}" v-if="item.active=='1'"></label>

                  </div>
                  <div class="couponExplain">
                    <img :src="item.imgUrl" alt="" :class="{'noImgUrl':item.imgUrl==''}">
                    <div class='explain'>
                      <div class='title'>{{item.name}}</div>
                      <div>满{{item.userMoneyLimit/100}}可用</div>
                      <div v-if="item.state==1">
                        <span class='fl strong red'>￥{{item.money/100}}</span>
                      </div>
                      <div v-else>
                        <span class='fl strong'>￥{{item.money/100}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="couponDate">
                    <div class='dateInner' v-if="item.state==1">
                      <span>{{item.startDate}}</span>
                      <span>至</span>
                      <span>{{item.endDate}}</span>
                      <router-link to="/" tag="span" class="btn">去使用</router-link>
                    </div>
                    <div class='dateInner' v-else>
                      <span class='strongText' v-if='item.state==2'>已使用</span>
                      <span class='strongText' v-if='item.state==4'>已过期</span>
                    </div>
                  </div>
                </div>
              </li>
          </ul>
          <div class="useBtn" v-if="couponList.length>0" @click="useCouponHandle">确定</div>
          <!-- 确认订单里的店铺券和平台券 end -->
          <empty-data title="暂无优惠券" v-if="couponList.length===0"></empty-data>
        </Scroll>
      </div>

    </div>
</template>

<script>
  import headerYoude from '@/base/header-youde/header-youde';
  import EmptyData from '@/base/empty-data/empty-data';
  import Scroll from '@/base/scroll/scroll';
  import { Toast } from 'mint-ui';
  import { mapMutations } from 'vuex';
  import { getCouponData } from '@/api/cart-coupon';
  import { local } from '@/common/js/util';
  export default {
      data(){
          return {
            type:'',
            title:'',
            scrollY:0,
            couponList:[],
            tag:'',
            /*couponList:[
                {
                  state:1,
                  couponType:1,
                  name:'平台券',
                  money:100,
                  userMoneyLimit:200,
                  startDate:'2018-03-20 12:00:00',
                  endDate:'2018-04-01 12:00:00',
                  couponId:'563232352',
                  imgUrl:'',
                  isChecked:false,
                  active:1
                },
                {
                  state:1,
                  couponType:2,
                  name:'店铺券',
                  money:100,
                  userMoneyLimit:200,
                  startDate:'2018-03-20 12:00:00',
                  endDate:'2018-04-01 12:00:00',
                  couponId:'563232352',
                  imgUrl:'',
                  isChecked:false,
                  active:1
                },
                {
                  state:2,
                  couponType:2,
                  name:'全场通用优惠券',
                  money:100,
                  userMoneyLimit:200,
                  startDate:'2018-03-20 12:00:00',
                  endDate:'2018-04-01 12:00:00',
                  couponId:'563232352',
                  imgUrl:'',
                  isChecked:false,
                  active:0
                },
                {
                  state:4,
                  couponType:1,
                  name:'全场通用优惠券',
                  money:100,
                  userMoneyLimit:200,
                  startDate:'2018-03-20 12:00:00',
                  endDate:'2018-04-01 12:00:00',
                  couponId:'563232352',
                  imgUrl:'',
                  isChecked:false,
                  active:0
                }
            ]*/
          }
      },
      created(){
          this._pageType();
          this._getCoupon(this.tag);
      },
      deactivated(){
        this.$destroy()
      },
      methods:{
        _pageType(){
            let iType = this.$route.params.type;
            switch(iType){
              case 'shop':
                  this.title='店铺优惠券';
                  this.type=iType;
                  this.tag = 2;
                  break;
              case 'platform':
                  this.title='平台优惠券';
                  this.type=iType;
                  this.tag = 1;
                  break;
            }
        },
        //获取数据
        _getCoupon(tag){
          this.SET_Loading(true);
          getCouponData(tag).then((res)=>{
              this.SET_Loading(false);
              if(res.status==='success'){
                  console.log(res);
                  if(res.data!==undefined){
                    let initData = res.data;
                    for (let i = 0; i < initData.length; i++) {
                      initData[i].startDate = initData[i].startDate.substring(0, 10);
                      initData[i].endDate = initData[i].endDate.substring(0, 10);
                      initData[i].isChecked=false;
                    }
                    this.couponList = res.data;
                  }else{
                      this.couponList = [];
                  }
                  this.tag = tag;
              }else{
                  this._toast(res.message);
              }
          })
        },
        //选中优惠券
        checkItem(index){
            let initData = this.couponList;
            //console.log(initData);
            for(let i=0;i<initData.length;i++){
                initData[i].isChecked = false;
            }
            initData[index].isChecked = !initData[index].isChecked;
            this.couponList = initData;
        },
        //使用优惠券
        useCouponHandle(){
          let that = this;
          let iType = that.type;
          let initData = that.couponList;
          let useCouponId = '';

          for(let i=0;i<initData.length;i++){
              if(initData[i].isChecked){
                  useCouponId = initData[i].couponId;
              }
          }
          if(useCouponId===''){
              that._toast('请先选择优惠券');
              return false;
          }else{
            if(iType==='shop'){
              local.save('shopCouponId',useCouponId);
              that.$router.back();
            }else if(iType==='platform'){
              local.save('platformCouponId',useCouponId);
              that.$router.back();
            }
          }

        },
        scroll(pos){ //监听滚动
          this.scrollY = pos.y;
          console.log(pos.y);
        },
        //提示
        _toast(msg){
          let tip = Toast(msg);
          setTimeout(()=>{
            tip.close();
          },1500)
        },
        ...mapMutations({
          SET_Loading: 'SET_Loading'
        })
      },
      components:{headerYoude,EmptyData,Scroll}
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  .fl{float:left;}
  .fr{float:right;}
  .overflow{overflow:hidden;}
  .relative{position:relative;}
  .container{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#f0f1f3;
  }
  .scroll-view {
    position: fixed;
    top: $header-height;
    width: 100%;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
  .couponList{
    padding:0.24rem;
    li{
      width:100%;
      background:#fff;
      font-size:0.28rem;
    }
  }
  .couponItem{
    width:100%;
    height:2rem;
    box-shadow:0 0 20px rgba(0,0,0,0.1);
    margin-bottom:0.24rem;
  }
  .couponItemInner{
    width:100%;
    height:2rem;
    overflow:hidden;
  }
  .couponName,.couponDate{
    position:relative;
  }
  .couponName{
    display:flex;
    align-items: center;
    justify-content: center;
    border-right:1px dashed #e0e0e0;
    box-sizing:border-box;
    width:0.8rem;
    height:2rem;
    color:#999;
    float:left;
    label{
      display:inline-block;
      width: 0.38rem;
      height:0.38rem;
      background:url('checkIcon.png') no-repeat;
      background-size:0.38rem 0.86rem;
      &.active{
        background-position:0 -0.48rem;
      }
    }
  }
  .couponName span{
    display:flex;
    align-items: center;
    justify-content: center;
    width:0.6rem;
    font-size:0.32rem;
    line-height:160%;
    text-align:center;
  }
  .couponName:before,.couponName:after,.couponDate:before,.couponDate:after{
    display:block;
    content:'';
    overflow:hidden;
    width:0.32rem;
    height:0.32rem;
    border-radius:50%;
    background:#e4e5e7;
    position:absolute;
  }
  .couponName:before,.couponName:after{
    left:0.64rem;
  }
  .couponName:before{
    top:-0.18rem;
  }
  .couponName:after{
    bottom:-0.18rem;
  }

  .couponDate{
    width:1.72rem;
    height:2rem;
    border-left:1px dashed #e0e0e0;
    box-sizing:border-box;
    float:right;
  }
  .couponDate:before,.couponDate:after{
    right:1.54rem;
  }
  .couponDate:before{
    top:-0.18rem;
  }
  .couponDate:after{
    bottom:-0.18rem;
  }
  .dateInner{
    width:1.4rem;
    height:1.6rem;
    padding:0.2rem;
    font-size:0.22rem;
    display:flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    text-align:center;
    position:relative;
  }

  .dateInner .btn{
    width:1.2rem;
    height:0.4rem;
    line-height:0.4rem;
    background:#ef6d6d;
    color:#fff;
    text-align:center;
    font-size:0.22rem;
    border-radius:0.2rem;
  }
  .strongText{
    font-size:0.3rem;
    color:#999;
    position:absolute;
    top:50%;
    margin-top:-0.15rem;
  }
  .couponExplain{
    width:4.2rem;
    height:1.6rem;
    padding:0.2rem 0.15rem;
    float:left;
  }
  .couponExplain img{
    width:1.6rem;
    height:1.6rem;
    background:#62ace3;
    float:left;
    position:relative;
    border-radius:50%;
  }
  .couponExplain img.noImgUrl:before{
    display:block;
    content:'LOGO';
    width:100%;
    color:#fff;
    font-size:0.36rem;
    text-align:center;
    position:absolute;
    top:50%;
    left:0;
    margin-top:-0.18rem;
  }
  .explain{
    display:flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width:2.5rem;
    height:1.6rem;
    float:right;
  }
  .explain .title{
    font-size:0.3rem;
    color:#666;
  }
  .explain div{
    display:flex;
    flex-flow:row nowrap;
    align-items:  baseline;
    font-size:0.22rem;
    .strong{
      font-size:0.3rem;
      padding-right:0.05rem;
      color:#999;
    }
    .red{
      font-size:0.3rem;
      padding-right:0.05rem;
      color:#ef6d6d;
    }
  }

  /*红色  */
  .red{
    color:#ef6d6d;
  }
  .platformCoupon.noUsed .couponName{
    color:#ef6d6d;
  }
  .platformCoupon.noUsed .strong{
    color:#ef6d6d;
  }
  /*蓝色  */
  .blue{color:#58b3e7;}
  .shopCoupon.noUsed .couponName{
    color:#58b3e7;
  }
  .shopCoupon.noUsed .strong{
    color:#ef6d6d;
  }
  .useBtn{
    width:7.02rem;
    height:50px;
    line-height:50px;
    text-align:center;
    color:#fff;
    background:#1a6eb5;
    border-radius:6px;
    position:fixed;
    right:0.24rem;
    bottom:0.24rem;
    left:0.24rem;
    font-size:0.32rem;
  }

</style>
