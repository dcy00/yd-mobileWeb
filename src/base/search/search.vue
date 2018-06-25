<template>
  <div class="search_box">
    <div class="wapSearch">
      <button type="submit" class="search_btn"></button>
      <input type="text" class="search_txt" v-on:focus="goToAndroid()" placeholder="请输入你要搜索的商品" id="keyword">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goToAndroid: function () {
        window.android.tosearch();
      }
    }
  }
</script>
<style scoped>
  .search_box {
    position: relative;
    padding: 6px 0;
  }
  .wapSearch {
    background-color: rgba(255,255,255,0.6);
    border-radius: 4px;
    padding: 0 35px;
    margin: 0;
    display: block;
  }
  .search_btn {
    border: 0;
    background: url("./search.png") no-repeat;
    background-size: 18px auto;
    width: 18px;
    height: 18px;
    left: 10px;
    position: absolute;
    top: 50%;
    margin-top: -9px;
  }
  .search_txt {
    border: 0;
    width: 100%;
    background: 0;
    padding: 5px 0;
    height: 26px;
    font-size: 13px;
    display: inline-block;
    text-align: left;
  }
  .search_txt::placeholder{
    color: #393a3a;
  }
</style>
