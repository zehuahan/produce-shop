
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
// 引入store
import store from "@/store"

// 保存VueRouter原型对象的push
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push | replace
// 第一个参数：告诉原来的push方法往哪里跳转
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 滚动条在最上方
        return { y: 0 }
    }
})

// 使用插件
Vue.use(VueRouter)

// 全局守卫
router.beforeEach(async (to, from, next) => {
    // to:跳转到的路径；from:从哪个路由而来；next:放行函数
    // 用户登录才会有
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo
    if (token) {
        if (to.path === '/login') {
            next('/home')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            // 把未登录跳转而未成功的路由存储到地址栏中
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router