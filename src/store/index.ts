import Vue from 'vue';
import Vuex from 'vuex';
import pathify, { make } from 'vuex-pathify';

Vue.use(Vuex);

const state = {

};

export default new Vuex.Store({
  plugins: [pathify.plugin],

  state,

  getters: make.getters(state),
  mutations: make.mutations(state),
  actions: make.actions(state),
});
