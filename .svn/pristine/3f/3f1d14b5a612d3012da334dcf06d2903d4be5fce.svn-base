<template>
  <div class="container-empty">
    <img class="logo" src="./aboutus.png"/>
    <p class="title">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
         title:{
             type:String,
             require:true
         }
      }
  }
</script>
<style scoped lang="scss">
  @import "~@/common/css/variable.scss";
  .container-empty{
    position: fixed;
    top: $header-height + 2rem;
    bottom: 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .logo{
    width: 60px;
    height: auto;
  }
  .title{
    margin-top: 10px;
    font-size: 13px;
    color: #ccc;
  }
</style>
