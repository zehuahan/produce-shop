import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state = {
    // 仓库初始状态
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// 计算属性，在项目中为了简化数据而生
const getters = {
    // 当前仓库中的state
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
}
export default {
    state, mutations, actions, getters
}