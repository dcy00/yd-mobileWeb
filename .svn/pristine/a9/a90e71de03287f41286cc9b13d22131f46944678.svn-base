<template>
  <div id="app">

      <router-view/>

    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import Loading from '@/base/loading/loading'
  import {mapMutations} from 'vuex';
  import {local} from '@/common/js/util'
  export default {
    name: 'App',
    components: {Loading},
    computed: {
      loading() {
        return this.$store.getters.loading;
      }
    },
    created(){
      let cartNumber = local.get('cartNum');
     if(cartNumber === undefined || cartNumber === '') {
         cartNumber = 0;
     }
      this.SET_CART_NUM(cartNumber);
    },
    methods: {
      ...mapMutations({
        SET_CART_NUM: 'SET_CART_NUM'
      })
    }
  }
</script>

