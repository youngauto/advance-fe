import Vue from 'vue'
import Vuex from 'vuex'

import { login } from '@/api'
import { setToken, getToken } from '@/libs/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    token: getToken()
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUser (state, userName) {
      state.userName = userName
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, user) {
      return new Promise((resolve, reject) => {
        login({
          ...user
        }).then(res => {
          const result = res.data
          // 更新用户
          commit('setUser', user.userName)
          // 更新token
          commit('setToken', result.data.token)
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    handleLogOut ({ commit }, user) {
      return new Promise((resolve, reject) => {        
        commit('setToken', '')
        resolve()
      })
    },
  },
  getters: {
    getUser: (state) => {
      return state.userName
    },
    getToken: (state) => {
      return state.token
    }
  },
  modules: {
    // 可配置多模块
  }
})
