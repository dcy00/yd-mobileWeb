<template>
  <div class="count-down"  :class="{'is-red': !isBlack}">
    <span class="title">{{countDownTitle}}</span>
    <div class="time-wrapper" >
      <div class="time-box">
        <span style="width:18px">{{day}} </span>天
      </div>
      <div class="time-box">
        <span style="width:18px">{{hour}}</span>:
      </div>
      <div class="time-box">
        <span style="width:18px">{{minute}}</span>:
      </div>
      <div class="time-box">
        <span style="width:18px">{{second}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      countDownTitle: {
        type: String,
        default: "距结束"
      },
      isTime: { //是否为时间戳
        type: Boolean,
        default: true
      },
      isBlack: { //是否为黑色
        type: Boolean,
        default: true
      },
      endTime: {
        type: String,
        default: 0
      },
      startTime: {
        type: String,
        default: 0
      }
    },
    data(){
      return {
        times: null,
        isInit: false,
      }
    },
    mounted(){
      console.log(this.endTime)
      this.countDownInterval()
    },
    computed: {
      second(){
        return this.times ? this.checkTime(Math.floor(this.times % 60)) : '00';
      },
      minute(){
        return this.times ? this.checkTime(Math.floor((this.times / 60) % 60)) : '00';
      },
      hour(){
        return this.times ? this.checkTime(Math.floor(this.times / 3600) % 24) : '00';
      },
      day(){
        return this.times ? this.checkTime(Math.floor(this.times / 86400)) : '00';
      }
    },
    mounted(){
      this.countDownInterval()
    },
    methods: {
      checkTime(i){
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
      countDownInterval(){
        if (this.isTime) {
          this.times = this.endTime - this.startTime; //时间形式为"1403058804)"时间戳
        } else {
          this.times = (Date.parse(this.endTime.replace(/-/g,'/')) - Date.parse(this.startTime.replace(/-/g,'/'))) / 1000; //时间形式为:"2018-03-04 09:10:15";
        }
        let Timer = setInterval(() => {
          this.times = this.times - 1;
          if (this.times === 0) {
            clearInterval(Timer);
          }
        }, 1000);

      }
    }
  }
</script>
<style scoped>
  .count-down {
    padding: 5px 0;
    color: #666;
    font-size: 13px !important;
    display: flex;
    flex-direction: row;
    line-height: 20px;
    align-items: center;
  }
  .time-wrapper{
    display: flex;
  }
  .count-down h3 {
    font-size: 15px;
    display: inline-block;
    margin: 0 26px 0 14px;

  }

  .title {
    display: inline-block;
    margin-right: 6px;
  }

  .time-box {
    display: block;
  }

  .time-box span {
    display: inline-block;
    text-align: center;
    margin: 0 3px;
    background: #535353;
    letter-spacing: 1px;
    color: #fff;
    border: none;
    padding: 0 2px;
    border-radius: 3px;
  }

  time-box {
    margin-left: 4px;
  }
  .is-red{
    flex-direction: column;
  }
  .is-red .time-box span{
    background: #ff5d5d !important;
  }
</style>
