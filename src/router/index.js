import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue' //@這個路徑有點像是根目錄  泛指src資料夾
import Login from '@/views/pages/Login.vue' //
import Dashboard from '@/views/Dashboard.vue' //
import Products from '@/views/pages/Products.vue' //
import Orders from '@/views/pages/Orders.vue' //
import Coupons from '@/views/pages/Coupons.vue' //
import CustomerOrders from '@/views/pages/CustomerOrders.vue' //
import CustomerCheckout from '@/views/pages/CustomerCheckout.vue' //
import indexPage from '@/views/pages/indexPage.vue' //
import productList from '@/views/pages/productList.vue' //
import CheckOrders from '@/views/pages/CheckOrders.vue' //
import CheckoutOrder from '@/views/pages/CheckoutOrder.vue' //

Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: 'login'

  },
  {
    name: 'Dashboard', //元件呈現名稱
    path: '/admin', //對應的虛擬路徑
    component: Dashboard, //對應的元件
    children: [{
        path: 'products',
        name: 'Products',
        component: Products,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: {
          requiresAuth: true
        },
      }
    ]
  },
  {
    path: '/test', //對應的虛擬路徑
    name: 'Dashboard', //元件呈現名稱
    component: Dashboard, //對應的元件
    children: [{
        path: 'customer_orders',
        name: 'CustomerOrders',
        component: CustomerOrders,
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
      }
    ]
  },
  {
    path: '/', //對應的虛擬路徑
    name: 'Index', //元件呈現名稱
    component: Index, //對應的元件
    children: [{
        path: '', //對應的虛擬路徑
        name: 'indexPage',
        component: indexPage,
      },
      {
        path: 'products/:catalog', //對應的虛擬路徑
        name: 'productList',
        component: productList,
      },
      {
        path: 'checkorders', //對應的虛擬路徑
        name: 'CheckOrders',
        component: CheckOrders,
      },
      {
        path: 'checkoutorder/:orderId', //對應的虛擬路徑
        name: 'CheckoutOrder',
        component: CheckoutOrder,
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router