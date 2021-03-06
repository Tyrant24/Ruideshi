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
    // ?????????????????????
    console.log(window.localStorage.getItem("token"));
    if (window.localStorage.getItem("token") != '') { // ????????????
      next() // ????????????????????????????????????
    } else {
      // ????????????????????????????????????query:{ Rurl: to.fullPath}?????????????????????????????????????????????????????????????????????

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