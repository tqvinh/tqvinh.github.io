import Vue from 'vue'
import Router from 'vue-router'
import Category from '../components/Category'
import MainBoard from '../components/MainBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Category',
      component: Category
    },
    {
        path: '/MainBoard/:category',
        name: 'MainBoard',
        component: MainBoard
    }
  ]
})