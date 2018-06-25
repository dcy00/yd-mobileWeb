<template>
  <div class="btn-big" @click="submitData" :style="{background: color}">{{title}}</div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
          title:{
              default:"确定"
          },
        color: {
           default:'#ff5d5d'
        }
      },
    methods:{
      submitData(){
          this.$emit("submitData")
      }
    }
  }
</script>

<style scoped>
  .btn-big{
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
  }
</style>
