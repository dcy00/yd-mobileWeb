<template>
    <div class="content">
      <header-tab :title="title" :titleTab="false" :titleSet="true"></header-tab>
      <div class="section" v-if="addressData!=''">
          <div class="add-list" v-for="item in addressData">
              <div class="name-phone">
                <span>{{item.recivieName}}</span>
                <span class="phone">{{item.mobile}}</span>
              </div>
              <div class="address-detail">
                <span>
                  {{item.province}}{{item.city}}{{item.area}}{{item.address}}
                </span>
              </div>
              <div class="operation">
                  <span class="checked">
                    <input :id="item.id" type="radio" :checked="item.defaultAdr" name="userAgreement" :value="item.id" ref="address">
                    <label :for="item.id" ref="defoultId" :id="item.id" @click="defoult"></label>
                    <span class="default">设置为默认地址</span>
                    <button class="del" ref="item.id" :id="item.id" @click="del">删除</button>
                    <router-link :to="/editAddress/+item.id" class="edit" ref="edit" :id="item.id" >编辑</router-link>
                  </span>
              </div>
          </div>
      </div>
      <empty-data class="empty-data" v-if="addressData==''"></empty-data>
      <router-link to="/addAdr" class="add">新增地址</router-link>
    </div>
</template>
<script>
    import {getAddressData} from '@/api/address';
    import HeaderTab from '@/base/header-tab/header-tab';
    import EmptyData from '@/base/empty-data/empty-data';
    import {mapMutations} from 'vuex';
    import axios from 'axios';
    import {dataHostUrl} from '@/api/config';
    import {getUid,local} from '@/common/js/util';
    export  default{
        name: '',
        data () {
            return {
                title:['我的地址'],
                addressData:""
            }
        },
        created(){
          //获取数据
          this._getAddressBack();
          this.SET_Loading(true);
        },
        methods: {
          ...mapMutations({
            SET_Loading: 'SET_Loading'
          }),
          _getAddressBack:function(){
              getAddressData().then((res)=>{
                  if(res.statusCode=='200'&&res.status=="success"){
                      this.SET_Loading(false);
                      this.addressData=res.data;
                  }else{
                    this.$toast({message:res.message,duration: 2000});
                  }
              });
          },
          del:function(that){
              var url=dataHostUrl + "/uc/app/s_10020/deleteMemberAddress?springraintoken="+local.get("springraintoken");
              var param={
                  id:that.target.id
              }
            axios.get(url,{params:param}).then((res) => {
              if(res.data.statusCode==200&&res.data.status=='success'){
                this.$toast({message:res.data.message,duration: 2000});
                setTimeout(() => {this._getAddressBack()}, 2000);
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }
            })

          },
          defoult:function(that){
                var param={
                  id:that.srcElement.id
                }
              var url=dataHostUrl + "/uc/app/s_10020/setDefaultMemberAddress?springraintoken="+local.get("springraintoken");
              axios.get(url,{params:param}).then((res) => {
                if(res.data.statusCode==200&&res.data.status=='success'){
                  this.$toast({message:res.data.message,duration: 2000});
                }else{
                  this.$toast({message:res.data.message,duration: 2000});
                }
              })
          }
        },
        components: {HeaderTab,EmptyData},
    }
</script>
<style scoped>
.empty-data{
  top:42px !important;
}
.add{
  position: fixed;
  bottom:0px;
  width:100%;
  font-size:0.35rem;
  height:40px;
  line-height: 0.8rem;
  text-align: center;
  background-color:#528FCE ;
  color: #ffffff;
}
.section{
  margin-top: 40px;
  padding-bottom: 40px;
}
.add-list{
  font-size: 0.3rem;
}
  .name-phone,.address-detail{
    line-height: 0.7rem;
    padding:10px;
  }
  .name-phone span.phone{
    float:right;
  }
  .operation{
    height: .9rem;
    line-height: 0.9rem;
    background-color: #F8F8F8;
    border-bottom: 1px solid #E0E4E7;
  }
.operation span input[type="radio"] {
  width: 0.2rem;
  height: 0.2rem;
  opacity: 0;
}
.operation span label {
  position: absolute;
  left: 15px;
  top: -4px;
  width: 20px;
  height: 20px;
  border-radius:100%;
  border: 1px solid #C5C5C5;
}
.operation span input:checked+label {
  background-color: #4F80E6;
  border: 1px solid #4F80E6;
}

.operation span input:checked+label::after {
  position: absolute;
  content: "";
  width: 5px;
  height: 10px;
  top: 3px;
  left: 6px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg)
}
.operation span.checked{
  position: relative;
}
  .default{
    margin-left: 30px;
  }
  .del,.edit{
    float: right;
    margin: .24rem .24rem 0 .24rem;
    border: none;
    height: .5rem;
    color: #ffffff;
    border-radius: 8px;
    width: 1rem;
  }
  .del{
    background-color: red;
  }
  .edit{
    background-color: #528FCE;
    text-align: center;
    display: inline-block;
    font-size: 0.295rem;
    line-height: .5rem;
  }
</style>
