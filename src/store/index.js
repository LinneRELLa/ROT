import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        bgk: '',
        proxy: false,
        proxy_url: '',
    },
    getters: {},
    mutations: {
        getbkg(state, data) {
            state.bkg = data;
            console.log(state.bkg, 'state')

        },
        switchproxy(state,data){
          state.proxy=data;
        }


    },
    actions: {



    },
    modules: {}
})