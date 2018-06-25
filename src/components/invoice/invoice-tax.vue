<template>
    <div class="invoiceTaxWrapper">
      <div class="formWrap">
        <ul>
          <li>
            <label>单位名称:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入单位名称" ref="companyName" :value="taxInvoice.companyName"/>
            </span>
          </li>
          <li>
            <label>纳税识别号:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入纳税人识别号" ref="code" :value="taxInvoice.code"/>
            </span>
          </li>
          <li>
            <label>注册地址:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入注册地址" ref="regAddress" :value="taxInvoice.regAddress"/>
            </span>
          </li>
          <li>
            <label>注册电话:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入注册电话" ref="regMobile" :value="taxInvoice.regMobile"/>
            </span>
          </li>
          <li>
            <label>开户银行:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入开户银行" ref="bankName" :value="taxInvoice.bankName"/>
            </span>
          </li>
          <li>
            <label>银行账户:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入银行账户" ref="bankAccount" :value="taxInvoice.bankAccount"/>
            </span>
          </li>
          <li class="uploadContainer">
            <label>资质:</label>
            <div class="uploadContent">
              <p>请上传清晰的<em class="blue">营业执照</em>和<em class="red">税务登记证</em>正面照片</p>

              <span class="imgBox" :class="{'border':!hasLicense}">
                <em class="closeBtn" @click="closeImgHandle('license')" v-if="hasLicense"></em>
                <img :src="license" alt="" v-if="hasLicense">
                <!--<label for="file" class="addBtn" v-if="!hasLicense">
                  <input type="file" id="file" @change="imgFileHandle('license')" ref="imgFile">
                </label>-->
                <aliossupload @childEmit="parentHandle" type="license" v-if="!hasLicense"></aliossupload>
                <i v-if="!hasLicense">营业执照</i>
              </span>
              <span class="imgBox" :class="{'border':!hasCertificates}">
                <em class="closeBtn" @click="closeImgHandle('certificates')" v-if="hasCertificates"></em>
                <img :src="certificates" alt="" v-if="hasCertificates">
                <aliossupload @childEmit="parentHandle" type="certificates" v-if="!hasCertificates"></aliossupload>
                <i v-if="!hasCertificates">税务登记证</i>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="formWrap">
        <ul>
          <li>
            <label>发票内容:</label>
            <span class="iptWrap">商品明细</span>
          </li>
        </ul>
      </div>
      <div class="formBtn" @click="submitHandle">完成</div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import aliossupload from '@/base/aliossupload/aliossupload'
    export default {
        props:{
            taxInvoice:Object
        },
        data(){
            return {
              dataUrls:[],
              company:'',
              iCode:'',
              regAddress:'',
              regMobile:'',
              bank:'',
              bankNum:'',
              license:'',
              certificates:'',
              hasLicense:false,
              hasCertificates:false
            }
        },
        created(){
            if(this.taxInvoice.license!==undefined){
                if(this.taxInvoice.license!==''){
                  this.hasLicense=true;
                  this.license = this.taxInvoice.license;
                }
            }else if(this.taxInvoice.certificates!==undefined){
                if(this.taxInvoice.certificates!==''){
                  this.hasCertificates=true;
                  this.certificates = this.taxInvoice.certificates;
                }
            }
        },
        methods:{
          parentHandle(options){
              if(options.type==='license'){
                this.hasLicense = true;
                this.license = options.url;
              }else{
                this.hasCertificates = true;
                this.certificates = options.url;
              }

          },
          closeImgHandle(type){
            let that = this;
            if(type==='license'){
              that.license = '';
              that.hasLicense = false;
            }else if(type==='certificates'){
              that.certificates='';
              that.hasCertificates = false;
            }
          },
          submitHandle(){
            let that = this;
            let obj = {
              companyName:that.$refs.companyName.value,
              code:that.$refs.code.value,
              regAddress:that.$refs.regAddress.value,
              regMobile:that.$refs.regMobile.value,
              bankName:that.$refs.bankName.value,
              bankAccount:that.$refs.bankAccount.value,
              license:that.license,
              certificates:that.certificates,
              content:'明细'
            };
            that.$emit('invoiceTax',obj);
          },
          _toast(msg){
            let tip = Toast(msg);
            setTimeout(()=>{
              tip.close();
            },1500);
          }
        },
        components:{
          aliossupload
        }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/mixin.scss";
  .invoiceTaxWrapper{font-size:0.26rem;color:#333;}
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
      &.uploadContainer{
        height:auto !important;
        overflow:hidden;

        label{height:0.58rem;line-height:0.58rem;}
        .uploadContent{
          width:5.28rem;
          padding-left:0.24rem;
          overflow:hidden;
          float:left;
          em{
            font-style:normal;
            padding:0 0.05rem;
          }
          .blue{color:#36c;}
          .red{color:#FF5D5D;}
          span{
            display:block;
            width:2.4rem;
            height:1.8rem;
            margin:0.1rem;
            float:left;
            -webkit-box-sizing:border-box;
            -moz-box-sizing:border-box;
            box-sizing:border-box;
            position:relative;
            @include border-radius(3px);
            &.border{border:1px solid #ccc;}
            &.imgBox{
              overflow:hidden;
              img{
                display:block;
                width:100%;
                position:absolute;
                top:50%;
                left:50%;
                -webkit-transform:translate(-50%,-50%);
                -moz-transform:translate(-50%,-50%);
                transform:translate(-50%,-50%);
              }
              .closeBtn{
                display:block;
                width:22px;
                height:22px;
                background:#f00;
                padding:0;
                @include border-radius(50%);
                @include transform-rotate(45deg);
                position:absolute;
                top:0;
                right:0;
                z-index:2;
                &:before,&:after{
                  display:block;
                  content:"";
                  background:#fff;
                  position:absolute;
                  top:50%;
                  left:50%;
                }
                &:before{
                  width:14px;
                  height:2px;
                  margin:-1px 0 0 -7px;
                }
                &:after{
                  width:2px;
                  height:14px;
                  margin:-7px 0 0 -1px;
                }
              }
              i{
                display:block;
                width:100%;
                height:0.3rem;
                line-height:0.3rem;
                text-align:center;
                font-style:normal;
                position:absolute;
                bottom:0.2rem;
                color:#999;
              }
            }

          }
          .addBtn{
            display:block;
            width:2rem;
            height:1rem;
            -webkit-box-sizing:border-box;
            -moz-box-sizing:border-box;
            box-sizing:border-box;
            @include border-radius(3px);
            position:absolute;
            top:0.2rem;
            left:50%;
            margin:0 0 0 -1rem;
            overflow:hidden;
            input{
              position:absolute;
              left:-9999px;
            }
            &:before,&:after{
              display:block;
              content:"";
              background:#ccc;
              position:absolute;
              top:50%;
              left:50%;
            }
            &:before{
              width:50px;
              height:2px;
              margin:-1px 0 0 -25px;
            }
            &:after{
              width:2px;
              height:50px;
              margin:-25px 0 0 -1px;
            }
          }
        }
      }
    }
  }
</style>
