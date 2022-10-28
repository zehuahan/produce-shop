// 路由配置信息
export default [
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: ()=> import('@/pages/Search'),
        meta: { show: true },
        // 路由组件能不能传递props数据？
        // 布尔值写法:params
        // props: true,
        // 对象写法:额外给路由组件传递一些props
        // props:{a:1,b:2},
        // 函数写法：可以params参数、query参数通过props传递给路由组件
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
        path: '/detail/:skuId',
        name: 'detail',
        component: ()=>import('@/pages/Detail'),
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: true },
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { show: true },
    },
    {
        path: '/trade',
        name: 'trade',
        component: ()=>import('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: ()=>import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { show: true },
    },
    {
        path: '/center',
        name: 'center',
        component: ()=>import('@/pages/Center'),
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myorder',
                name: 'myorder',
                component: ()=>import('@/pages/Center/myOrder'),
            },
            {
                path: 'grouporder',
                name: 'grouporder',
                component: ()=>import('@/pages/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder',
            },
        ]
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    // 重定向，初始页面为首页
    {
        path: '*',
        redirect: '/home'
    },
]