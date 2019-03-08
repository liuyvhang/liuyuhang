import Vuex from 'vuex'
import Vue from 'vue'
import persistedstate from "vuex-persistedstate";


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      name: "",
      type: NaN
    },
    lang: 'zh-CN'
  },
  mutations: {
    LOGIN_IN(state, info) {
      state.userInfo = info
    },
    LOGIN_OUT(state) {
      state.userInfo = {}
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    }
  },
  plugins: [
    persistedstate({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) =>
          sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
})

export default store
