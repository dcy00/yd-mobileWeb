<template>
  <div class="floor bottom-bar-pannel" style="display: block;font-size: 16px;">
    <div class="floor-container">
      <ul class="tab4">
        <router-link to="/" tag="li">
          <span class="bar-img">
            <i class="icon iconfont icon-home2" :class="{'active':isHome}"></i>
          </span>
          <span class="cart-index" :class="{'active':isHome}">首页</span>
        </router-link>
        <router-link to="/category" tag="li">
          <span class="bar-img">
            <i class="icon iconfont icon-fenlei" :class="{'active':isCategory}"></i>
          </span>
          <span class="cart-index" :class="{'active':isCategory}">分类</span>
        </router-link>
        <router-link to="/cart" tag="li">
          <span class="bar-img relative">
            <em class="shopcar_num">{{cartNumber}}</em>
            <i class="icon iconfont icon-add_cart" :class="{'active':isCart}"></i>
          </span>
          <span class="cart-index" :class="{'active':isCart}">购物车</span>
        </router-link>
        <router-link to="/perCenter" tag="li">
          <span class="bar-img">
            <i class="icon iconfont icon-home1" :class="{'active':isMy}"></i>
          </span>
          <span class="cart-index" :class="{'active':isMy}">我的</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapGetters,mapActions } from 'vuex';
  export default {
    name: "tabbar",
    data(){
        return {
            isHome:false,
            isCategory:false,
            isCart:false,
            isMy:false
        }
    },
    created(){
        this._getCurrent();
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'cartNumber'
      ])
    },
    methods: {
      _getCurrent(){
        let pathname = this.$route.path;

        switch(pathname){
          case '/':
              this.isHome = true;
              break;
          case '/category':
              this.isCategory = true;
              break;
          case '/cart':
              this.isCart = true;
              break;
          case '/perCenter':
              this.isMy = true;
              break;
          default:
              this.isHome = true;
        }
      },
      ...mapActions({
        getCartNumber: 'getCartNumber' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    },
  }

</script>
<style lang="scss" scoped>
  .relative{position:relative;}
  .floor {
    width: 100%;
  }
  .bottom-bar-pannel {
    position: fixed;
    height: 48px;
    z-index: 28;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ffffff;
    background-color: #fff;
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .floor-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .bottom-bar-pannel .tab4 {
    height: 100%;
    position: relative;
    display: flex;
    background-color: #ffffff;
  }

  .bottom-bar-pannel .tab4 li {
    text-align: center;
    width: 25%;
    float: left;
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: auto;
  }
  .bottom-bar-pannel .bar-img {
    display: block;
    width:24px;
    height:24px;
    margin:6px auto 0;
    position:relative;
    i{
      font-size:22px;
      &.active{color:#196dfa;}
    }
  }

  .tab4 span {
    display: block;
    color: #666;
    &.active{color:#196dfa;}
    clear:both;
  }

  .bottom-bar-pannel .bar-img a {
    display: block;
  }

  .bottom-bar-pannel .bar-img img {
    height: 20px;
    width: auto;
    overflow: hidden;
  }

  .tab4 .cart-index {
    line-height: 12px;
    display:block;
    clear:both;
  }

  .tab4 .cart-index, .tab4 .cart-span {
    text-align: center;
    font-size: 10px;
    margin-bottom: 2px;
  }

  .shopcar_num {
    background-color: #eb4344;
    display: block;
    font-family: arial;
    position: absolute;
    top:-4px;
    right:-6px;
    border-radius: 8px;
    height: 12px;
    line-height: 15px;
    font-size: 10px;
    text-align: center;
    padding:1px 4px;
    color: #ffffff;
    font-style:normal;
  }
  .iconfont{float: none;}
</style>
