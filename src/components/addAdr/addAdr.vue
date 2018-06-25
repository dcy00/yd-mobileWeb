<template>
  <div class="content">
    <header-youde title="添加地址"></header-youde>
    <div class="section">
      <div class="split-line"></div>
      <div class="locationIcon" @click="chooseAddr">
        <img src="../zizhi/image/locationIcon.png" alt="">
        <span>{{provinces}}{{cityName}}{{districtName}}</span>
        <i class="icon iconfont iconRight">&#xe611;</i>
      </div>
      <div class="split-line"></div>
      <div class="addForm">
        <div class="address"><input type="text" ref="address" placeholder="请输入详细地址"></div>
        <div class="name"><input type="text" ref="name" placeholder="请输入收货人姓名"></div>
        <div class="phone"><input type="text" ref="phone" placeholder="请输入收货人手机号"></div>
        <div class="mr">
          <input id="mr" ref="default" type="checkbox">
          <label for="mr"></label>
          <span>设置为默认地址</span>
        </div>
      </div>
    </div>
    <mt-popup v-model="showdata" position="bottom" class="addressPop">
      <mt-picker class="addressPicker" :slots="slots" @change="onProvincesChange" value-key="name"></mt-picker>
      <mt-picker class="addressPicker" :slots="slots2" @change="onCityChange" value-key="name"></mt-picker>
      <mt-picker class="addressPicker" :slots="slots3" @change="onDistrictChange" value-key="name"></mt-picker>
    </mt-popup>
    <button class="subBtn" @click="subBtn">保存</button>
  </div>


</template>
<script>
  import {addAdrData} from '@/api/addAdrData';
  import HeaderYoude from '@/base/header-youde/header-youde';
  import axios from 'axios';
  import {dataHostUrl} from '@/api/config';
  import {getUid,local} from '@/common/js/util';
    export  default{
        name: '',
        data () {
            return {
              showdata:false,
              slots: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot1',
                  textAlign: 'center'
                }
              ],
              slots2: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot2',
                  textAlign: 'center'
                }
              ],
              slots3: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot3',
                  textAlign: 'center'
                }
              ],
              provinces:'',
              cityId:'',
              district:'',
              cityName:'',
              districtName:''
            }
        },
        created(){
          //获取数据
          this._getAddressData();
        },
        updated(){
          this.onCityChange();
        },
        methods: {
          chooseAddr:function(){
            this.showdata=(this.showdata==false?true:false);
          },
          _getAddressData:function(){
            addAdrData().then((res)=>{
              this.slots[0].values=res.data;
            })
          },
          onProvincesChange(picker, values) {
            this.provinces=values[0].name;
            this.cityId=values[0].id;
            this.onCityChange();
            this.onDistrictChange();
          },
          onCityChange(picker, values){
            var param={pid:this.cityId,level: 'city'};
            var url=dataHostUrl + "/f/xcx/s_10020/district/list";
            axios.get(url,{params:param}).then((res) => {
              this.slots2[0].values=res.data.data;
              this.district=values[0].id;
              this.cityName=values[0].name;
            })
            this.onDistrictChange();
          },
          onDistrictChange(picker, values){
            var url=dataHostUrl + "/f/xcx/s_10020/district/list";
            var param={pid:this.district,level: 'district'};
            axios.get(url,{params:param}).then((res) => {
              this.slots3[0].values=res.data.data;
              this.districtName=values[0].name;
            })
          },
          subBtn(){
            var defaultAdr;
            if(this.$refs.default.checked){defaultAdr=1}else{defaultAdr=0};
            var param={
              province:this.provinces,
              city:this.cityName,
              area:this.districtName,
              address:this.$refs.address.value,
              recivieName:this.$refs.name.value,
              mobile:this.$refs.phone.value,
              defaultAdr:defaultAdr
            };
            var url=dataHostUrl + "/uc/app/s_10020/saveMemberaddress?springraintoken="+local.get("springraintoken");
            axios.get(url,{params:param}).then((res) => {
              if(res.data.statusCode==200&&res.data.status=='success'){
                this.$toast({message:res.data.message,duration: 2000});
                setTimeout(() => {
                  this.$router.push('/address');
                }, 2000);
              }else{
                this.$toast({message:res.data.message,duration: 2000});
              }

            })
          }

        },
      components: {HeaderYoude},
    }
</script>
<style scoped>
.section{
  margin-top: 49px;
  font-size: .35px;
}
  .split-line{border-bottom:10px solid #f0f1f3;}
.location { height:40px;
  line-height:.7rem;
  position:relative;
  padding:10px;
  display:flex;
}
  .locationIcon img{
    width: .3rem;
  }
  .locationIcon{
    padding:7px;
  }
.locationIcon img,.locationIcon span{
  line-height: 40px;
}
.locationIcon span{
  vertical-align: 5px;
  font-size: .30rem;
}
  .iconRight{float: right;
    margin-top: 13px;}
  .address,.name,.phone{
    line-height: 40px;
    margin: 10px;
    border-bottom: 1px solid #DFDFDF;
  }
  .addForm input{
    width:100%;
    line-height: 40px;
    font-size: 0.3rem;
  }
  .addressPop{
    width:100%;
    height:200px;
  }
  .addressPicker{
    float: left;
    width:33.333%;
  }
.mr input[type="checkbox"] {
  width: 20px;
  height: 20px;
  opacity: 0;
}
.mr label {
  position: absolute;
  left: 15px;
  top: 0px;
  width: 20px;
  height: 20px;
  border-radius:30%;
  border: 1px solid #999;
}
.mr input:checked+label {
  background-color: #F55251;
  border: 1px solid #F55251;
}

.mr input:checked+label::after {
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
.mr{
  position: relative;
}
  .mr span{
    margin-left: 20px;
    vertical-align: 5px;
  }
.subBtn{
  display: block;
  margin: 0 auto;
  margin-top: .6rem;
  width: 5rem;
  height: .7rem;
  background-color: #528FCE;
  border: none;
  color: #ffffff;
  font-size: 0.35rem;
  border-radius: 5px;
  outline:none
}
</style>
