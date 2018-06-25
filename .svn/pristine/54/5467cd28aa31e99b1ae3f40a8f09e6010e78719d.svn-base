<template>
  <div>
    <header class="cateHeader">
      <i class="iconfont" @click="goBack">&#xe661;</i>
      <a class="goodCate">重置密码</a>
      <a class="go_login" @click="reloadPwdButton">完成</a>
    </header>
    <div class="registerForm">
      <div class="phone">
        <img src="../zizhi/image/phone.png" alt="">
        <input placeholder="输入手机号" type="text" ref="mobile">
        <button v-show="sendAuthCode" @click="hankClick">获取验证码</button>
        <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}}</span> 秒</span>
      </div>
      <div class="code">
        <img src="../zizhi/image/yzm.png" alt="">
        <input placeholder="输入验证码" type="text" ref="code">
      </div>
      <div class="setPwd">
        <img src="../zizhi/image/setPwd.png" alt="">
        <input placeholder="设置密码 建议字母数字组合" type="text" ref="password">
      </div>
      <div class="setPwd">
        <img src="../zizhi/image/againPwd.png" alt="" >
        <input placeholder="重复密码" type="text" ref="setpwd">
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {dataHostUrl} from '@/api/config';
  import {regPhone} from '@/common/js/util';
  import {Toast} from 'mint-ui';
    export  default{
      name:'reloadPwd',
      data () {
        return {
          sendAuthCode:true,/*通过v-show控制显示‘获取按钮’还是‘倒计时’ */
          auth_time: 0, /*倒计时 计数器*/
        }
      },
      methods:{
        hankClick:function(){
          let mobile = this.$refs.mobile.value;
          let url = dataHostUrl + "/f/app/s_10020/messagecenter/messagesendlog/sendmessage";
          let param = {
            businessType:3
          };
          if(!regPhone.phone(mobile)){
            this._toast('手机号格式不正确！');
            return false;
          }else{
              param.mobile=mobile;
          }
          let instance = axios.create({
            headers:{'deviceType':'web'}
          });
          instance.get(url,{params:param}).then((res)=>{
              //console.log(res.data);
              if(res.data.status==='success'){
                  this._setInterval();
              }else{
                  this._toast(res.data.message);
              }
          })

        },
        _setInterval(){
          this.$toast('已发送');
          this.sendAuthCode = false;
          this.auth_time = 60;
          var auth_timetimer =  setInterval(()=>{
            this.auth_time--;
            if(this.auth_time<=0){
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
            }
          }, 1000);
        },
        _toast(msg){
            let tip = Toast(msg);
            setTimeout(()=>{
                tip.close();
            },1500)
        },
        goBack:function(){
          window.history.go(-1);
        },
        reloadPwdButton:function(){
          let phone=this.$refs.mobile.value;//手机号
          let code=this.$refs.code.value;//验证码
          let password=this.$refs.password.value;//密码
          let setpwd=this.$refs.setpwd.value;//重复密码
          let validUrl = dataHostUrl+"/f/app/s_10020/valid";
          let changePwdUrl = dataHostUrl+"/f/app/s_10020/modifypwd";
          let validParam = {};
          let changeParam = {};

          if(phone==""||code==""||password==""||setpwd==""){
            this.$toast({message:"请填写完整",duration: 2000});
          }else if(!regPhone.phone(phone)){
            this.$toast({message:"请输入正确手机号",duration: 2000});
          }else if(password!=setpwd){
            this.$toast({message:"两次密码输入不一致",duration: 2000});
          }else{
            /*this.$toast({message:"正确填写",duration: 2000});*/
            validParam.mobile = phone;
            validParam.code = code;
            changeParam.mobile = phone;
            changeParam.code = code;
            changeParam.password = setpwd;
          }

          axios.get(validUrl,{params:validParam}).then((res)=>{
              if(res.data.status==='success'){
                axios.get(changePwdUrl,{params:changeParam}).then((obj)=>{
                    if(obj.data.status==='success'){
                      this._toast("密码修改成功！");
                      setTimeout(()=>{
                          this.$router.replace('/login');
                      },2000);
                    }else{
                      this._toast(res.data.message);
                    }
                })
              }else{
                  this._toast(res.data.message);
              }
          })

        }
      }
    }
</script>
<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 459495 */
    src: url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.eot');
    src: url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.woff') format('woff'),
    url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_459495_ot60h1mag05m6lxr.svg#iconfont') format('svg');
  }
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
    width: 60%;
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
</style>
