<template>
    <div class="invoiceEleWrapper">
      <dl class="invoiceBar">
        <dt>发票抬头：</dt>
        <dd>
          <label @click="changeType('isPerson')"><em class="radioCore" :class="{'checked':eleInvoice.isPerson}"></em><span>个人</span></label>
          <label @click="changeType('isCompany')"><em class="radioCore" :class="{'checked':eleInvoice.isCompany}"></em><span>单位</span></label>
        </dd>
      </dl>
      <div class="formWrap">
        <ul v-if="eleInvoice.isPerson">
          <li>
            <label>收票人邮箱:</label>
            <span class="iptWrap">
              <input type="email" placeholder="请输入收票人邮箱" ref="email" @blur="iptHandle('1')" :value="eleInvoice.personInvoice.emailCode"/>
            </span>
          </li>
        </ul>
        <ul v-if="eleInvoice.isCompany">
          <li>
            <label>单位名称:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入单位名称" ref="companyName" :value="eleInvoice.companyInvoice.companyName"/>
            </span>
          </li>
          <li>
            <label>纳税识别号:</label>
            <span class="iptWrap">
              <input type="text" placeholder="请输入纳税人识别号" ref="code" :value="eleInvoice.companyInvoice.code"/>
            </span>
          </li>
          <li>
            <label>收票人邮箱:</label>
            <span class="iptWrap">
              <input type="email" placeholder="请输入收票人邮箱" ref="email2" @blur="iptHandle('2')" :value="eleInvoice.companyInvoice.emailCode"/>
            </span>
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
  import { Toast } from "mint-ui";
  import { regEmail } from "@/common/js/util";
    export default {
        props:{
            eleInvoice:Object
        },
        data(){
            return {
              isPerson:true,
              isCompany:false,
              email:"",
              email2:"",
              company:"",
              iCode:""
            }
        },
        created(){
          //console.log(this.eleInvoice);
          /*this._splitData(this.eleInvoice);*/
        },
        methods:{
          /*_splitData(data){
              if(data.isPerson){
                this.isPerson = data.isPerson;
                this.isCompany = data.isCompany;
              }
              if(data.isCompany){
                this.isPerson = false;
                this.isCompany = true;
              }
          },*/
          changeType(str){
            let that = this;
            switch(str){
              case 'isPerson':
                that.eleInvoice.isPerson=true;
                that.eleInvoice.isCompany=false;
                break;
              case 'isCompany':
                that.eleInvoice.isPerson=false;
                that.eleInvoice.isCompany=true;
                break;
            }
          },
          //input处理函数
          iptHandle(type){
              let that = this;

              switch(type){
                case '1':
                    let emailVal = that.$refs.email.value;
                    if(!regEmail.email(emailVal)){
                      that._toast("邮箱格式不正确");
                      return false;
                    }
                    break;
                case '2':
                    let emailVal2 = that.$refs.email2.value;
                    if(!regEmail.email(emailVal2)){
                      that._toast("邮箱格式不正确");
                      return false;
                    }
                    break;
              }
          },
          //提示层
          _toast(str){
              let tip = Toast(str);
              setTimeout(()=>{
                  tip.close();
              },1500);
          },

          submitHandle(){
              let that = this;
              if(that.isPerson){
                let obj = {
                  type:1,
                  emailCode:that.$refs.email.value,
                  content:'明细'
                };
                that.$emit('invoiceEle',obj);

              }else if(that.isCompany){
                let obj = {
                  type:2,
                  companyName:that.$refs.companyName.value,
                  code:that.$refs.code.value,
                  emailCode:that.$refs.email2.value,
                  content:'明细'
                };
                that.$emit('invoiceEle',obj);
              }
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/common/css/mixin.scss";
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
  .invoiceEleWrapper{font-size:0.26rem;color:#333;}
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

</style>
