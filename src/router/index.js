import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home',
  },
    {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  {
    path: '/Message',
    name: 'Message',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Message'),
      children:[

{path:'/DetaiInfo',
  name:'DetailInfo',
   component: () => import(/* webpackChunkName: "about" */ '../views/DetaiInfo'),
}
  ]

  },
    {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/detail.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
