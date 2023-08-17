import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgk:'',
  },
  getters: {
  },
  mutations: {
  getbkg(state,data){
    state.bkg=data;
    console.log(state.bkg,'state')

   }


  },
  actions: {

 

  },
  modules: {
  }
})
