import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Et from './components/Et.vue'
import Sut from './components/Sut.vue'
import Kahvaltilik from './components/kahvaltilik.vue'
import Temizlik from './components/Temizlik.vue'
import Endusuk  from './components/Endusuk.vue'
import Normalurun from './components/Normalurun.vue'
import Enyeni from './components/Enyeni.vue'
import Urun from './components/Urun.vue'
import Yardim from './components/Yardim.vue'
import Login from './components/Login.vue'
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
      component:Sut,
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
      path: '/temizlik',
      component:Temizlik,
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
          path: 'hesabim-menusu',
          component:Yardim,
        },
        {
          path: 'siparis-islemleri',
          component:Yardim,
        },
        {
          path: 'yasal-uyarilar',
          component:Yardim,
        },
        {
          path: 'guvenlik-politikasi',
          component:Yardim,
        },
        {
          path: 'kullanim-kosullari',
          component:Yardim,
        },
        {
          path: 'kvkk',
          component:Yardim,
        },
        {
          path: 'hakkimizda',
          component:Yardim,
        },
        {
          path: 'uyelik-islemleri',
          component:Yardim,
        },
      ]
    },
    {
      name:'Login',
      path:'/Giris',
      component:Login,
    },
  ],
  mode :'history'
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.filter('regexbus', function (value) {
  return value.replace(/<\/?[^>]+>/gi, '').replace(new RegExp('&uuml;', 'g'),'ü').replace(new RegExp('&ccedil;', 'g'),'ç').replace(new RegExp('&nbsp;', 'g'),'').replace(new RegExp('&#8221;', 'g'),'').replace(new RegExp('&hellip;', 'g'),'').replace(new RegExp('&Uuml;', 'g'),'Ü').replace(new RegExp('&ouml;', 'g'),'ö').replace(new RegExp('&ldquo;', 'g'),'').replace(new RegExp('&rdquo;', 'g'),'').replace(new RegExp('&rsquo;', 'g'),'').replace(new RegExp('&Ccedil;', 'g'),'Ç').replace(new RegExp('&ccedil;', 'g'),'ç')
})
