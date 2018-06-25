<template>
  <div>
    <search :jump="false" @onsearch="onSearch" @searchPrompt="getSearchPrompt"></search>
    <div class="container">
      <div class="search" v-show="hotList.length > 0">
        <div class="search-hot">
          <h3>热门搜索</h3>
          <ul class="search-list clearfix">
            <li class="item" v-for="item in hotList" @click="onSearch(item.content)">{{item.content}}</li>
          </ul>
        </div>
      </div>
      <div class="search" v-show="history.length > 0">
        <div class="search-hot">
          <h3>搜索历史</h3>
          <ul class="search-list clearfix">
            <li class="item" v-for="item in history" @click="onSearch(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-prompt" v-show="promptList.length > 0">
      <ul>
        <li v-for="item in promptList" @click="onSearch(item.title)"><span
          class="icon iconfont icon-search"></span>{{item.title}}
        </li>
      </ul>
      <div class="close-prompt" @click="hidePrompt"><span>关闭</span></div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import Search from '@/base/search/index';
  import {getSearchPrompt, getSearchHot} from '@/api/search';
  import {local} from '@/common/js/util'
  export default {
    data(){
      return {
        promptList: [],
        hotList: [],
        history: []
      }
    },
    components: {Search},
    created(){
      this._getSearchHot();
      this.setHistory();
    },
    methods: {
      //热门搜索
      _getSearchHot(){
        getSearchHot().then((res) => {
          if (res.data.length > 0) {
            this.hotList = res.data;
          }
        })
      },
      //搜索提示
      getSearchPrompt(words){
        getSearchPrompt(words).then((res) => {
          if (res.data.length > 0) {
            this.promptList = res.data;
          }
        })
      },
      setHistory(){
        let historyList = local.get('searchHistory');
        if (historyList !== '' && historyList !== undefined) {
          let history = historyList.split(',');
          if(history.length >12){
              this.history = history.filter((val,index)=>{
                  return index<12;
              });
            local.save('searchHistory',this.history.join(','));
          }else {
              this.history = history
          }
        }
      },
      onSearch(keywords) {
        if (local.get('searchHistory') === '' || local.get('searchHistory') === undefined) {
          local.save('searchHistory', keywords);
          this.setHistory();
        } else {
            if(this.history.indexOf(keywords) === -1){
              local.save('searchHistory', keywords + ',' + local.get('searchHistory'));
              this.setHistory();
            }
        }
        this.hidePrompt();
        this.$router.replace({path: 'searchList', query: {keywords: keywords}})
      },
      hidePrompt(){
          this.promptList = []
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/css/variable.scss";

  .container {
    padding-bottom: 30px;
    .search-hot {
      margin-left: 10px;
      h3 {
        margin-top: 30px;
        padding-bottom: 10px;
        border-bottom: 1px solid #fff;
        font-size: 0.46rem;
        color: #8c8c8d;
      }
      .search-list {
        li {
          font-size: 0.3rem;
          float: left;
          padding: 2px 0.4rem;
          margin-top: 10px;
          margin-right: 12px;
          height: 28px;
          line-height: 28px;
          background: #e6e9ef;
          border-radius: 6px;
          min-width: 60px;
          max-width: 6rem;
          text-align: center;
          color: #8c8c8d;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .search-prompt {
    position: fixed;
    top: $header-height;
    width: 100%;
    background-color: #fff;
    bottom: 50%;
    z-index: 10;
    ul{
      position: absolute;
      top: 0px;
      bottom: 50px;
      width: 100%;
      overflow: scroll;
    }
    li {
      padding: 0 10px;
      line-height: 44px;
      font-size: 14px;
      border-bottom: 1px solid #e6e6e6;
      height: 44px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .icon {
        font-size: 18px;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .close-prompt{
      width: 100%;
      position: absolute;
      bottom: 0px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      border-bottom: 1px solid #e6e6e6;
      font-size: 15px;
      background-color: #f2f2f2;
    }
  }
</style>
