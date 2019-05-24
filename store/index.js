import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api";
import apiUrls from "../api/apiUrls";


Vue.use(Vuex)

const index = () => new Vuex.Store({

  state: {
    userName: '',
    usersOnline: ''
  },
  mutations: {
    userName(state, payload) {
      state.userName = payload.username
    },
    usersOnline(state, payload) {
      state.usersOnline = payload;
    }
  },
  actions: {
    requestSignIn(context, payload) {
      return api.post(apiUrls['sign-in'], payload)
    },
    requireGetUsers(context, payload) {
      return api.get(apiUrls['users'],payload)
    }
  },
  getters: {
  }
});

export default index
