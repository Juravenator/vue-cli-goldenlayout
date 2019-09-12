import Vue from 'vue';
import Vuex from 'vuex';

import createMutationsSharer from 'vuex-shared-mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: 'hello',
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    brainTransfer(state, newstate) {
      Object.assign(state, newstate);
    },
  },
  actions: {

  },

  plugins: [
    createMutationsSharer({predicate: () => true}),
  ],
});
