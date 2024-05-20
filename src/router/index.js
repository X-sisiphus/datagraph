
import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
//import { getToken } from "@/utils/auth";


Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect:'/login',
},{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: "登录",
    requireAuth: false,
    keepAlive: true,
    normalAuthPass: true,
  },
},{
  path: '/Home',
  name: 'Home',
  component: () => import("@/views/Home.vue"),
  children: [
    {
      path:'/Home',
      redirect: '/Home/homepage'
    },{
      path: 'homePage',
      name: 'homePage',
      component: () => import("@/components/homePage.vue"),
      meta: {
        title: "首页",
        requireAuth: true,
        keepAlive: true,
        normalAuthPass: true,
      }
    },{
      path: 'dataGraphPage',
      name: 'dataGraphPage',
      component: () => import("@/components/dataGraphPage.vue"),
      meta: {
        title: "知识图谱",
        requireAuth: true,
        keepAlive: true,
        normalAuthPass: true,
      }
    }
    
  ],
  meta: {
    title: "主页",
    requireAuth: true,
    keepAlive: true,
    normalAuthPass: true,
  }
},{
  path: '*',
  name: '404',
  component: () => import("@/views/404.vue"),
  meta: {
    title:"404",
    requireAuth: false,
    keepAlive: true,
    normalAuthPass: true,
  }
}
]

const router = new VueRouter({
    routes
})


  

export default router

