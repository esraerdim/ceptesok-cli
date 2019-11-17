import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Et from './components/Et.vue'
import Kahvaltilik from './components/kahvaltilik.vue'
import Endusuk  from './components/Endusuk.vue'
import Normalurun from './components/Normalurun.vue'
import Enyeni from './components/Enyeni.vue'
import Urun from './components/Urun.vue'
import Yardim from './components/Yardim.vue'
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'

Vue.component('BadgerAccordion', BadgerAccordion)
Vue.component('BadgerAccordionItem', BadgerAccordionItem)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/et',
      component:Et,
        children: [
        {
          path: 'order/opa/',
          component: Endusuk,
        },
        {
          path: 'order/ocd/',
          component:Enyeni,
        },
        {
          path: '/',
          component: Normalurun,
        },
      ]
    },
    {
      path: '/sut',
      component:Et,
        children: [
        {
          path: 'order/opa/',
          component: Endusuk,
        },
        {
          path: 'order/ocd/',
          component:Enyeni,
        },
        {
          path: '/',
          component: Normalurun,
        },
      ]
    },
    {
      path: '/kahvaltilik',
      component:Kahvaltilik,
        children: [
        {
          path: 'order/opa/',
          component: Endusuk,
        },
        {
          path: 'order/ocd/',
          component:Enyeni,
        },
        {
          path: '/',
          component: Normalurun,
        },
      ]
    },
    {
      name: 'Urun',
      path: '/urun/',
      component: Urun,
      props: true,
    },
    {
      path: '/Yardim',
      component: Yardim,
      children:[
        {
          path: '/yasal-uyarilar',
          component:Urun,
        }
      ]
    },
  ],
  mode :'history'
})
window.vuewm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
