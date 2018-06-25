<template>
    <div class="container">
        <header-youde :title="title"></header-youde>
        <div class="commentWrapper">
          <dl>
            <dt><img :src="data.goodsThumbnail" alt=""></dt>
            <dd>
              <p>{{data.goodsTitle}}</p>
              <p>{{data.goodsSpecValue}}</p>
              <p>￥{{data.goodsPrice/100}}</p>
            </dd>
          </dl>

          <p class="commentCont"><span>原评价：</span>{{data.commentContent}}</p>

          <div class="textAreaBox">
            <textarea placeholder="请输入..." v-model="message"></textarea>
          </div>

          <div class="uploadImgWrap overflow">
            <div class='uploadImgBtnBox'>
              <div class="upLoad">
                <label class="addBtn">
                  <input type="file" :accept="typeArr" @change="upload($event)">
                </label>
              </div>

            </div>
            <div class='viewImgItem' v-for="imgItem in uploadImgs" v-if="uploadImgs.length>0">
              <em class='closeBtn' @click="delImg(index)"></em>
              <img :src='imgItem'/>
            </div>
          </div>
        </div>
        <div class="fixedBtm">
          <div class="fixedBtmRight" @click="submitComment">追加评论</div>
        </div>
    </div>
</template>

<script>
    import headerYoude from '@/base/header-youde/header-youde';
    import { mapMutations } from 'vuex';
    import { Toast } from 'mint-ui';
    import { getData,timestamp,againCommentUpdate } from '@/api/againComment';
    export default {
      data(){
          return {
              title:'追加评论',
              id:'',
              message:'',
              data:{},
              uploadImgs:[],
              typeArr:'image/png,image/jpg,image/jpeg',
              client  : '',
              fileSize: 150000,
              imgHost: 'https://pic.youde.com',
          }
      },
      created(){
          //console.log(this.$route.params);
          this.id = this.$route.params.id;
          this._getData();

          this.client = new OSS.Wrapper({
            region         : 'oss-cn-beijing',
            /*secure         : true,*/
            accessKeyId    : 'LTAIFFHZbNAqm2A3',
            /*这两者到阿里云控制台获得*/
            accessKeySecret: 'tE08xduIeLTzKBHSn9XkhTT90ZFkjm',
            bucket         : 'youde-online' /*装图片的桶名*/
          });
      },
      methods:{
        //获取商品信息
        _getData(){
          let param = {
              id:this.id
          };
          getData(param).then((res)=>{
              //console.log(res);
              if(res.status==='success'){
                  this.data = res.data;
              }else{
                  this._toast(res.message);
              }
          });
        },
        /**上传图片**/
        upload(event){
          let file = event.target.files[0];
          let type    = file.name.split('.')[1];
          let storeAs = 'upload-file/h5/againComment/'+ timestamp() + '.' + type;
          let boolean = true;
          let uploadArr = this.uploadImgs;
          if (file.size > this.fileSize) {
            this._toast('亲,图片不能超过!' + this.fileSize / 1000 + 'kb');
            return false;
          }
          if (this.typeArr && this.typeArr.indexOf(type) > 0) {
            boolean = false;
          }
          if (boolean) {
            this._toast('上传图片格式不支持!请选择' + this.typeArr);
            return false;
          }

          this.client.multipartUpload(storeAs, file).then(function (result) {

            uploadArr.push(result.res.requestUrls[0]);

          }).catch(function (err) {
            console.log(err);
          });

        },
        //图片移除
        delImg(imgIndex){
            let uploadImgs = this.uploadImgs;
            uploadImgs.splice(imgIndex,1);
        },
        //追加评论
        submitComment(){
            let params={
              id:this.id,
              ext:this.data.ext,
              reCommentContent:this.message,
              rePictureUrl:this.uploadImgs.toString(),
            };
            //console.log(this.uploadImgs);
            console.log(params);
            againCommentUpdate(params).then((res)=>{
                if(res.status==='success'){
                    this._toast(res.message);
                    setTimeout(()=>{
                        this.$router.push('/myComment')
                    })
                }else{
                    this._toast(res.message);
                }
            })

        },
        _toast(msg){
            let tip = Toast(msg);
            setTimeout(()=>{
                tip.close();
            },1500);
        },
        ...mapMutations({
          SET_Loading: 'SET_Loading'
        })
      },
      components:{
          headerYoude
      },
      deactivated(){
        this.$destroy()
      }
    }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  @import "~@/common/css/mixin.scss";
  .fl{float:left;}
  .fr{float:right;}
  .overflow{overflow:hidden;}
  .red{color:#FF5D5D;}
  .color-gray{color:#8a8a8a;}
  .relative{position:relative;}
  .commentWrapper{
    padding:$header-height+0.24rem 0.24rem 1.3rem;
    font-size:0.28rem;
  }

  dl{overflow:hidden;}
  dt{
    float:left;
    width:1.56rem;
    height:1.56rem;
    overflow:hidden;
    img{
      display:block;
      width:100%;
    }
  }
  dd{
    width:4.9rem;
    height:1.16rem;
    background:#f5f5f5;
    padding:0.2rem;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    float:right;
    font-size:0.26rem;
    p{line-height:140%;}
    p:nth-of-type(1){color:#333};
    p:nth-of-type(2){color:#999;}
    p:last-child{color:#666;}
  }
  .commentCont{padding:0.2rem 0;}
  .textAreaBox{
    display:block;
    width:100%;
    height:1.75rem;
    float:right;
    textarea{
      display:block;
      width:6.75rem;
      height:1.5rem;
      background:#fff;
      font-size:0.26rem;
      color:#333;
      padding:0.1rem;
      border:1px solid #dedede;
      font-family:'Arial';
      outline:none;
    }
  }
  .viewImgItem{
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    width:1.26rem;
    height:1.26rem;
    float:left;
    margin:0.08rem;
    overflow:hidden;
    position:relative;
    img{
      display:block;
      width:100%;
      height:100%;
      position:absolute;
      top:50%;
      left:50%;
      -webkit-transform:translate(-50%,-50%);
      -moz-transform:translate(-50%,-50%);
      transform:translate(-50%,-50%);
      border:none;
    }
  }
  .uploadImgWrap{
    width:100%;
    padding:0.24rem 0;
    //border-bottom:1px solid #ddd;
  }
  .borderBtm{border-bottom:1px solid $cart-border-color;}
  .uploadImgBtnBox{
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    width:1.26rem;
    height:1.26rem;
    margin:0.08rem;
    float:left;
    border:2px dashed #dbdbdb;
    position:relative;
  }
  .uploadImgBtn{
    width:1rem;
    height:1rem;
    border:2px dashed #ddd;
    box-sizing: border-box;
    position:relative;
    &:before,&:after{
      display:block;
      content:'';
      overflow:hidden;
      position:absolute;
      top:50%;
      left:50%;
      background:#ddd;
    }
    &:before{
      width:2px;
      height:0.6rem;
      margin:-0.3rem 0 0 -1px;
    }
    &:after{
      width:0.6rem;
      height:2px;
      margin:-1px 0 0 -0.3rem;
    }
  }
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
  .closeBtn{
    position:absolute;
    top:0;
    right:0;
    width:0.38rem;
    height:0.38rem;
    background:#fa5548;
    color:#fff;
    border-radius:50%;
    transform:rotate(45deg);
    z-index:2;
    &:before,&:after{
      display:block;
      content:'';
      overflow:hidden;
      position:absolute;
      top:50%;
      left:50%;
      background:#fff;
    }
    &:before{
      width:2px;
      height:10px;
      margin:-5px 0 0 -1px;
    }
    &:after{
      width:10px;
      height:2px;
      margin:-1px 0 0 -5px;
    }
  }
  .fixedBtm{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    border-top:1px solid #e6e7e8;
    background:#fff;
    .fixedBtmLeft{
      float:left;
      width:3rem;
      height:1rem;
      line-height:1rem;
      font-size:0.3rem;
      padding-left:0.2rem;
      input:checked+label{
        &:before{border-color:#FF5D5D;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.2);}
        &:after{display:block;}
      }
      label{
        position:relative;
        padding-left:0.6rem;
        &:before,&:after{display:block;content:'';position:absolute;transition: 0.5s;}
        &:before{
          width:0.38rem;
          height:0.38rem;
          border:1px solid #ccc;
          @include border-radius(3px);
          background-clip: content-box;
          top:0;
          left:0;
        }
        &:after{
          display:none;
          width:0.12rem;
          height:0.24rem;
          border-right:2px solid #FF5D5D;
          border-bottom:2px solid #FF5D5D;
          top:0.04rem;
          left:0.12rem;
          @include transform-rotate(30deg);
        }
      }
    }
    .fixedBtmRight{
      display:inline-block;
      width:2.4rem;
      height:1rem;
      text-align:center;
      line-height:1rem;
      color:#fff;
      font-size:0.36rem;
      background:linear-gradient(150deg,rgba(55,150,208,0.9),#36c);
      float:right;
    }
  }
</style>
