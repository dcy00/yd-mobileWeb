<template>
    <div>
      <header-youde :title="title"></header-youde>
      <div class="invoiceWrap">
        <div class="switchContainer">
          <span>是否需要发票</span>
          <span class="switchCore" :class="{'checked':hasInvoice}" @click="switchHandle"></span>
        </div>
        <p class="siteBar" v-if="hasInvoice">{{siteContent}}</p>
        <div class="invoiceContainer" v-if="canInvoice">
          <dl class="invoiceBar">
            <dt>发票类型：</dt>
            <dd>
              <label @click="changeType('isEle')"><em class="radioCore" :class="{'checked':isEle}"></em><span>电子普通发票</span></label>
              <label @click="changeType('isTax')"><em class="radioCore" :class="{'checked':isTax}"></em><span>增值税专用发票</span></label>
            </dd>
          </dl>
          <div class="invoiceContent">
            <invoice-electronic v-if="isEle" :eleInvoice="eleInvoice" @invoiceEle="invoiceEleHandle"></invoice-electronic>
            <invoice-tax v-if="isTax" :taxInvoice="taxInvoice" @invoiceTax="invoiceTaxHandle"></invoice-tax>
          </div>

        </div>
        <div class="formBtn" v-else @click="delHandle">删除发票</div>
      </div>
    </div>
</template>

<script>
  import { Toast } from "mint-ui";
  import headerYoude from "@/base/header-youde/header-youde";
  import invoiceElectronic from "@/components/invoice/invoice-electronic"; //电子发票
  import invoiceTax from "@/components/invoice/invoice-tax"; //增值税发票
  import { verfiyOpenInvoice,saveInvoice,delInvoice } from "@/api/invoice";
  export default {
      data(){
          return {
            siteIds:'',
            siteContent:'',
            invoiceId:'',
            title:'发票',
            userInvoice:false,
            userInvoiceData:{},
            hasInvoice:false,
            canInvoice:false,
            isEle:true,
            isTax:false,
            eleInvoice:{
              isPerson:false,
              isCompany:false,
              personInvoice:{},
              companyInvoice:{}
            },
            taxInvoice:{}
          }
      },
      created(){
        this.siteIds = this.$route.params.siteIds;
        this._verfiyOpenInvoice();
      },
      deactivated(){
          this.$destroy();
      },
      methods:{
        switchHandle(){
          /*if(!this.hasInvoice){
            this._verfiyOpenInvoice();
          }else{
            this.canInvoice = false;
          }*/
          this.hasInvoice = !this.hasInvoice;
          this.canInvoice = !this.canInvoice;
        },
        _verfiyOpenInvoice(){

          verfiyOpenInvoice(this.siteIds).then((res)=>{
            if(res.status==='success' && res.statusCode==='200'){
              let siteData = res.data.invoiceList[0];
              this.siteContent = siteData.details;

              if(res.data.invoice !==undefined){  //已有发票信息
                let returnInvoice = res.data.invoice;
                this.canInvoice = true;
                this.hasInvoice = true;
                if(returnInvoice.invoiceType===1){

                    this.isEle = true;
                    this.isTax = false;
                    if(returnInvoice.type===1){
                      this.eleInvoice.isPerson = true;
                      this.eleInvoice.personInvoice = returnInvoice;
                    }else if(returnInvoice.type===2){
                      this.eleInvoice.isCompany = true;
                      this.eleInvoice.companyInvoice = returnInvoice;
                    }

                }else if(returnInvoice.invoiceType===2){
                    this.isEle = false;
                    this.isTax = true;
                    this.taxInvoice = returnInvoice;

                }

              }else{                            // 没有发票信息

                if(siteData.openInvoice){
                  //this.hasInvoice = !this.hasInvoice;
                  this.canInvoice = true;

                }else{
                  this.canInvoice = false;
                }
              }
            }else{
                let tip = Toast(res.message);
                setTimeout(()=>{
                    tip.close();
                },1500);
            }
          })

        },
        changeType(str){
          let that = this;
          switch(str){
            case 'isEle':
                that.isEle=true;
                that.isTax=false;
                break;
            case 'isTax':
                that.isEle=false;
                that.isTax=true;
                break;
          }
        },
        //普通发票
        invoiceEleHandle(options){
            let params = {
              invoiceType:1,
              content:'明细'
            };
            if(!this.isTax && this.isEle){

                if(options.type===1){
                  params.type=options.type;
                  params.emailCode = options.emailCode;

                  //console.log(params);

                  saveInvoice('1',params).then((res)=>{
                    if(res.status==='success' && res.statusCode==='200'){
                      this._toast(res.message);
                      setTimeout(()=>{
                        this.$router.back();
                      },1500);
                    }else{
                      this._toast(res.message);
                    }
                  })

                }else if(options.type===2){
                  params.type=options.type;
                  params.companyName=options.companyName;
                  params.code = options.code;
                  params.emailCode = options.emailCode;
                  saveInvoice('1',params).then((res)=>{
                    if(res.status==='success' && res.statusCode==='200'){
                      this._toast(res.message);
                      setTimeout(()=>{
                        this.$router.back();
                      },1500);
                    }else{
                      this._toast(res.message);
                    }
                  })
                }
            }
        },
        //增值发票
        invoiceTaxHandle(options){
            let params = {
              invoiceType:2,
              companyName:options.companyName,
              code:options.code,
              regAddress:options.regAddress,
              regMobile:options.regMobile,
              bankName:options.bankName,
              bankAccount:options.bankAccount,
              license:options.license,
              certificates:options.certificates,
              content:"明细"
            };
            console.log(params);
            if(this.isTax && !this.isEle){
              saveInvoice('2',params).then((res)=>{
                  console.log(res);
                  if(res.status==='success' && res.statusCode==='200'){
                      this._toast(res.message);
                      setTimeout(()=>{
                          this.$router.back();
                      },1500);
                  }else{
                    this._toast(res.message);
                  }
              })
            }
        },
        //删除发票
        delHandle(){
            delInvoice().then((res)=>{
              this._toast(res.message);
              if(res.status==='success'){
                setTimeout(()=>{
                    this.$router.back();
                },1500);
              }

            })
        },
        _toast(msg){
          let tip = Toast(msg);
          setTimeout(()=>{
            tip.close();
          },1500);
        }
      },
      components:{
        headerYoude,
        invoiceElectronic,
        invoiceTax
      }
  }
</script>

<style lang="scss" scoped>
  @import "~@/common/css/mixin.scss";
  .invoiceWrap{
    padding-top:0.96rem;
    font-size:0.26rem;
    color:#333;
    .siteBar{
      height:0.5rem;line-height: 0.5rem;
      padding:0.24rem;
      border-bottom:1px solid #eee;
    }
    .switchContainer{
      line-height:32px;
      padding:0.24rem;
      overflow:hidden;
      border-bottom:1px solid #eee;
      span:first-child{
        float:left;
      }
      .switchCore{
        display: inline-block;
        position: relative;
        width: 52px;
        height: 32px;
        border: 1px solid #d9d9d9;
        border-radius: 16px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #d9d9d9;
        float:right;
        &.checked{
          border-color: #26a2ff;
          background-color: #26a2ff;
          &:before{
            background-color: #26a2ff;
            -webkit-transform: scale(0);
            transform: scale(0);
          }
          &:after{
            -webkit-transform: translateX(20px);
            transform: translateX(20px);
          }
        }
        &:after,&:before {
          content: " ";
          top: 0;
          left: 0;
          position: absolute;
          -webkit-transition: -webkit-transform .3s;
          transition: -webkit-transform .3s;
          transition: transform .3s;
          transition: transform .3s, -webkit-transform .3s;
          border-radius: 15px;
        }
        &:after {
          width: 30px;
          height: 30px;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        }
        &:before {
          width: 50px;
          height: 30px;
          background-color: #fdfdfd;
        }
      }
    }
    .invoiceContainer{
      padding:0.15rem 0.24rem;
      .invoiceBar{
        overflow:hidden;
        padding:0.1rem 0;
        dt,dd{display:block;height:0.5rem;line-height: 0.5rem;float:left;}
        dt{width:1.5rem;}
        dd{
          width:5.28rem;
          padding-left:0.24rem;
          overflow:hidden;
          label{
            display:inline-block;
            width:50%;
            height: 0.38rem;
            line-height:0.38rem;
            margin-top:0.06rem;
            float:left;
            span{
              float:left;
              margin:0 0.1rem;
            }
          }
          .radioCore{
            box-sizing: border-box;
            display: inline-block;
            background-color: #fff;
            border: 1px solid #ccc;
            position: relative;
            width: 0.38rem;
            height: 0.38rem;
            vertical-align: middle;
            @include border-radius(50%);
            position:relative;
            float:left;
            &.checked{
              background-color: #26a2ff;
              border-color: #26a2ff;
              &:after{
                background-color: #fff;
                -webkit-transform: scale(1);
                transform: scale(1);
              }
            }
            &:after{
              content: "";
              border-radius: 100%;
              top: 50%;
              left: 50%;
              position: absolute;
              width: 0.16rem;
              height: 0.16rem;
              margin:-0.08rem 0 0 -0.08rem;
              -webkit-transition: -webkit-transform .2s;
              transition: -webkit-transform .2s;
              transition: transform .2s;
              transition: transform .2s, -webkit-transform .2s;
              -webkit-transform: scale(0);
              transform: scale(0);
            }
          }
        }
      }
    }
    .formWrap{
      li{
        height:0.58rem;
        line-height:0.58rem;
        padding:0.12rem 0;
        label{
          display:block;
          width:1.5rem;
          float:left;
        }
        .iptWrap{
          width:5.28rem;
          padding-left:0.24rem;
          overflow:hidden;
          float:left;
          input{
            -webkit-box-sizing:border-box;
            -moz-box-sizing:border-box;
            box-sizing:border-box;
            width:5.26rem;
            border:1px solid #ccc;
            height:0.58rem;
            padding-left:0.1rem;
            @include border-radius(3px);
          }
        }
      }
    }
    .formBtn{
      margin:0.24rem;
      height:0.8rem;
      line-height:0.8rem;
      text-align:center;
      font-size:0.32rem;
      color:#fff;
      background: linear-gradient(150deg, rgba(55, 150, 208, 0.9), #36c);
      @include border-radius();
    }
  }
</style>
