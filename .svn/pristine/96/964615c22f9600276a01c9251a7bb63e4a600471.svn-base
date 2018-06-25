const cart = (resolve) => {
  import('@/components/cart/cart').then((module) => {
    resolve(module)
  })
};
const cartCheckout = (resolve) => {
  import('@/components/cart-checkout/cart-checkout').then((module) => {
    resolve(module)
  })
};
const pay = (resolve) => {
  import('@/components/pay/pay').then((module) => {
    resolve(module)
  })
};
const integralMall = (resolve) => {
  import('@/components/integralMall').then((module) => {
    resolve(module)
  })
};
const integralDetail = (resolve) => {
  import('@/components/integralDetail/integralDetail').then((module) => {
    resolve(module)
  })
};
const invoice = (resolve) => {
  import('@/components/invoice/invoice').then((module) => {
    resolve(module)
  })
};
const orders = (resolve) => {
  import('@/components/orders/orders').then((module) => {
    resolve(module)
  })
};
const orderDetail = (resolve) => {
  import('@/components/orderDetail/orderDetail').then((module) => {
    resolve(module)
  })
};
const myAsset = (resolve) => {
  import('@/components/myAsset/myAsset').then((module) => {
    resolve(module)
  })
};
const payCallback = (resolve) => {
  import('@/components/pay/pay-success').then((module) => {
    resolve(module)
  })
};
const coupon = (resolve) => {
  import('@/components/coupon/coupon').then((module) => {
    resolve(module)
  })
};
const cartCoupon = (resolve) => {
  import('@/components/cart-coupon/cart-coupon').then((module) => {
    resolve(module)
  })
};
const commentGoods = (resolve) => {
  import('@/components/commentGoods/commentGoods').then((module) => {
    resolve(module)
  })
};
const myComment = (resolve) => {
  import('@/components/my-comment/my-comment').then((module) => {
    resolve(module)
  })
};
const againComment = (resolve) => {
  import('@/components/commentGoods/againComment').then((module) => {
    resolve(module)
  })
};
const express = (resolve) => {
  import('@/components/express/express').then((module) => {
    resolve(module)
  })
};
export default [
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/cartCheckout/:ids',
    component:cartCheckout
  },
  {
    path:'/pay/:orderNo',
    component:pay
  },
  {
    path:'/integralMall',
    component:integralMall
  },
  {
    path:'/integralDetail/:id',
    component:integralDetail
  },
  {
    path:'/invoice/:siteIds',
    component:invoice
  },
  {
    path:'/orders/:type',
    component:orders
  },
  {
    path:'/orderDetail/:orderId/:orderMainId',
    component:orderDetail
  },
  {
    path:'/myAsset/:type',
    component:myAsset
  },
  {
    path:'/payCallback',
    component:payCallback
  },
  {
    path:'/coupon',
    component:coupon
  },
  {
    path:'/cartCoupon/:type',
    component:cartCoupon
  },
  {
    path:'/commentGoods/:oId/:mId',
    component:commentGoods
  },
  {
    path:'/myComment',
    component:myComment
  },
  {
    path:'/againComment/:id',
    component:againComment
  },
  {
    path:'/express/:orderNo',
    component:express
  }
]
