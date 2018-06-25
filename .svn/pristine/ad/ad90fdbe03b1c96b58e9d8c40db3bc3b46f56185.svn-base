<template>
    <div class="content">
      <header-youde title="我的" class="perCenterHeader"></header-youde>
      <div class="wrapper">
          <div class="sectionHeader relative">
            <img src="../zizhi/image/my_headBg.jpg" alt="">
            <div class="userInfoCont">
              <div class="fl userInfo">
                <div class="userImg"><img :src="headImg" alt=""></div>
                <div class="userName">{{headName}}</div>
              </div>
              <div class="fr signIn">
                <div>
                  <span class="signBtn" @click="getSignData">{{sign}}</span>
                  <div class="signTag" @click="signTag">?</div>
                </div>
              </div>
            </div>
          </div>
          <div class="noLoginSection" v-if="!login">
              <img class="noLoginImg" src="../zizhi/image/headImg.png" alt="">
              <router-link  to="login" class="goLoginBtn">点我去登录</router-link>
          </div>
          <div class="section" v-if="login">
            <div class="splitLine"></div>
              <div class="itemSection">
                <div  class="itemHeading arrowRight">
                  <div class="fl">
                    <img src="../zizhi/image/orderIcon.png" alt="">
                    <span>我的订单</span>
                  </div>
                  <router-link to="/orders/all" class="fr more">更多</router-link>
                </div>
                <div class="itemContainer orderTypes">
                  <router-link to="/orders/0" class="itemType">
                    <div class="typeIcon relative"><img src="../zizhi/image/orderIcon_1.jpg" alt=""></div>
                    <span>待付款</span>
                    <span class='numTag' v-if="allData.payNum !='0'">{{allData.payNum}}</span>
                  </router-link>
                  <router-link to="/orders/2" class="itemType">
                    <div class="typeIcon relative"><img src="../zizhi/image/orderIcon_2.jpg" alt=""></div>
                    <span>待发货</span>
                    <span class='numTag' v-if="allData.sendNum!='0'">{{allData.sendNum}}</span>
                  </router-link>
                  <router-link to="/orders/5" class="itemType">
                    <div class="typeIcon relative"><img src="../zizhi/image/orderIcon_3.jpg" alt=""></div>
                    <span>待收货</span>
                    <span class='numTag' v-if="allData.collectNum!='0'">{{allData.collectNum}}</span>
                  </router-link>
                  <router-link to="/orders/6" class="itemType">
                    <div class="typeIcon relative"><img src="../zizhi/image/orderIcon_4.jpg" alt=""></div>
                    <span>待评价</span>
                    <span class='numTag' v-if="allData.evaluateNum !='0'">{{allData.evaluateNum}}</span>
                  </router-link>
                  <router-link to="/goodsBack" class="itemType">
                    <div class="typeIcon relative"><img src="../zizhi/image/orderIcon_5.jpg" alt=""></div>
                    <span>退换货</span>
                    <span class='numTag' v-if="allData.returnNum!='0'">{{allData.returnNum}}</span>
                  </router-link>
                </div>
              </div>
              <div class="splitLine"></div>
              <div class="itemSection">
                <div class="itemHeading">
                  <div class="fl">
                    <img src="../zizhi/image/assetIcon.png" alt="">
                    <span>我的资产</span>
                  </div>
                </div>
                <div class="itemContainer assetCont">
                  <router-link to="/myAsset/balance" class="assetItem">
                    <div class="strongText">￥{{userAsset.money/100}}</div>
                    <span>账户余额</span>
                  </router-link>
                  <router-link to="/coupon" class="assetItem">
                    <div class="strongText">{{userAsset.couponNum}}</div>
                    <span>优惠券</span>
                  </router-link>
                  <!--<router-link to="/myAsset/integral" class="assetItem">
                    <div class="strongText">{{allData.spUserassets.consumeScore}}</div>
                    <span>我的积分</span>
                  </router-link>-->
                </div>
              </div>
            <div class="splitLine"></div>
            <router-link to="address" class="navigationBarContainer">
              <div class="itemNavigationBar">
                <img src="../zizhi/image/my_locationIcon.png" alt="">
                <span>我的地址</span>
                <span class="defaultAddress" v-if="defaultMemberAddress">{{defaultMemberAddress.province}}{{defaultMemberAddress.city}}{{defaultMemberAddress.area}}{{defaultMemberAddress.address}}</span>
              </div>
            </router-link>
            <div class="splitLine"></div>
            <router-link to="myCollect" class="navigationBarContainer">
              <div class="itemNavigationBar">
                <img src="../zizhi/image/star4.png" alt="">
                <span>我的收藏</span>
              </div>
            </router-link>
            <div class="splitLine"></div>
            <router-link to="/myComment" class="navigationBarContainer">
              <div class="itemNavigationBar">
                <img src="../zizhi/image/evaluation.png" alt="">
                <span>我的评价</span>
              </div>
            </router-link>
            <div class="splitLine"></div>
            <div class="loginOut">
              <button @click="loginOut">退出登录</button>
            </div>
          </div>
      </div>
      <footer-tab></footer-tab>
    </div>
</template>
<script>
  import HeaderYoude from '@/base/header-youde/header-youde';
  import FooterTab from '@/components/footerTab/footerTab';
  import axios from 'axios';
  import {dataHostUrl} from '@/api/config';
  import {getUid,local} from '@/common/js/util';
  import {mapActions,mapGetters} from 'vuex';
    export  default{
        name: '',
        data () {
            return {
                headImg:'',
                headName:'昵称',
                sign:"签到",
                login:false,
                balance:'',//余额
                coupons:'',//优惠券
                integral:'',//积分
                allData:'',//所有数据
                userAsset:{},
                defaultMemberAddress:{}
            }
        },
      mounted(){
        this.loginState();
      },
      computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
          'cartNumber'
        ])
      },
      watch:{
        "$route":"loginState"
      },
        methods: {
            loginState:function(){
                var token=local.get('springraintoken');
                var sign=local.get('sign');
                if(token==''){
                    this.login=false;
                    this.sign="签到送积分"
                }else{
                    this.login=true;
                    this.getMyData();
                }
            },
          getMyData:function(){
            var url = dataHostUrl+ "/uc/xcx/s_10020/userinfo?springraintoken="+local.get("springraintoken");
            axios.get(url).then((res) => {
              console.log(res);
              if(res.data.statusCode==200&&res.data.status=='success'){
                this.allData=res.data.data;
                this.headName=res.data.data.nickname;
                this.headImg = res.data.data.headImg;
                this.userAsset = res.data.data.spUserassets;
                this.defaultMemberAddress = res.data.data.defaultMemberAddress;
                var sign=res.data.data.spUserassets.hasCheckIn;
                sign==true?this.sign="今日已签到":this.sign="签到"
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }

            })
          },
          getSignData:function(){
            var url=dataHostUrl + "/uc/app/s_10020/spuserassets/checkin?springraintoken="+local.get("springraintoken");
            axios.get(url).then((res) => {
              console.log(res);
              if(res.data.statusCode==200&&res.data.status=='success'){
                this.$toast({message:res.data.message,duration: 2000});
                this.sign='今日已签到';
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }

            })
          },
          signTag:function(){
            var url=dataHostUrl + "/f/app/s_10020/info/getCheckInSettingInfo";
            axios.get(url).then((res) => {
              console.log(res);
              if(res.data.statusCode==200&&res.data.status=='success'){
                this.$messagebox.alert(res.data.data, "签到说明");
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }

            })
          },
          loginOut(){
              let url = dataHostUrl+"/f/app/s_10020/logout/json";
              axios.get(url,{params:{}}).then((res)=>{
                  console.log(res.data);
                  if(res.data.status==='success'){
                    local.clear();
                    this.headName='';
                    this.headImg = '';
                    this.getCartNumber();
                    this.loginState();
                  }
              })
          },
          ...mapActions({
            getCartNumber: 'getCartNumber'
          })
        },
        components: {HeaderYoude,FooterTab},
    }
</script>
<style scoped>
  .wrapper{
    padding-bottom:1.02rem;
  }
  .perCenterHeader{
    background-color: #818DB3!important;
    border-bottom: none!important;
  }
  .sectionHeader{
    width:100%;
    height:4rem;
    font-size:.32rem;
    color:#fff;
    position:relative;
    overflow:hidden;
  }
  .userInfoCont{
    height:65px;
    position:absolute;
    right:20px;
    bottom:20px;
    left:20px;
  }
  .userImg{
    display:block;
    width: 1.32rem;
    height: 1.32rem;
    border-radius:50%;
    border:1px solid #fff;
    overflow:hidden;
    float:left;
  }
  .userImg img{
    display:block;
    width:100%;
    height:100%;
  }
  .userInfo{
    width:50%;
    height:65px;
  }
  .userInfo .userName{
    margin: 26px 0 0 1.75rem;;
    font-size: .32rem;
  }
  .headBg{
    display:block;
    width:100%;
  }
  .signIn{
    width:50%;
    height:65px;
    text-align:right;
    display:flex;
    flex-direction: column;
    justify-content: center;
  }
  .signBtn{
    display:inline-block;
    padding:0 10px;
    height: .7rem;
    line-height:.7rem;
    color:#5c6794;
    background:#fff;
    border-radius:9px;
    font-size: .32rem;
  }
  .signTag{
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    border: 1px solid #fff;
    text-align: center;
    color: #fff;
    font-size: 15px;
    float: right;
    margin: 0.2rem 0 0 18px;
  }
  .fr {float:right}
  .fl {float:left}
  .noLoginSection{ text-align:center;}
  .noLoginImg{margin-top:2rem;}
  .goLoginBtn{
    width: 2.5rem;
    height: .7rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: .32rem;
    display: block;
    line-height: .7rem;
    margin: 0 auto;
    background-color: #62ACE3;
    color: #ffffff;
  }
  .splitLine{border-bottom:0.2rem solid #f0f1f3;}
  .itemSection {width:100%;height:auto;font-size: .32rem}
  .itemHeading{
    line-height:.5rem;
    padding:0.2rem;
    border-bottom:1px solid #dbdbdb;
    overflow:hidden;
    position:relative;
  }
  .itemHeading img { width:.5rem;
    height:.5rem;
    float:left;
    margin-right:.15rem;
  }
  .orderTypes {
      padding:0.3rem 0;
  }
  .itemType {
    display:flex;
    flex-flow:column nowrap;
    justify-content:space-between;
    width:20%;
    align-items:center;
    color:#5d727e;
    position: relative;
  }
  .itemContainer {  display:flex;
    flex-flow:row nowrap;
    align-items:center;
    align-content:space-between;
    width:100%;
  }
  .typeIcon {
    display:block;
    width:0.8rem;
    height:0.8rem;
    margin:0 auto 0.1rem;
  }
  .relative {
    position:relative;
  }
  .typeIcon img { width:100%;
    height:100%;
  }
  .more{color: #000;}
  .assetCont {padding:0.3rem 0 0.3rem;display:flex;
    flex-direction: row;
    align-items:center;}
  .assetItem {
    display:flex;
    flex:1;
    flex-direction: column;
    align-items: center;
    height:auto;
    color:#5d727e;
  }
  .strongText {
    color:#fe5c5c;
    font-weight:bold;
    margin-bottom:0.1rem;
    justify-content:center;
  }
.itemNavigationBar { display:block;
  height:0.5rem;
  line-height:0.5rem;
  padding:0.2rem;
  position:relative;
  overflow:hidden;
}
  .itemNavigationBar img {
    width:0.5rem;
    height:0.5rem;
    float:left;
    margin-right:0.1rem;
  }
.defaultAddress{
  float:right;
  width: 4.35rem;
  height:0.5rem;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align:right;
  color:#787878;
  padding-right:0.3rem;
}
  .navigationBarContainer{font-size: 0.35rem}
  .numTag{
    display:block;
    position:absolute;
    top:-0.1rem;
    right:0.1rem;
    background:#fff;
    border-radius:50%;
    border:1px solid #fe5c5c;
    width:0.36rem;
    height:0.36rem;
    color:#fe5c5c;
    font-size:0.24rem;
    line-height:0.36rem;
    text-align:center;
  }

  .loginOut{
    padding:0.2rem;
  }
  .loginOut button{
    width:100%;
    height:0.8rem;
    color:#fff;
    font-size:0.28rem;
    background:#818DB3;
    border-radius:6px;
    border:none;
    outline: none;
  }

</style>
