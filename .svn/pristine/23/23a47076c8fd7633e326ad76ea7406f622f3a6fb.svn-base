<template>
    <div class="container">
      <header-youde :title="title"></header-youde>
      <div class="wrapper">
        <!--封面 begin-->
        <div class="assetCover" :class="{'blueBg':isBalance,'redBg':isIntegral}">
          <div class="assetInner overflow">
            <div class="assetTitle overflow">
              <span class="fl">{{unitText}}</span>
              <div class="fr btnCont" v-if="isIntegral">
                <span class="integralMall"><i><img src="./integralMall.png" alt=""></i>积分商城</span>
                <span class="changeLog"><i><img src="./changeLog.png" alt=""></i>兑换记录</span>
              </div>
            </div>
            <h2 v-if="isBalance">{{balanceMoney/100}}</h2>
            <h2 v-if="isIntegral">{{integralAmount}}</h2>
          </div>
          <div class="searchBar overflow">
            <div class="fl selectCont" @click="toggleHandle">
              {{selectText}}
            </div>
            <div class="fr switchDate">
              <em class="prevArrow" @click="switchDate(-1)"></em>
              <span class="dateText">{{year}}年{{month}}月</span>
              <em class="nextArrow" @click="switchDate(1)"></em>
            </div>
          </div>
        </div>
        <!--封面 end-->
        <Scroll @scroll="scroll"
                @scrollEndInit = "scrollEndInit"
                class="scroll-view"
                ref="scroll"
                :pullup="true"
                :listenScroll="true"
                :probe-type="1" v-if="balanceList.length>0 || integralList.length>0">
          <!--列表 begin-->
          <div class="listWrap">
            <ul>
              <li v-for="item in balanceList">
                <p>{{item.createTime}}</p>
                <div class="itemCont overflow">
                  <div class="fl">
                    {{item.detail}}
                  </div>
                  <div class="fr">
                    <span v-if='item.streamType==1'>+{{item.changeMoney/100}}</span>
                    <span v-if='item.streamType==2'>{{item.changeMoney/100}}</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul>
              <li v-for="item in integralList">
                <p>{{item.createTime}}</p>
                <div class="itemCont overflow">
                  <div class="fl">{{item.detail}}</div>
                  <div class="fr">
                    <span v-if='item.chgType==1'>+{{item.chgIntegral}}</span>
                    <span v-if='item.chgType==2'>{{item.chgIntegral}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--列表 end-->
        </Scroll>
        <empty-data :title="noData" v-else style="top:4.1rem;"></empty-data>
      </div>
      <div class="shadowLayer" @click="toggleHandle" v-if="isShow"></div>
      <div class="showActionSheet" v-if="isShow">
        <ul>
          <li v-for="(item,index) in showActions" @click="changeItem(index)">{{item}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
  import headerYoude from '@/base/header-youde/header-youde';
  import Scroll from '@/base/scroll/scroll';
  import emptyData from '@/base/empty-data/empty-data';
  import { getData } from '@/api/myAsset';
  import {mapMutations} from 'vuex';
    export default {
      data(){
          return {
            noData:'暂无数据',
            title:'',
            pageType:'',
            unitText:'',
            isBalance:false,
            isIntegral:false,
            balanceUrl:'/uc/app/s_10020/spuserassets/find/mybalance',
            integralUrl:'/uc/app/s_10020/spuserassets/getUserAssets',
            balanceParam:{
              streamType:'',
              Logdate:''
            },
            integralParam:{
              chgType:'',
              logdate:''
            },
            balanceMoney:0,
            integralAmount:0,
            balanceList:[],
            integralList:[],
            selectText:'全部',
            isShow:false,
            showActions:['全部','支出','收入'],
            year:0,
            month:0,
            pageIndex:1,
            pageCount:1,
            loaderAll:false,
            isLoading:false,
            scrollY:0
          }
      },
      created(){
          this.SET_Loading(true);
          this._getPageType();
          this._getDate();
      },
      methods:{
          //判断页面类型
          _getPageType(){
              let that = this;
              let iType = that.$route.params.type;

              switch (iType){
                case "balance":
                  that.title = '我的余额';
                  that.isBalance = true;
                  that.unitText = '余额(元)';
                  that.balanceParam.streamType='';
                  that.balanceParam.Logdate = '201803';
                  that.balanceParam.pageIndex = that.pageIndex;
                  that._getPageData(that.balanceUrl,that.balanceParam);
                  that.pageType = 'balance';
                  break;
                case "integral":
                  that.title = '我的积分';
                  that.isIntegral = true;
                  that.unitText = '可用积分';
                  that.integralParam.chgType='';
                  that.integralParam.logdate = '201803';
                  that.integralParam.pageIndex = that.pageIndex;
                  that._getPageData(that.integralUrl,that.integralParam);
                  that.pageType = 'integral';
                  break;
              }
          },
          //获取日期
          _getDate(){
              let that = this;
              let date = new Date();
              let fullYear = date.getFullYear();
              let month = date.getMonth()+1;
              that.month = month<10 ? '0'+month : month;
              that.year = fullYear;
          },
          //选择资产类型
          toggleHandle(){
              this.isShow = !this.isShow;
          },
          changeItem(index){
              let that = this;
              that.selectText = that.showActions[index];
              that.isShow = false;
              that.balanceList = [];
              that.integralList = [];
              that.pageIndex=1;
              that.searchData();
          },
          //切换日期
          switchDate(type){
              let nowYear = new Date().getFullYear();
              let nowMonth = new Date().getMonth()+1;
              let thatYear = this.year;
              let thatMonth = this.month;
              let iType = type;

              if (parseInt(iType)<0){
                thatMonth = parseInt(thatMonth) + parseInt(iType);
                if(thatMonth===0){
                  thatMonth = 12;
                  thatYear = parseInt(thatYear)-1;
                }
              } else if (parseInt(iType) >0 ){

                if (thatYear<=nowYear){
                  if(thatMonth===12){
                    thatMonth = 1;
                    thatYear = parseInt(thatYear)+1;
                  }else if(parseInt(thatYear)===nowYear && parseInt(thatMonth)===nowMonth){
                    thatMonth= nowMonth;
                  }else{
                    thatMonth = parseInt(thatMonth) + parseInt(iType);
                  }
                }else{
                  thatYear = nowYear;
                  thatMonth= nowMonth;
                }
              }
              this.year = thatYear;
              this.month = thatMonth<10?'0'+thatMonth:thatMonth;
              this.balanceList = [];
              this.integralList = [];
              this.pageIndex=1;
              this.searchData();

          },
          //搜索
          searchData(){
              let that = this;
              let iType = that.$route.params.type;
              let logDate = that.year.toString()+that.month.toString();
              let changeType = '';
              //console.log(iType);
              that.SET_Loading(true);
              if(that.selectText==='全部'){
                changeType = '';
              }else if(that.selectText==='支出'){
                changeType = 2;
              }else if(that.selectText==='收入'){
                changeType = 1;
              }

              switch (iType){
                  case "balance":

                    that.balanceParam.streamType=changeType;
                    that.balanceParam.Logdate = logDate;
                    that.balanceParam.pageIndex = that.index;
                    that._getPageData(that.balanceUrl,that.balanceParam);

                    break;
                  case "integral":

                    that.integralParam.chgType=changeType;
                    that.integralParam.logdate = logDate;
                    that.integralParam.pageIndex = that.pageIndex;
                    that._getPageData(that.integralUrl,that.integralParam);

                    break;
              }

          },
          //获取页面数据
          _getPageData(url,data){

            getData(url,data).then((res)=>{
              //console.log(res.data);
              this.SET_Loading(false);
              if(res.status==='success'){
                if(res.data!==undefined){

                  if(res.data.length===0){
                    this.loaderAll = true;
                    this.isLoading = false;
                    return;
                  }
                  this.isLoading = false;
                  //页面判断
                  if(this.pageType==='balance'){  //我的余额
                    this.balanceList = this.balanceList.concat(res.data);
                    //this.balanceMoney = res.map.userassets.money;
                  }else{   //我的积分
                    this.integralList = this.integralList.concat(res.data.intergralLogList);
                    this.integralAmount = res.data.consumeScore;
                  }
                }
                this.pageIndex = res.page.pageIndex + 1;
                if(this.pageType==='balance'){  //我的余额
                  this.balanceMoney = res.map.userassets.money;
                }
              }else{
                this._toast(res.message);
              }

            })
          },
          scroll(pos){ //监听滚动
            this.scrollY = pos.y;
          },
          scrollEndInit(){
            if (!this.loaderAll) {
              //!this.isLoading && this._getData(this.pageIndex);
              if(!this.isLoading){
                this._getPageType()
              }
              this.isLoading = true;
            }
          },
          //提示层
          _toast(str){
            let tip = Toast(str);
            setTimeout(()=>{
              tip.close();
            },1500);
          },
          ...mapMutations({
            SET_Loading: 'SET_Loading'
          })
      },
      components:{
        headerYoude,emptyData,Scroll
      },
      deactivated(){
        this.$destroy()
      },
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
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
    top: 4.08rem;
    width: 100%;
    left: 0;
    bottom:0;
    overflow: hidden;
  }
  .wrapper{
    padding-top:$header-height;
    font-size:0.28rem;
    .fl{float:left;}
    .fr{float:right;}
    .relative{position:relative;}
    .overflow{overflow:hidden;}
    .blueBg{background-color:#2b8cbc;}
    .redBg{background-color:#f23c73;}
    .assetCover{
      color:#fff;
      .assetInner{
        padding:0.24rem;
        h2{
          height:1.02rem;
          line-height:1.06rem;
          font-size:0.6rem;
        }
        .btnCont{
          span{
            display:inline-block;
            height:0.6rem;
            @include border-radius();
            border:1px solid rgba(255,255,255,0.5);
            padding:0 0.24rem 0 0.1rem;
            i{
              display:block;
              width:0.54rem;
              height:0.54rem;
              overflow:hidden;
              float:left;
              margin:0.03rem 0 0 0.03rem;
              img{
                display:block;
                width:100%;
                height:100%;
              }
            }
          }
        }
      }
      .assetTitle{
        height:0.6rem;
        line-height:0.6rem;
        padding:0.06rem 0;
      }
      .searchBar{
        padding:0 0.24rem;
        height:0.9rem;
        line-height:0.9rem;
        background:rgba(0,0,0,0.2);

        .selectCont{
          width:1.3rem;
          position:relative;
          float:left;
        }
        .selectCont:after{
          display:block;
          content:"";
          overflow:hidden;
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-left: 5px solid transparent;
          border-bottom: 5px solid #fff;
          border-right: 5px solid #fff;
          transform:rotate(45deg);
          position:absolute;
          top:50%;
          right:0;
          margin-top:-9px;
        }
      }
      .switchDate{
        display:block;
        width:3.5rem;
        height:0.9rem;
        position:relative;
      }
      .dateText{
        display:block;
        width:2.3rem;
        text-align:center;
        float:left;
      }
      .prevArrow,.nextArrow{
        display:block;
        width:0.6rem;
        height:0.9rem;
        position:relative;
      }
      .prevArrow{float:left;}
      .nextArrow{float:right;}
      .prevArrow:before{
        border-bottom:1px solid #fff;
        border-left:1px solid #fff;
        left:50%;
      }
      .nextArrow:before{
        border-top:1px solid #fff;
        border-right:1px solid #fff;
        right:50%;
      }
      .prevArrow:before,.nextArrow:before{
        display:block;
        content:"";
        width:15px;
        height:15px;
        -webkit-transform:rotate(45deg);
        -moz-transform:rotate(45deg);
        transform:rotate(45deg);
        position:absolute;
        top:50%;
        margin-top:-9px;
      }
    }
    .listWrap{
      li{
        padding:0 0.24rem 0.24rem;
        background:#fff;
        overflow:hidden;
        border-bottom:0.24rem solid #f0f1f3;
        p{
          height:0.6rem;
          line-height:0.6rem;
          border-bottom:1px solid $cart-border-color;
        }
        .itemCont{
          color:#4b4b4b;
          padding-top:0.24rem;
          position:relative;
          .fl{width:70%;line-height:160%;}
          .fr{
            position:absolute;
            top:50%;
            right:0;
            height:0.6rem;
            line-height:0.6rem;
            margin-top:-0.25rem;
            font-size:0.5rem;
            text-align:right;
          }
        }
      }
    }
  }
  .shadowLayer{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    z-index:2;
  }
  .showActionSheet{
    position:fixed;
    top:50%;
    right:0.8rem;
    left:0.8rem;
    width:5.9rem;
    background:#fff;
    overflow:hidden;
    @include border-radius(10px);
    font-size:0.28rem;
    margin-top:-1.2rem;
    z-index:10;
    li{
      height:0.8rem;
      line-height:0.8rem;
      border-bottom:1px solid $cart-border-color;
      text-align:center;
      &:last-child{border-bottom:none;}
    }
  }
</style>
