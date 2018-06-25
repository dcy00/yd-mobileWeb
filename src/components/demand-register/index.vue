<template>
  <div>
    <header-youde title="提交商品需求"></header-youde>
    <div class="container">
      <mt-field label="*药品名称：" :state="goodsName!==''?'success':''" v-model="goodsName"></mt-field>
      <mt-field label="*药品数量：" :state="goodsNum>0?'success':''"  type="number" v-model="goodsNum"></mt-field>
      <mt-field label="*药品规格：" :state="goodsSpec!==''?'success':''" v-model="goodsSpec"></mt-field>
      <mt-field label="*您的姓名：" :state="namePass?'success':''" v-model="userName"></mt-field>
      <mt-field label="*您的电话：" :state="mobilePass?'success':''"  type="tel" v-model="userMobile"></mt-field>
      <mt-field class="my-textarea" label="备注："  rows="4" type="textarea" v-model="content"></mt-field>
      <div style="margin-top: 30px;"></div>
      <button-youde @submitData="clickSubmit"></button-youde>
    </div>
  </div>
</template>

<script>
  import HeaderYoude from '@/base/header-youde/header-youde';
  import buttonYoude from '@/base/button-youde/button-youde';
  import {postRegister} from '@/api/search';
  import { Field,Toast  } from 'mint-ui';
  import {regPhone} from '@/common/js/util'
  export default{
    data() {
      return {
        content:'',
        userName: '',
        userMobile:'',
        goodsName:'',
        goodsNum:null,
        goodsSpec:'',
        mobilePass:false,
        namePass:false
      }
    },
    components: {HeaderYoude,buttonYoude},
    methods: {
      clickSubmit(){
        if(this.goodsName === ''){
          Toast('请输入药品名称');
          return false;
        }
        if(this.goodsNum<1){
          Toast('请输入药品数量');
          return false;
        }
        if(this.goodsSpec === ''){
          Toast('请输入药品规格');
          return false;
        }
        if(!this.namePass){
          Toast('请输入您的姓名');
          return false;
        }
        if(!this.mobilePass){
          Toast('请输入您的电话');
          return false;
        }
        postRegister(this.userMobile,this.userName,this.goodsName, this.goodsNum, this.goodsSpec, this.content).then((res)=>{
            if(res.status === 'success') {
              Toast('您的需求已提交');
              setTimeout(()=>{
                this.$router.back();
              },3000)
            }
        })
      }
    },
    watch:{
      userMobile(newVal){
         if(regPhone.phone(newVal)) {
             this.mobilePass = true;
         }else {
           this.mobilePass = false;
         }
      },
      userName(newVal){
        if(newVal.length>=2) {
          this.namePass = true;
        }else {
          this.namePass = false;
        }
      }
    }
  }
</script>
<style  scoped lang="scss">
  @import "~@/common/css/variable.scss";
  .container{
    position: fixed;
    width: 100%;
    top: $header-height;
    bottom: 0;
    width: 100%;
    overflow: scroll;
  }
</style>
