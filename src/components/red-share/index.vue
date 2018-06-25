<template>
  <div class="container">
    <header class="banner">
      <img src="./wxhgbanner3.png" alt=""/>
    </header>
    <div class="userInfo"  v-if="initData">
      <!--微信头像-->
      <div class="userPic halfRadius">
        <img data-attach-point="img" :src="initData.headImg" alt=""/>
      </div>
      <!--微信名-->
      <div class="userName textCenter">{{initData.nickname}}</div>
      <!--红包金额-->
      <div class="packetMoney textCenter">
        <strong>{{initData.receiveMoney}}</strong>元
      </div>
    </div>
    <article class="ruleContent">
      <h2>活动规则</h2>
      <section>
        <h3>1.如何参与抢红包活动？</h3>
        <p>下载优德医药APP，注册/登录会员账号或直接用微信登录，即可参与每天十万现金红包抢不停活动。</p>
      </section>
      <section>
        <h3>2.什么时候开始抢？</h3>
        <p>活动采用多时段，不定时发放的方式，活动开始前优德医药APP均会有系统通知。</p>
      </section>
      <section>
        <h3>3.每天可以抢几次？</h3>
        <p>每人每时段均可拥有一次抢红包机会。</p>
      </section>
      <section>
        <h3>4.中奖率是多少？</h3>
        <p>绝无空包，中奖率为100%。秉承先到先得原则，各时段红包领完之前，凡参与者均可抽中，下手晚的用户可等下次开抢。</p>
      </section>
      <section>
        <h3>5.抢到的钱去哪了？</h3>
        <p>抢到的红包直接存入微信零钱，请注意查收。</p>
      </section>
      <section>
        <h3>6.本活动的最终解释权归优德医药网所有。</h3>
      </section>
    </article>
    <button class="downloadBtn" @click="getApp()">立&nbsp;即&nbsp;下&nbsp;载</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRedData} from '@/api/red-share';
  export default {
    data(){
      return {
          initData:null
      }
    },
    created(){
      this.getInitData();
    },
    methods: {
      getInitData(){
        let str = this.$route.params.param;
        let arr = str.split('=');
        let uid = arr[0];
        let pid = arr[1];
        getRedData(uid, pid).then(res => {
            if(res.status === 'success'){
              this.initData = res.data || {};
            }
        })
      },
      getApp() {
        var browser = {
          versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
              iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
          }(),
          language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        if (browser.versions.ios || browser.versions.iPhone) {
          if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.qudu.youde";
          } else {
            location.href = "https://itunes.apple.com/cn/app/you-de-yi-yao/id1129707773?mt=8";
          }
        } else if (browser.versions.android) {
          location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.qudu.youde";
        }
      }
    }
  }
</script>

<style scoped>
  .halfRadius {
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .container {
    font-size: 14px;
    max-width: 750px;
    margin: 0 auto;
    overflow: hidden;
  }

  .container header {
    width: 100%;
  }

  .container header img {
    width: 100%;
  }

  .container .userInfo {
    width: 100%;
    position: relative;
  }

  .container .userInfo .userPic {
    width: 80px;
    height: 80px;
    /*border:5px solid #edda26;*/
    overflow: hidden;
    position: absolute;
    top: -25px;
    left: 50%;
    margin: 0 0 0 -45px;
  }

  .container .userInfo .userPic img {
    width: 100%;
  }

  .container .userInfo .textCenter {
    text-align: center;
  }

  .userName {
    padding-top: 70px;
    font-size: 1.4em;;
  }

  .packetMoney {
    font-size: 1.2em;
    font-family: 黑体;
    padding: 15px 0;
  }

  .packetMoney strong {
    font-family: "arial";
    color: #d21a1a;
    font-size: 2.2em;
    padding-right: 10px;
  }

  .ruleContent {
    padding: 0 3% 70px;
    color: #63656a;
    font-family: "arial", "microsoft yahei";
    font-size: 1.1em;
  }

  .ruleContent h3 {
    font-size: 1.1em;
  }

  .ruleContent h2 {
    position: relative;
    color: #000;
    font-size: 1.2em;
    padding-left: 13px;
  }

  .ruleContent h2:before {
    display: block;
    width: 6px;
    height: 6px;
    background: #000;
    content: "";
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -3px;
  }

  .ruleContent section {
    margin: 8px 0;
  }

  .ruleContent section p {
    margin-top: 5px;
    padding-left: 13px;
  }

  .downloadBtn {
    display: block;
    width: 94%;
    height: 50px;
    line-height: 50px;
    background: rgba(245, 105, 67, 0.9);
    border: none;
    color: #fff;
    font-size: 1.6em;
    text-align: center;
    font-weight: bolder;
    font-family: "微软雅黑";
    text-decoration: none;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    position: fixed;
    bottom: 10px;
    left: 3%;
    z-index: 3;
  }
</style>
