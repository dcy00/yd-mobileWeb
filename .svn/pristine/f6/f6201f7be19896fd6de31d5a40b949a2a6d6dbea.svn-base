<template>
    <div class="refundNum">
      <header-youde title="退换货"></header-youde>
      <div class='line'></div>
      <div class='heading'>
        退货数量 <span class='heading-span'>最多{{pageData.refundNum}}件</span>
        <div class="buyNum">
          <img @click="reduce"  class="reduceBtn" src='../zizhi/image/reduceIcon.png'>
          <span class="buyNumspan" ref="buyNumspan">{{buyNumspan}}</span>
          <img @click="add" class="addBtn" src='../zizhi/image/addIcon.png'>
        </div>
      </div>
      <div class='line'></div>
      <div class='why'>
        <div class="section__title">退货原因</div>

        <select class="picker clearfix" v-model="couponSelected">
          <option :value="item.name" v-for="item in pageData.returnReasonList">{{item.name}}</option>
        </select>

      </div>

      <div class='backPrice'>
        <div class="section__title">退货金额 <span class='heading-span'>最多{{(pageData.refundMoney)/100}}元</span></div>
        <input class='backPrice_input' ref="backPrice_input"  type='text' name="input" placeholder="请输入退货金额" />
      </div>

      <div class='backPrice'>
        <div class="section__title">退货说明</div>
        <textarea class='backPrice_spanarea' ref="backPrice_spanarea"  placeholder="请输入退货说明" name="spanarea"/>
      </div>
      <div class="submit">
        <div class='subBtn' @click="backSubmit">提交申请</div>
      </div>
    </div>
</template>
<script>
  import HeaderYoude from '@/base/header-youde/header-youde';
  import axios from 'axios';
  import {dataHostUrl} from '@/api/config';
  import {getUid,local} from '@/common/js/util';
    export  default{
        name: '',
        data () {
            return {
                num:'',
                orderid:'',
                orderinfoid:'',
                pageData:'',
                number:'',//件数
                parce:'',//价格
                buyNumspan:1,
                couponSelected: '',
            }
        },
      created(){
        //获取数据
          this.getUrlData();
          this.getPageData();
      },
        methods: {
          getUrlData:function(){
              console.log(this.$route.params);
              this.num=this.$route.query.num;
              this.orderid=this.$route.query.orderid;
              this.orderinfoid=this.$route.query.orderinfoid;
          },
          getPageData:function(){
            var param={
              orderNo:this.orderid,
              orderinfoId:this.orderinfoid,
              refundNum:this.num
            }
            var url=dataHostUrl + "/uc/app/s_10020/sporder/apply/refund?springraintoken="+local.get("springraintoken");
            axios.get(url,{params:param}).then((res) => {
              console.log(res);
              if(res.data.statusCode==200&&res.data.status=='success'){
                  this.pageData=res.data.data;
                  this.number=res.data.data.refundNum;
                  this.parce=res.data.data.refundMoney/100;
                  this.couponSelected = res.data.data.returnReasonList[0].name;
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }
            })
          },
          add:function(){
              var goodsNum=this.buyNumspan;
              var num=this.number;
              goodsNum =goodsNum + 1;
              if (goodsNum >num) {
                this.$toast({message:'最多为'+num+"件",duration: 2000});
                return;
              }
            this.buyNumspan=goodsNum;
          },
          reduce:function(){
            var goodsNum=this.buyNumspan;
            var num=this.number;
            goodsNum = goodsNum - 1;
            if (goodsNum == 0) {
              this.$toast({message:'最少为1件',duration: 2000});
              return;
            }
            this.buyNumspan=goodsNum;
          },
          backSubmit:function(){
              var url=dataHostUrl + "/uc/app/s_10020/sporder/saveSale?springraintoken="+local.get("springraintoken");
              var returnNumber =this.buyNumspan;//退款数量
              var reason = this.couponSelected;//退款原因
              var message = this.$refs.backPrice_spanarea.value; //退款说明
              var refundMoney =this.$refs.backPrice_input.value; //退款金额
              var orderinfoid =this.orderinfoid;//订单详情Id
              var orderid = this.orderid;//订单Id
              if (refundMoney==""){
                this.$toast({message:'请输入退款金额',duration: 2000});
                return;
              }
              if (refundMoney > (this.parce)){
                  this.$toast({message: '最多'+this.parce+"元",duration: 2000});
                  return;
              }
              if (message==""){
                this.$toast({message: '请输入退货说明',duration: 2000});
                return;
              }
              var param={
                returnNumber: returnNumber,
                reason: reason,
                message: message,
                refundMoney: refundMoney,
                orderInfoId: orderinfoid,
                orderNo: orderid,
              }
            axios.get(url,{params:param}).then((res) => {
              console.log(res);
              if(res.data.statusCode==200&&res.data.status=='success'){
                this.$toast({message:res.data.message,duration: 2000});
                setTimeout(() => {this.goGoodsBack()}, 2000);
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }
            })
          },
          goGoodsBack:function(){
            this.$router.push('/goodsBack');
          }
        },
        components: {HeaderYoude},
    }
</script>
<style scoped>
  .refundNum{
    font-size: 0.35rem;
    padding-top: .95rem;
  }
  .heading,.why,.backPrice{
    padding: 20px;
  }
  .heading-text{
    font-size:0.2rem;
    color:#959595;
  }
  .buyNum{
    margin-top: 10px;
    text-align: center;
  }
  .line{
    height: 10px;
    background-color: #F1F1F4;
    width: 100%;
  }
  .buyNum text{
    color: #90959F;
    line-height:27px;
  }
  .reduceBtn,.addBtn{
    width: 0.4rem;
    height: 0.4rem;
  }
  .reduceBtn,.addBtn{
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    vertical-align: -0.08rem;
  }
  .picker{
    margin-top: 10px;
    color: #959595;
    font-size: 14px;
    height: 0.8rem;
    background-color: #F5F5F5;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #f5f5f5;
    outline: none;
    width: 100%;
  }
  .picker img{
    width: 20px;
    height: 10px;
    float: right;
    margin-top:5px;
  }
  .why,.backPrice{
    border-bottom: 1px solid #E5E5E5;
  }
  .backPrice_input{
    background-color: #F5F5F5;
    height: 0.5rem;
    padding: 5px;
    border-radius: 5px;
    margin-top: 0.1rem;
    font-size: 0.25rem;
    width: 100%;
    line-height: 0.5rem;
  }
  textarea{
    border: none;
    outline: none;
    width: 100%;
    height: 2rem;
    margin-top: 10px;
    background-color: #F5F5F5;
    padding: 0.1rem;
  }


  .submit{
    height: 30px;
    padding: 10px;
    position: fixed;
    bottom: 0px;
    border-top: 1px solid #ddd;
    width: 100%;
    background-color: #ffffff;
    text-align: center;
    z-index: 9999;
  }
  .subBtn{
    display:inline-block;
    height:20px;
    padding:5px;
    text-align:center;
    margin:0 auto;
    width:60%;
    background-color:#3785CF;
    font-size:14px;
    color:#ffffff;
    border-radius:5px;
  }
  .heading-span{
    font-size: 0.15rem;
    color:#aaaaaa;
  }
</style>
