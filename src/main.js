import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 全局组件：第一个参数组件名称，第二个参数组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// 挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入MockServer.js
import './mock/mockServe'

// 引入路由
import router from '@/router'

// 引入仓库
import store from './store'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里全部请求函数
// 统一引入
import * as API from '@/api'

// 引入图片
import atm from '@/assets/1.gif'

// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
})

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 全集事件总线Bus
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库：组件实例的身上会多一个$store属性
  store
}).$mount('#app')
