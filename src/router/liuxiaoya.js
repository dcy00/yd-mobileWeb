/**
 * Created by liuxiaoya on 2018/2/27 0027.
 */
//商品详情
const goodsDetail = (resolve) => {
  import('@/components/goods-detail').then((module) => {
    resolve(module)
  })
}
//分类
const category = (resolve) => {
  import('@/components/category').then((module) => {
    resolve(module)
  })
};
//搜索结果页
const searchList = () => import('@/components/search-list');
//搜索页
const search = () => import('@/components/search');
//今日团购
const groupBuying = () => import('@/components/group-buying');
//我的收藏
const myCollect = () => import('@/components/my-collect');
//需求登记
const demand = () => import('@/components/demand-register');
//列表页
const classify = () => import('@/components/classify');
//抢红包
const redShare = () => import('@/components/red-share');
export default  [
  {
    path: '/goodsDetail/:id',
    component:goodsDetail
  },
  {
    path: '/category',
    component:category
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/searchList',
    component:searchList
  },
  {
    path: '/groupBuying',
    component:groupBuying
  },
  {
    path: '/myCollect',
    component:myCollect
  },
  {
    path: '/demand',
    component:demand
  },
  {
    path: '/classify',
    component:classify
  },
  {
    path: '/wxhb/:param',
    component:redShare
  }
]
