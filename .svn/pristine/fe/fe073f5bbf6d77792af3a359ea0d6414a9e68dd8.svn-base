<template>
  <div class="search-wrapper">
    <div class="input-wrapper">
      <span class="icon iconfont icon-search"></span>
      <span class="icon iconfont icon-close-b"  v-show="isFocus && words!==''" @click="clearWords"></span>
      <input placeholder="搜索商品" @focus="doFocus" v-model="words" ref="input"   @keyup="changeUp(2,$event)"  @keydown.13="clickSubmit()"/>
    </div>
    <div class="button-wrapper" v-show="isFocus">
      <a v-if="words!==''" class="search-btn" @click="clickSubmit">搜索</a>
      <a v-else="" class="search-btn cancel-btn" @click="cancelSubmit">取消</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      jump: {
        type: Boolean,
        default:true
      },
      keywords: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        words: this.keywords,
        isFocus: false,
        back: false
      }
    },
    mounted(){
      //this.words = this.keywords;
      if(!this.jump) {
          this.$refs.input.focus();
          this.words = ''
      }
    },
    methods: {
      doFocus() {
          if(this.jump){
              this.$router.push('/search')
          }
          this.isFocus = true;
      },
      clickSubmit(){
          if(!this.jump && this.words.trim() !== ''){
              this.$emit('onsearch',this.words.trim());
          }
      },
      cancelSubmit(){

          this.back&&this.$router.back();
      },
      clearWords(){//清空words
          this.words = ''
      },
      changeUp(type,e){
          let words = this.words;
          if(e.target.value === this.words){
            setTimeout(()=>{
                if(this.words === words && this.words.trim() !== ''){
                    this.$emit('searchPrompt',this.words.trim());
                }
            },300)
          }
      }
    },
    watch:{
        keywords(newVal) {
          this.words = newVal;
        },
        $route(to,from){
            if(from.path){
                this.back = true;
            }
        }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  .search-wrapper {
    font-size: 0;
    display: flex;
    flex-direction: row;
    height: $header-height;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 10px;
    background-color: #fff;
    .input-wrapper {
      height: 0.58rem;
      border-radius: 0.26rem;
      flex: 1;
      position: relative;
      margin-right: 10px;
      background-color: #e4e5e7;
      .icon-search,.icon-close-b{
        display: block;
        position: absolute;
        font-size: 0.4rem;
        color: #bbb;
        top: 50%;
        transform: translate(0,-49%);
        z-index: 10;
        &.icon-search{
          left: 0.1rem;
        }
        &.icon-close-b{
          right: 0.2rem;
          color: #aaa;
        }
      }
      input {
        display: block;
        height: 0.58rem;
        text-indent: 0.5rem;
        box-sizing: border-box;
        border-radius: 0.26rem;
        line-height: 0.4rem;
        padding: 0.09rem 0;
        width: 100%;
        color:#444;
        background-color: #e4e5e7;
      }
    }
    .button-wrapper{
      text-align: center;
      display: flex;
      align-items: center;
      .search-btn{
        color: #377dcc;
        font-size: 0.28rem;
        &.cancel-btn{
          color: #333;
        }
      }
    }
  }
</style>
