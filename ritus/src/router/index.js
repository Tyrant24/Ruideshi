import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/about1',
    name: 'About1',
    component: () => import( /* webpackChunkName: "about" */ '../views/About1.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import( /* webpackChunkName: "about" */ '../views/Shop.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/wechatlogin',
    name: 'WechatLogin',
    component: () => import( /* webpackChunkName: "about" */ '../views/WechatLogin.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import( /* webpackChunkName: "about" */ '../views/Product.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import( /* webpackChunkName: "about" */ '../views/Products.vue')
  },
  {
    path: '/payqrcode',
    name: 'payqrcode',
    component: () => import( /* webpackChunkName: "about" */ '../views/PayQrcode.vue')
  },
  {
    path: '/bondedPhone',
    name: 'bondedPhone',
    component: () => import( /* webpackChunkName: "about" */ '../views/BondedPhone.vue')
  },
  {
    path: '/confirmorder',
    name: 'confirmorder',
    component: () => import( /* webpackChunkName: "about" */ '../views/ConfirmOrder.vue'),
    meta: {
      auth: true
    },
  },
  {
    path: '/membercenter',
    name: 'membercenter',
    component: () => import( /* webpackChunkName: "about" */ '../views/MemberCenter.vue'),
    meta: {
      auth: true
    },
    children: [{
        path: 'order',
        name: 'order',
        component: () => import( /* webpackChunkName: "about" */ '../views/Order.vue'),
      },
      {
        path: 'address',
        name: 'address',
        component: () => import( /* webpackChunkName: "about" */ '../views/Address.vue'),
      },
      {
        path: 'memberinfo',
        name: 'memberinfo',
        component: () => import( /* webpackChunkName: "about" */ '../views/MemberInfo.vue'),
      },
      {
        path: 'changepassword',
        name: 'changepassword',
        component: () => import( /* webpackChunkName: "about" */ '../views/ChangePassword.vue'),
      },
    ],
    redirect: '/membercenter/order'
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    // 对路由进行验证
    console.log(window.localStorage.getItem("token"));
    if (window.localStorage.getItem("token") != '') { // 已经登陆
      next() // 正常跳转到你设置好的页面
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；

      next({
        path: '/login',
        query:{ Rurl: to.fullPath} 
      })
    }
  } else {
    next()
  }
})
export default router