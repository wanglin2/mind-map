import Vue from 'vue'
import Vuex from 'vuex'
import exampleData from './package/mind-map/example/exampleData';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: null,// 用户信息
        mindMapData: null// 思维导图数据
    },
    mutations: {
        /** 
         * @Author: 王林 
         * @Date: 2020-11-28 15:32:32 
         * @Desc: 设置用户信息 
         */
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },

        /** 
         * @Author: 王林 
         * @Date: 2021-04-10 14:50:01 
         * @Desc: 设置思维导图数据 
         */
        setMindMapData(state, data) {
            state.mindMapData = data
        }
    },
    actions: {
        /** 
         * @Author: 王林 
         * @Date: 2020-11-28 15:28:03 
         * @Desc: 获取用户信息 
         */
        async getUserInfo(ctx) {
            try {
                let { data } = await api.getUserInfo()
                ctx.commit('setUserInfo', data.data)
            } catch (error) {
                console.log(error)
            }
        },

        /** 
         * @Author: 王林 
         * @Date: 2021-04-10 14:50:40 
         * @Desc: 获取思维导图数据 
         */
        async getUserMindMapData(ctx) {
            try {
                let { data } = {
                    data: {
                        data: {
                            mindMapData: exampleData
                        }
                    }
                }
                ctx.commit('setMindMapData', data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export default store