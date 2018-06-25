<template>
  <div class="section">
    <header-youde title="填写物流单号"></header-youde>
    <div class='why'>
      <div class="section__title">请选择物流公司</div>

      <select class="selectWl"  v-model="selectWl">
        <option v-for="item in selectData" :value="item.id">{{item.name}}</option>
      </select>
    </div>
    <div class='backPrice'>
      <div class="section__title">请输入物流单号</div>
      <input class='backPrice_input' ref="backPriceInput" type='text' name="input" placeholder="请输入物流单号" />
    </div>
    <div class="submit">
      <div class='subBtn' @click='backSubmit'>提交申请</div>
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
              selectWl:'',//物流公司,
              selectData:"",
            }
        },
        created(){
            this.getWlData();
        },
        methods: {
            getWlData:function(){
              var url=dataHostUrl + "/uc/app/s_10020/sporderrefund/editWuliu?springraintoken="+local.get("springraintoken");
              var param={
                refundId:this.$route.query.refundid
              }
              axios.get(url,{params:param}).then((res) => {
                console.log(res);
                if(res.data.statusCode==200&&res.data.status=='success'){
                    this.selectData=res.data.data.wuliuList;
                    this.selectWl=res.data.data.wuliuList[0].id;
                }else{
                  this.$toast({message:res.data.message,duration: 2000});
                }
              })
            },
          backSubmit:function(){
            var url=dataHostUrl + "/uc/app/s_10020/sporderrefund/saveWuliu?springraintoken="+local.get("springraintoken");
            var param={
              refundId:this.$route.query.refundid,
              expressId:this.selectWl,
              expressNo:this.$refs.backPriceInput.value
            }
            axios.get(url,{params:param}).then((res) => {
              console.log(res);
              if(res.data.statusCode==200&&res.data.status=='success'){
                this.$toast({message:"保存成功",duration: 2000});
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
  .section{
    font-size: .35rem;
    padding-top: 1rem;
  }
  .picker{
    margin-top: 10px;
    color: #959595;
    font-size: 14px;
    height: 20px;
    background-color: #F5F5F5;
    padding: 10px;
    border-radius: 5px;
  }
  .picker img{
    width: 20px;
    height: 10px;
    float: right;
    margin-top:5px;
  }
  .backPrice_input{
    background-color: #F5F5F5;
    border-radius: 8px;
    margin-top: .3rem;
    font-size: 14px;
    width: 100%;
    height: .8rem;
    padding: -3.5rem;
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
  .why,.backPrice{
    padding: 10px;
  }
  .selectWl{
    width: 100%;
    border:none;
    outline: none;
    height: .8rem;
    border-radius: 8px;
    margin-top: .2rem;
    background-color: #f5f5f5;
  }
</style>
