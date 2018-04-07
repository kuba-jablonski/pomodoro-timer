import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Application from '@/views/Application.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/app',
      name: 'Timer',
      component: Application
    }
  ]
})
