/******************************************************* 
 * ./store/index.js
 * 
 * Description: Implements a vuex store for managing
 * the applications session state.
*******************************************************/

import { createStore } from 'vuex'
import firebase from 'firebase'

export default createStore({
  state: {
    generalStandards: null,
    standards: null,
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    generalStandards(state) {
      return state.generalStandards
    },
    standards(state) {
      return state.standards
    },
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_GENERAL_STANDARDS(state, value) {
      state.generalStandards = value
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_STANDARDS(state, value) {
      state.standards = value
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    async fetchGeneralStandards({ dispatch }) {
      //  Our collection of general Standards
      const generalStandards = firebase.firestore().collection('GeneralStandards');

      //  Dispatch the mapstandards request with our constructed payload
      dispatch('mapStandards', { snapshot: await generalStandards.orderBy('number').get(), type: 'GENERAL_STANDARDS', discover: false })
    },
    async fetchStandards({ dispatch }) {
      //  Our collection of general Standards
      const standards = firebase.firestore().collection('Standards');

      //  Dispatch the mapstandards request with our constructed payload
      dispatch('mapStandards', { snapshot: await standards.orderBy('number').get(), type: 'STANDARDS', discover: true })
    },

    async mapStandards({ commit }, obj) {
      const standards = []

      //  Iterate through each standard so we can give it the parsed general standard ref if needed
      obj.snapshot.docs.forEach(async doc => {
          //  Our standard from the data
          const standard = doc.data()

          //  If the general standard ref doesn't exist, then just push
          return standards.push(standard)
      })

      //  If this is the standards array, discover the general standard refs
      if (obj.discover) {
        for (let i = 0; i < standards.length; i++) {
            //  Parse the general standard ref
            const snap = await standards[i].general_standard_ref.get()
            standards[i].generalStandard = snap.data()
        }
      }

      //  Commit this array to the corresponding array
      commit(`SET_${obj.type}`, standards)
    }
  }
})
