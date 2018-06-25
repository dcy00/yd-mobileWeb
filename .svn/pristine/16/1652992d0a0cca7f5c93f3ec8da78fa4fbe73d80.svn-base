<template>
    <div class="content">
      <header-youde title="退换货"></header-youde>
      <div class="section" v-if="goodsBack==true">
          <div class="back-list" v-for="item in backList">
              <div class="title">
                  <span>{{item.siteName}}</span>
                  <span class="ope">{{item.stateStr}}</span>
              </div>
              <div class="goods">
                <div class="goodsImg">
                  <img :src="item.thumbnail" alt="">
                </div>
                <div class="goodsTitle">
                    <div>{{item.goodsName}}</div>
                    <div class="goods-price">￥:{{item.goodsPrice/100}}</div>
                </div>
              </div>
              <div class="adr" v-if="item.state==3 || item.state==5">
                <div class=''>收货人:{{item.refundUserName}}</div>
                <div class=''>联系电话:{{item.refundPhone}}</div>
                <div class=''>退货地址:{{item.refundaddress}}</div>
              </div>
              <div  class="back-price">
                  <span class="back-price-1">{{item.details}}</span>
                  <span class="back-price-2">退款金额：￥{{item.refundMoney/100}}</span>
              </div>
              <div class="operation">
                <div class="operationBtn" v-if="item.state==2">
                  <span>查看原因</span>
                </div>
                  <div class="operationBtn" v-if="item.state==3">
                    <span>取消退货</span>
                    <span @click="editLogis" ref="editLogis" :data-id="item.id" :data-expressid="item.returnAddressId">修改物流单号</span>
                  </div>
                <div class="operationBtn" v-if="item.state==5">
                  <span>取消退货</span>
                  <span @click="editLogis" ref="editLogis" :data-id="item.id" :data-expressid="item.returnAddressId">填写物流单号</span>
                </div>
                <div class="operationBtn" v-if="item.state==1">
                  <span>取消退货</span>
                  <span  @click="editSq" ref="editSq" :data-orderId="item.orderId" :data-orderinfoid="item.orderInfoId" :data-num="item.num">修改申请</span>
                </div>
              </div>
          </div>
      </div>
      <empty-data class="empty-data" v-if="goodsBack==false"></empty-data>
    </div>
</template>
<script>
    import {getBackData} from '@/api/goodsBack';
    import HeaderYoude from '@/base/header-youde/header-youde';
    import EmptyData from '@/base/empty-data/empty-data';
    import {mapMutations} from 'vuex';
    export  default{
        name: '',
        data () {
            return {
              goodsBack:true,
              backList:''
            }
        },
        created(){
          //获取数据
          this._getGoodsBack();
//          this.SET_Loading(true);
        },
        methods: {
          ...mapMutations({
            SET_Loading: 'SET_Loading'
          }),
          _getGoodsBack:function(){
            getBackData().then((res)=>{
                console.log(res);
              if(res.statusCode==200&&res.status=='success'){
                  this.goodsBack=true;
                  this.backList=res.data;

              }else{
                this.$toast({message:res.data.message,duration: 2000});
                this.goodsBack=false;
              }
            });
            this.SET_Loading(false);
          },
          //修改申请
          editSq:function(){
              console.log(this.$refs.editSq[0]);
             var num=this.$refs.editSq[0].dataset.num;
             var orderid=this.$refs.editSq[0].dataset.orderid;
             var orderinfoid=this.$refs.editSq[0].dataset.orderinfoid;
             this.$router.push({
               path: '/editGoodsBack',
               name:'editGoodsBack',
               query: {
                 orderid: orderid,
                 num: num,
                 orderinfoid:orderinfoid
               }
             });
          },
          //填写修改物流申请
          editLogis:function(){
              var refundid=this.$refs.editLogis[0].dataset.id;
              var expressid=this.$refs.editLogis[0].dataset.expressid;
            this.$router.push({
              path: '/logistics',
              name:'logistics',
              query: {
                refundid: refundid,
                expressid: expressid,
              }
            });
          }

        },
        components: {HeaderYoude,EmptyData},
    }
</script>
<style scoped>
.empty-data{
  top:42px !important;
}
  .title,.goods,.price,.operation{
    padding: 10px;
  }
  .section{
    margin-top: 40px;
    font-size: .35rem;
  }
  .title{
    line-height: .7rem;
  }
  .title .ope{
    font-size: .25rem;
    float: right;
  }
  .ope{
    color: red;}
  .goods,.back-price{
    display: flex;
  }
  .goodsImg,.goodsTitle,.back-price-1,.back-price-2{
    flex-direction: row;
  }
.goodsImg{width:30%;}
.goodsTitle{width:70%;padding: 5px;}
.goodsImg img{ width:100%;}
  .goodsTitle div{
    line-height: .7rem;
  }
  .spec{
    font-size: 0.25rem;
    color: #7B7B7B;
  }
  .goodsTitle div:first-child{
    font-weight: bold;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .goods-price{
    color: #7B7B7B;
  }
  .title,.back-price,.operation{
    border-bottom: 1px solid #f3f3f3;
  }
  .back-price-1,.back-price-2{
    width: 50%;
  }
  .back-price-2{
    text-align: right;
  }
  .back-price{
    padding:10px;
    padding-top:0px;
    font-size: 0.3rem;
    color: #6E7477;
  }
  .operationBtn span{
    display: inline-block;
    border: 1px solid #ddd;
    padding:5px 10px;
    border-radius: 10px;
    font-size: 0.27rem;
    color: #464646;
  }
.operationBtn span:first-child{
  border: 1px solid #5994D0;
  color: #5994D0;
}
  .adr div{
      font-size: .20rem;
      line-height: .3rem;
  }
.adr{
  padding:10px;}
</style>
