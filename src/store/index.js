import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
    SViewSquare:true,
};
const getters={
    getGridState(state){
        console.log(state.SViewSquare)
        return state.SViewSquare
    }
};
const mutations={
    changeGrid(state,eventN){
        if(eventN.path[0].className=="grid-icon"){
            state.SViewSquare = false
            eventN.path[0].className = "grid-icon active"
        }else{
            state.SViewSquare = true
            eventN.path[0].className +=" active"
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