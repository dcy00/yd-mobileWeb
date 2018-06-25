<template>
  <div style="margin-top: 45px;"  class="z-container">
    <header-youde title="注册"></header-youde>
    <div class="registerForm">
      <div class="phone">
        <img src="../zizhi/image/phone.png" alt="">
        <input placeholder="输入手机号" ref="mobile" type="text">
        <button v-show="sendAuthCode" @click="hankClick">获取验证码</button>
        <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}}</span> 秒</span>
      </div>
      <div class="code">
        <img src="../zizhi/image/yzm.png" alt="">
        <input placeholder="输入验证码" ref="code" type="text">
      </div>
      <div class="setPwd">
        <img src="../zizhi/image/setPwd.png" alt="">
        <input placeholder="设置密码 建议字母数字组合" ref="password" type="text">
      </div>
      <div class="setPwd">
        <img src="../zizhi/image/againPwd.png" alt="">
        <input placeholder="重复密码" type="text" ref="setpwd">
      </div>
      <div class="setPwd">
        <img src="../zizhi/image/tjpeople.png" alt="">
        <input placeholder="推荐人手机号(可不填)" ref="recommendUserId" type="text">
      </div>
      <div class="userAgreement">
        <input id="userAgreement" type="checkbox" name="userAgreement" value="" v-model="userAgreement">
        <label for="userAgreement"></label>
        <span>同意<router-link to="regAgreement">用户注册协议</router-link></span>
      </div>
    </div>
    <div class="submit">
      <button v-if="userAgreement==true" @click="submitRegister">完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
      <button v-else class="submit2">完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {dataHostUrl} from '@/api/config';
  import {regPhone} from '@/common/js/util';
  import HeaderYoude from '@/base/header-youde/header-youde';
    export  default{
      name:'register',
      data () {
        return {
          sendAuthCode:true,/*通过v-show控制显示‘获取按钮’还是‘倒计时’ */
          auth_time: 0, /*倒计时 计数器*/
          userAgreement:''
        }
      },
      methods:{
        hankClick:function(){
          var phone=this.$refs.mobile.value;//手机号
//          var param={mobile:phone,businessType:1};
          console.log(phone);
          const url = dataHostUrl + "/f/pc/s_10020/messagecenter/messagesendlog/sendmessage";
          if(phone!=""&&regPhone.phone(phone)){
            axios({
              method: 'post',
              url: url,
              params: {
                mobile:phone,
                businessType:"1"
              },
              headers:{"deviceType":"web"}
            }).then((res)=>{
                console.log(res);
              if(res.data.status=="success"&&res.data.statusCode==200){
                this.$toast({message:"已发送",duration: 2000});
                this.sendAuthCode = false;
                this.auth_time = 60;
                var auth_timetimer =  setInterval(()=>{
                  this.auth_time--;
                  if(this.auth_time<=0){
                    this.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                  }
                }, 1000);
              }else{
                this.$toast(res.data.message);
              }
            });
          }else{
            this.$toast({message:"手机号格式不正确",duration: 2000});
          }

        },
        goBack:function(){
          window.history.go(-1);
        },
        submitRegister:function(){
          var phone=this.$refs.mobile.value;//手机号
          var code=this.$refs.code.value;//验证码
          var password=this.$refs.password.value;//密码
          var setpwd=this.$refs.setpwd.value;//重复密码
          var recommendUserId=this.$refs.recommendUserId.value;//推荐人手机号
          if(phone==""||code==""||password==""||setpwd==""){
            this.$toast({message:"请填写完整",duration: 2000});
          }else if(!regPhone.phone(phone)){
            this.$toast({message:"请输入正确手机号",duration: 2000});
          }else if(password!=setpwd){
            this.$toast({message:"两次密码输入不一致",duration: 2000});
          }else{
            var url= dataHostUrl + "/f/pc/s_10020/reg";
            axios({
              method: 'post',
              url: url,
              params: {
                mobile:phone,
                password:password,
                recommendUserId:recommendUserId,
                code:code
              },
            }).then((res) => {
              console.log(res);
              if(res.data.statusCode==200&&res.data.status=='success'){
              this.$toast({message:res.data.message,duration: 2000});
              setTimeout(() => {
                this.$router.push('/login');
              }, 2000);
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }
            })
          }

        }
      },
      components: {HeaderYoude},
    }
</script>
<style lang="scss" scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 459495 */
    src: url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.eot');
    src: url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.woff') format('woff'),
    url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.svg#iconfont') format('svg');
  }
  .z-container{
    .cateHeader {
      max-width: 640px;
      height: 48px;
      background-color: #ffffff;
      color: #fff;
      text-align: center;
      overflow: hidden;
    }
    .goodCate {
      font-size: 20px;
      display: inline-block;
      color: #454545;
      vertical-align:11px;
      margin-left: 20px;
    }
    .go_login{
      color:#454545;
      float: right;
      font-size:16px;
      line-height: 48px;
      margin-right: 10px;
    }
    .iconfont{
      font-family:"iconfont" !important;
      font-size:25px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
      color: #454545;
      line-height: 48px;
      float: left;
    }
    .phone,.code,.setPwd{margin: 10px 11px 5px 10px;
      border-bottom: 1px solid #EAEAEA;
      padding-left: 5px;
      padding-right: 0px;
      margin-bottom: 20px;}
    .phone img,.code img,.setPwd img{
      width:18px;
      vertical-align: -7px;
    }
    .phone input,.code input,.setPwd input{
      width: 59%;
      height:40px;
      font-size: 16px;
      border-bottom: 1px solid #F3F3F3;
    }
    .phone button{
      float: right;
      margin-top: 20px;
      width:85px;
      height: 35px;
      color: #fff;
      background-color: #205AA7;
      border-radius: 10px;
      border: none;
      outline: none;
    }
    .userAgreement span{
      font-size: 14px;
      margin-left: 10px;
    }
    .userAgreement span a{
      margin-left: 10px;
    }
    .userAgreement input[type="checkbox"] {
      width: 20px;
      height: 20px;
      opacity: 0;
    }
    .userAgreement label {
      position: absolute;
      left: 15px;
      top: 26px;
      width: 20px;
      height: 20px;
      border-radius:30%;
      border: 1px solid #999;
    }
    .userAgreement input:checked+label {
      background-color: #F55251;
      border: 1px solid #F55251;
    }

    .userAgreement input:checked+label::after {
      position: absolute;
      content: "";
      width: 5px;
      height: 10px;
      top: 3px;
      left: 6px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg)
    }
    .userAgreement{
      position: relative;
    }
    .auth_text{
      font-size: 16px;
      float: right;
      margin-top: 20px;
      width: 85px;
      height: 35px;
      color: #fff;
      background-color: #ddd;
      border-radius: 10px;
      border: none;
      outline: none;
      line-height: 35px;
      text-align: center;
    }
    .submit button{
      width:80%;
      height: 45px;
      border: none;
      background-color: #205AA7;
      border-radius: 10px;
      border: none;
      outline: none;
      color: #fff;
      font-size: 16px;
    }
    .submit{
      margin-top: 20px;
      text-align: center;
    }
    .submit .submit2{
      background-color: #ddd;
    }
  }


</style>
