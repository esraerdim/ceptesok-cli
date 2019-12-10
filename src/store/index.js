import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
    SViewSquare:true,
};
const getters={
    getGridState(state){
        console.log(state.SViewSquare)
        return state.SViewSquare;
    }
};
const mutations={
    changeGrid(state){
        if(state.SViewSquare){
            state.SViewSquare = false;
        }else{
            state.SViewSquare=true;
        }
    }
};
const actions={};


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})

export default store;