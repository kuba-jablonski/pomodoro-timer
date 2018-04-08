import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Application from '@/views/Application.vue'
import Timer from '@/components/Timer.vue'
import Settings from '@/components/Settings.vue'
import AppHistory from '@/components/AppHistory.vue'

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
      name: 'application',
      component: Application,
      children: [
        {
          path: '',
          name: 'timer',
          component: Timer
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings
        },
        {
          path: 'history',
          name: 'history',
          component: AppHistory
        }
      ]
    }
  ]
})
