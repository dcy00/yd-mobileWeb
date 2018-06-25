<template>
  <div class="wrapper">
    <div class="top">
      <div class="left">
        <div v-if="comment.commentUserHeadImg!=undefined" class="img-face"><img :src="comment.commentUserHeadImg"/>
        </div>
        <div v-else class="img-face"><img src="./face.png"/></div>
        <span>{{comment.commentAccount}}</span>
      </div>
      <div class="right">
        <star :score="comment.avgGrade"></star>
      </div>
    </div>
    <div class="img-wrapper"  v-if="comment.pictureList!=undefined">
      <img v-for="img in comment.pictureList" class="comment-img" :src="img"/>
    </div>
    <p class="content">{{comment.commentContent}}</p>
    <p class="time">{{comment.createTime}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/base/star/star'
  export default {
    props: {
      comment: {
        type: Object,
        required: true
      }
    },
    components: {Star},
  }
</script>

<style scoped lang="scss">
  .wrapper {
    overflow: hidden;
    border-bottom: 1px solid #eee;
    padding: 12px;
    background-color: #fff;
    color: #676767;
    .top {
      height: 36px;
      line-height: 36px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .left {
        display: flex;
        font-size: 12px;
        .img-face {
          img {
            width: 36px;
            height: 36px;
            margin-right: 6px;
            border-radius: 50%;
          }
        }
        span {
          display: inline-block;
          width: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }
    }
    .content, .time {
      padding-left: 2px;
    }
    .content {
      line-height: 18px;
      font-size: 14px;
      margin-top: 6px;
    }
    .time {
      color: #999;
      font-size: 12px;
      margin-top: 6px;
    }
  }
  .img-wrapper{
    display: flex;
    align-items: center;
    height: 1.3rem;
    img{
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 10px;
    }
  }
</style>
