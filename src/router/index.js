import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Timer from '@/views/Timer.vue'

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
      component: Timer
    }
  ]
})
