<template>
  <div class="sec">
    <header class="cateHeader">
      <i class="iconfont" @click="goBack">&#xe661;</i>
      <a class="goodCate">用户注册协议</a>
    </header>
    <section  class="content">
        <div class="head">
          <span class="title">用户协议</span>
          <span class="time">2017-09-20</span>
        </div>
        <div class="detail">
          {{domData}}
        </div>
    </section>
  </div>
</template>
<script>
  import axios from 'axios'
  import {dataHostUrl} from '@/api/config'
  import {removeHTMLTag} from '@/common/js/util'
    export  default{
      name:'regAgreement',
      data () {
        return {
            domData:{}
        }
      },
      methods: {
        getDomData: function () {
          const url = dataHostUrl + "/f/mp/s_10020/c_101290-s_10020";
          axios({
            method: 'get',
            url: url,
            data: {},
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res) => {
            this.domData = this.replaceDom(res.data)
          })
        },
        goBack: function () {
          window.history.go(-1);
        },
        replaceDom: function (str) {
          removeHTMLTag(str)
        },
      },
        mounted: function () {
          this.getDomData();
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
    color: #fff;
    text-align: center;
    overflow: hidden;
    background-color: #fff;
    position: fixed;
    width:100%;
    top:0;
  }
  .goodCate {
    font-size: 20px;
    display: inline-block;
    color: #454545;
    vertical-align: 11px;
    margin-left: 20px;
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
  .sec{
    background-color: #F0F1F3;
  }
  .content{
    margin:10px;
    font-size: 16px;
    text-align: justify;
    word-wrap:break-word;
    padding-top: 45px;
  }
  .head{
    height:30px;
    background-color: #fff;
    padding: 10px;
    padding-top:20px;
    border-bottom: 1px solid #EFEFEF;
  }
  .title{
    line-height:30px;
    color: blue;
    font-size: 20px;
  }
  .time{
    float: right;
    margin-top: 6px;
  }
  .detail{
    background-color: #fff;
    padding: 10px;
    line-height: 25px;
  }
</style>
