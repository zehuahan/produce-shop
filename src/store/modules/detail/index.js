import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
// 封装游客身份模块，生成一个随机字符串
import { getUUID } from '../../../utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的结构
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code:200,代表这次操作成功
        // 因为服务器没有返回其余数据，s所以不需要存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code === 200) {
            // 返回成功的标记
            return 'ok'
        } else {
            // 返回失败的标记
            return Promise.reject(new Error('faile'))
        }
    },
}
// 简化数组而生
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    },
}
export default {
    state, mutations, actions, getters
}