<template>
  <header class="gHeader clearfix">
    <div class="f_logo" @click="back" v-if="hasBack">
      <i class="icon iconfont icon-back"></i>
    </div>
    <div class="search-wrapper"  v-if="search">
      <search :keywords="keywords"></search>
    </div>

    <div v-else class="search-box"><h2>{{title}}</h2></div>
    <div class="editContainer" @click="editHandle" v-if="edit">
      <span :class="{'edit': !isDelete}" v-if="!isDelete"></span>
      <span v-else>完成</span>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import Search from './../search'
  export default {
    props: {
      title: {
        type: String,
        default: "分类"
      },
      emitListen: {
        type: Boolean,
        default: false
      },
      search: {
        type: Boolean,
        default: false
      },
      keywords: {
        type: String,
        default: ''
      },
      edit: {
        type: Boolean,
        default: false
      },
      hasBack: {
        type: Boolean,
        default: true
      }
    },
    data(){
        return {
          isDelete:false
        }
    },
    components: {Search},
    methods: {
      back()  {
        if (this.emitListen) { //弹出层关闭弹出层
          this.$emit('emitClick');
          return false;
        }
        this.$router.back();
      },
      editHandle(){
        this.isDelete = !this.isDelete;
        this.$emit('editHandle',this.isDelete)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "~@/common/css/variable.scss";

  .gHeader {
    position: fixed;
    width: 100%;
    height: $header-height;
    padding-top: $color-fix-padding;
    line-height: 1.5;
    top: 0;
    left: 0;
    z-index: 100;
    margin: auto;
    right: 0;
    background: #fff;
    border-bottom: 1px solid #e7e7e7;
    .search-wrapper{
      margin-left: 0.48rem;
    }
    .search-box {
      margin: 0 0.48rem;
      text-align: center;
      line-height: $header-height;
      color: #585959;
      h2 {
        font-size: 0.35rem;
      }
    }
    .f_logo {
      box-sizing: border-box;
      width: 0.4rem;
      height: $header-height;
      position: absolute;
      left: 10px;
      text-align: center;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 0.4rem;
        color: #585959;
        font-weight: bold;
      }
    }

  }
  .editContainer{
    position:absolute;
    top:0;
    right:0.24rem;
    height:0.46rem;
    line-height:0.46rem;
    padding:0.25rem 0;
    text-align:right;
    font-size:0.28rem;
    .edit{
      display:block;
      width:0.46rem;
      height:0.46rem;
      background:url('./editIcon.png') no-repeat;
      background-size:0.46rem 0.46rem;
    }
  }
</style>
