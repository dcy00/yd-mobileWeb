<template>
  <div class="upLoad">
    <label for="file" class="addBtn">
      <input type="file" id="file" :accept="typeArr" @change="upload($event)">
    </label>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  export default {
    props     : ['typeArr', 'size','type'],
    data(){
      return {
        client  : '',
        fileSize: 500000,
        imgHost: 'https://pic.youde.com'
      }
    },
    created(){
      this.client = new OSS.Wrapper({
        region         : 'oss-cn-beijing',
        secure         : true,
        accessKeyId    : 'LTAIFFHZbNAqm2A3',
        /*这两者到阿里云控制台获得*/
        accessKeySecret: 'tE08xduIeLTzKBHSn9XkhTT90ZFkjm',
        bucket         : 'youde-online' /*装图片的桶名*/
      });
    }, methods: {
      /**上传图片**/
      upload(event){
        var self = this;
        var file = event.target.files[0];
        var type    = file.name.split('.')[1];
        var storeAs = 'upload-file/h5/'+this.timestamp() + '.' + type;
        var returnObj = {
            type:'',
            url:''
        };
        this.client.multipartUpload(storeAs, file).then(function (result) {
          let returnUrlStr = result.url.split('com')[1];
          let transformUrl = self.imgHost+returnUrlStr;
          if(self.type==='license'){
            returnObj.type='license';
            returnObj.url = transformUrl;
          }else{
            returnObj.type='certificates';
            returnObj.url = transformUrl;
          }

          self.$emit('childEmit',returnObj);

        }).catch(function (err) {
          setTimeout(function(){ alert("图片过大"); }, 3000);
        });

      },
      add0(m){
        return m<10?'0'+m : m;
      },
      timestamp(){
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return ""+y+this.add0(m)+this.add0(d)+this.add0(h)+this.add0(mm)+this.add0(s);
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "~@/common/css/mixin.scss";
  .upLoad{
    display:block;
    width:2rem;
    height:1rem;
    position:absolute;
    top:0.2rem;
    left:50%;
    margin:0 0 0 -1rem;
    overflow:hidden;
  }
  .addBtn{
    display:block;
    width:2rem;
    height:1rem;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    @include border-radius(3px);
    /*position:absolute;
    top:0.2rem;
    left:50%;
    margin:0 0 0 -1rem;*/
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

</style>
