<template>
  <div class="z-container">
    <header-youde title="登录"></header-youde>
    <div class="login_logo"><img src="../zizhi/image/denglu_logo.png" alt=""></div>
    <div class="loginForm">
      <div class="userName"><input ref="username" type="text" placeholder="请输入手机号"></div>
      <div class="passworld">
        <input :type=type ref="passworld" placeholder="请输入密码">
        <i  @click="eyesOpen"><img :src=eyes alt="" :state=state></i>
      </div>
      <div class="submit"><button v-on:click="login">登录</button></div>
    </div>
    <div class="forgetPwd">
      <router-link class="go_register" to="register">注册</router-link>
      <router-link to="reloadPwd">忘记密码？</router-link>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapMutations,mapGetters, mapActions} from 'vuex';
  import {dataHostUrl} from '@/api/config';
  import {getUid,replaceHTMLTag,local,regPhone} from '@/common/js/util';
  import HeaderYoude from '@/base/header-youde/header-youde';
    export  default{
      name: 'login',
      data () {
        return {
          eyes:require('../zizhi/image/eyesOpen.png'),
          state:true,//睁开,
          type:"text"
        }
      },
      methods: {
        login:function(){
          const url = dataHostUrl + "/f/pc/s_10020/login/json";
          let uuid='';
          if(local.get('uuid')){
            uuid = local.get('uuid');
          }
          var param={
            mobile:this.$refs.username.value,
            password:this.$refs.passworld.value,
            uuid:uuid
          };
          axios.post(url,"post",{params:param}).then((res)=>{
              console.log(res);
              if(res.data.status=="success"&&res.data.statusCode==200){
                this.$toast({message:"登录成功",duration: 2000});
                local.save("springraintoken",res.data.map.springraintoken);
                local.save("userId",res.data.data.id);
                local.save("userId",res.data.data.id);
                local.save("nickname",res.data.data.nickname);
                local.save("uuid","");
                this.getCartNumber().then(()=>{
                  setTimeout(() => {
                    this.goPerCenter();
                  }, 2000);
                });

              }else{
                this.$toast(res.data.message);
              }
          });
        },
        goPerCenter:function(){
          this.$router.push('/perCenter');
        },
        goBack(){
          window.history.go(-1);
        },
        eyesOpen:function(){
            if(this.state==true){
              this.eyes=require('../zizhi/image/eyesClose.png');
              this.state=false;
              this.type="password";
            }else{
              this.eyes=require('../zizhi/image/eyesOpen.png');
              this.state=true;
              this.type="text";
            }

        },
        ...mapActions({
          getCartNumber: 'getCartNumber' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        })
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
  body{background-color: #ffffff;}
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
      vertical-align: 11px;
      margin-left: 20px;
    }
    .go_register{
      color:#454545;
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
    .login_logo img{
      width:100%;
    }
    .login_logo{
      margin-top: 30px;
      padding: 50px;
    }
    .loginForm{
      margin-top: 50px;
      text-align: center;
    }
    .loginForm input{
      width:80%;
      height: 45px;
      font-size: 16px;
      border-bottom: 1px solid #F3F3F3;
    }
    .loginForm .passworld input {
      width: 68%;
    }
    .passworld i img{
      width: 8%;
    }
    .submit{margin-top: 40px;}
    .submit button{
      width: 85%;
      border: none;
      background-color: #3765CC;
      font-size: 18px;
      color: #ffffff;
      height:45px;
      border-radius: 5px;
      outline:none;
    }
    .forgetPwd{text-align: right;margin-right: 10px;}
    .forgetPwd a{font-size: 16px;color: #454545;}
  }

</style>
