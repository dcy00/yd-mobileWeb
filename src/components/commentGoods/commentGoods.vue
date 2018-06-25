<template>
    <div class="container">
        <header-youde :title="title"></header-youde>
        <div class="commentWrapper">
          <template v-for="(item,index) in orderInfoList">
          <div class="commentForm overflow">
            <div class="imgBox"><img :src="item.pictureUrl" alt="" :class="{'noImg':!item.pictureUrl}"></div>
            <div class="textAreaBox">
              <textarea placeholder="请输入..." v-model="item.message"></textarea>
            </div>
          </div>
          <div class="uploadImgWrap overflow">
            <div class='uploadImgBtnBox' :data-index="index">
              <div class="upLoad">
                <label class="addBtn">
                  <input type="file" :accept="typeArr" @change="upload($event,index)">
                </label>
              </div>

            </div>
            <div class='viewImgItem' v-for="(imgItem,imgIndex) in item.uploadImgs" v-if="item.uploadImgs.length>0">
              <em class='closeBtn' @click="delImg(index,imgIndex)"></em>
              <img :src='imgItem'/>
            </div>
          </div>
          <ul>
            <li class="borderBtm">
              <span>商品评分</span>
              <div class="starBox" @click="changeGoodsStar(index)">
                <div class="activeStar">
                  <i class="icon iconfont icon-star-full" v-for="star in item.goodsStar"></i>
                </div>
                <div class="grayStar">
                  <i class="icon iconfont icon-star-full" v-for="star in length"></i>
                </div>
              </div>
            </li>
          </ul>
          </template>
          <ul>
            <li>
              <span>服务评分</span>
              <div class="starBox" @click="changeServeStar">
                <div class="activeStar">
                  <i class="icon iconfont icon-star-full" v-for="star in serveStar"></i>
                </div>
                <div class="grayStar">
                  <i class="icon iconfont icon-star-full" v-for="star in length"></i>
                </div>
              </div>
            </li>
            <li>
              <span>发货速度</span>
              <div class="starBox" @click="changeShippingStar" ref="starBox">
                <div class="activeStar">
                  <i class="icon iconfont icon-star-full" v-for="star in shippingStar"></i>
                </div>
                <div class="grayStar">
                  <i class="icon iconfont icon-star-full" v-for="star in length"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="fixedBtm">
          <div class="fixedBtmLeft">
            <input id="check" type="checkbox" ref="checkBox"/>
            <label for="check">匿名评价</label>
          </div>
          <div class="fixedBtmRight" @click="submitComment">发表评价</div>
        </div>
    </div>
</template>

<script>
    import headerYoude from '@/base/header-youde/header-youde';
    import { mapMutations } from 'vuex';
    import { Toast } from 'mint-ui';
    import { getData,timestamp,commentUpdate } from '@/api/commentGoods';
    export default {
      data(){
          return {
              title:'发表评论',
              orderId:'',
              mainId:'',
              serveStar:0,
              shippingStar:0,
              length:5,
              orderInfoList:[],
              uploadImgs:[],
              typeArr:'image/png,image/jpg,image/jpeg',
              client  : '',
              fileSize: 150000,
          }
      },
      created(){
          //console.log(this.$route.params);
          this.orderId = this.$route.params.oId;
          this.mainId = this.$route.params.mId;
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
              orderId:this.orderId,
              orderMainId:this.mainId
          };
          getData(param).then((res)=>{
              //console.log(res);
              if(res.status==='success'){
                //this.data = res.data;
                let orderInfoList = res.data.orderInfoList;
                for(let i=0;i<orderInfoList.length;i++){
                    orderInfoList[i].goodsStar = 0;
                    orderInfoList[i].message = '';
                    orderInfoList[i].uploadImgs=[];
                }
                this.orderInfoList = orderInfoList;
              }else{
                  this._toast(res.message);
              }
          });
        },
        //商品评分
        changeGoodsStar(index){
            let initList = this.orderInfoList;
            initList[index].goodsStar = this._changeStar();
            this.orderInfoList = initList;
        },
        //服务评分
        changeServeStar(){
            this.serveStar = this._changeStar();
        },
        //发货速度评分
        changeShippingStar(){
          this.shippingStar = this._changeStar();
        },
        //五星评分
        _changeStar(){
          let ev = event || window.event;
          let starBoxWidth = this.$refs.starBox.clientWidth;
          let offsetX = ev.offsetX;
          let scale = offsetX/starBoxWidth;

          let len = 0;
          if(scale>0 && scale<=0.2){
              len = 1;
          }else if(scale>=0.2 && scale<0.4){
              len = 2;
          }else if(scale>=0.4 && scale<0.6){
              len = 3;
          }else if(scale>=0.6 && scale<0.8){
              len = 4;
          }else if(scale>=0.8 && scale<1){
              len = 5;
          }
          return len;
        },
        /**上传图片**/
        upload(event,index){
          //console.log(index);
          let file = event.target.files[0];
          let type    = file.name.split('.')[1];
          let storeAs = 'upload-file/h5/comment/'+ timestamp() + '.' + type;
          let boolean = true;
          let currentIndex = parseInt(index);
          let initList = this.orderInfoList;
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

            let returnUrl = result.url.split('.com')[1];
            let transformUrl = "https://pic.youde.com"+returnUrl;
            //console.log(transformUrl);
            initList[currentIndex].uploadImgs.push(transformUrl);

          }).catch(function (err) {
            console.log(err);
          });

        },
        //图片移除
        delImg(gIndex,imgIndex){
            let initList = this.orderInfoList;
            let currentGoods = initList[gIndex].uploadImgs;
            currentGoods.splice(imgIndex,1);
        },
        //发表评论
        submitComment(){
            let params={
              servegrade:this.serveStar,
              respograde:this.shippingStar,
              orderId:this.orderId,
              anonymous:'',
              commentJsonString:''
            };
            let commentArr = [];
            let orderInfoList = this.orderInfoList;
            let checkBox = this.$refs.checkBox;

            if(checkBox.checked){
                params.anonymous = 1;
            }else{
                params.anonymous = 0;
            }

            for(let i=0;i<orderInfoList.length;i++){
                commentArr.push({
                  businessId:orderInfoList[i].goodsId,
                  commentContent:orderInfoList[i].message,
                  pictureUrl:orderInfoList[i].uploadImgs.toString(),
                  descgrade:orderInfoList[i].goodsStar
                })
            }
            params.commentJsonString = JSON.stringify(commentArr);
            //console.log(params);
            commentUpdate(params).then((res)=>{
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
    li{
      width:100%;
      height:0.6rem;
      line-height:0.6rem;
      padding:0.1rem 0;
      overflow:hidden;
      span{float:left;}
      .starBox{
        float:right;
        width:2.5rem;
        position:relative;
        i{margin:0 0.05rem;font-size:0.4rem;}
        .activeStar,.grayStar{position:absolute;text-align:right;}
        .grayStar{
          color:#eee;
        }
        .activeStar{
          color:#FF5D5D;
          z-index:2;
        }
      }
    }
  }
  .commentForm{margin-top:0.24rem;}
  .imgBox{
    display:block;
    width:1.75rem;
    height:1.75rem;
    overflow:hidden;
    float:left;
    img{
      display:block;
      width:100%;
      height:100%;
      &.noImg{
        background:#f5f5f5;
        position:relative;
        &:before{
          display:block;
          width:100%;
          height:40px;
          line-height:40px;
          content:'暂无图片';
          text-align:center;
          font-size:0.24rem;
          color:#999;
          position:absolute;
          top:50%;
          left:0;
          margin-top:-20px;
        }
      }
    }
  }
  .textAreaBox{
    display:block;
    width:5.1rem;
    height:1.75rem;
    float:right;
    textarea{
      display:block;
      width:4.8rem;
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
