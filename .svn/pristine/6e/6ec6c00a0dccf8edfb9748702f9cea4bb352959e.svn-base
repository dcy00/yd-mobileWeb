<template>
  <div class="instructions-wrapper">
    <div v-if="imgInfo" v-html>
      {{imgInfo}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
        instructions:{
              type:Array
          },
        imgInfo:{
            type: String
        }
      },
    created (){
      this.instructionsTitle = ['药品名称', '规格', '成分', '用法用量', '功能', '不良反应', '禁忌', '相互作用', '注意事项', '批准文号', '生产企业', '外形', '保存方法', '禁用人群', '适用人群']
    },
    methods:{
      instruction(index){//说明书
        return this.instructionsTitle[index];
      },
    }
  }
</script>

<style scoped lang="scss">
  .instructions-wrapper {
    padding-left: 10px;
    background-color: #fff;
  }

  .instructions {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    display: -webkit-box;
    line-height: 16px;
    font-size: 12px;
    flex-direction: row;
    align-items: center;
  p {
    color: #676767;
  &.title {
     text-indent: 10px;
     width: 70px;
   }
  &.content {
     margin-right: 10px;
     flex: 1;
   }
  }
  }
</style>
