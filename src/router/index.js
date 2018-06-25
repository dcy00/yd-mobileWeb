import Vue from 'vue'
import Router from 'vue-router'
import zhanglifeng from './zhanglifeng'
import caokui from './caokui'
import zhouxiangbo from './zhouxiangbo'
import liuxiaoya from './liuxiaoya'
Vue.use(Router)

/*const routes = liuxiaoya.concat(zhanglifeng).concat(caokui).concat(zhouxiangbo);
export default new Router({
  routes: routes
})*/

let router=new Router({
  mode:'history',
  scrollBehavior(to,from,savePosition){
    //to：记录目标 点击浏览器前进后退或者切换导航触发
    //from:记录来源 点击浏览器前进后退或者切换导航触发
    //savePosition：记录滚动条的坐标 点击浏览器前进后退触发
    if(savePosition){
      return savePosition
    }else {
      return {x:0,y:0}
    }
  },
  routes: [
    ...zhanglifeng,
    ...caokui,
    ...liuxiaoya,
    ...zhouxiangbo
  ]
});
/*全局路由拦截器，设置登录跳转*/
router.beforeEach((to,from,next)=>{
  next();

});
/*全局路由拦截器，设置标签页title信息*/
router.afterEach((to,from)=>{


});

//router.app 获取根实例
//router.设置全局钩子函数
export default router
