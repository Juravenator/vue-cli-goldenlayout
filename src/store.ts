import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: 'hello',
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {

  },
});
