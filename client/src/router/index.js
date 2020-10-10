import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts',
    name: 'ContactsList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ContactsList.vue')
  },
  {
    path: '/contacts/:id',
    name: 'ContactInfo',
    component: () => import(/* webpackChunkName: "about" */ '../components/ContactInfo')
  },
  {
    path: '/contacts/:id/edit',
    name: 'ContactEdit',
    component: () => import(/* webpackChunkName: "about" */ '../components/ContactEdit')
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import(/* webpackChunkName: "about" */ '../components/Thanks.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
