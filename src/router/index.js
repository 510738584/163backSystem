import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/main/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:'',
        name:'Home',
        component:Home,
        meta:{
          auth: true
        }
      },
      {
        path:'/params',
        name:'Params',
        component:() => import('@/views/main/Params.vue'),  
        meta:{
          auth: true
        }
      },
      {
        path:'/product',
        name:'Product',
        component:() => import('@/views/main/Product.vue'),  
        meta:{
          auth: true
        }
      },
      {
        path:'ad',
        name:'Ad',
        component: () => import('@/views/main/AD.vue'), 
        meta:{
          auth: true
        },
      },
      {
        path:'user',
        name:'User',
        component: () => import('@/views/main/User.vue'), 
        meta:{
          auth: true
      }},
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{
      auth:false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
