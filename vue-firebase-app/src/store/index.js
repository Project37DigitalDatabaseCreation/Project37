/******************************************************* 
 * ./store/index.js
 * 
 * Description: Implements a vuex store for managing
 * the applications session state.
*******************************************************/

import { createStore } from 'vuex'
import firebase from 'firebase'
import _ from 'lodash'

export default createStore({
  state: {
    generalStandards: null,
    standards: null,
    loading: false,
    user: {
      loggedIn: false,
      data: null
    },
    sortedStandards: null
  },
  getters: {
    generalStandards(state) {
      return state.generalStandards
    },
    loading(state) {
      return state.loading
    },
    sortedStandards(state) {
      return state.sortedStandards
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
      console.log("general standards set")
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_SORTED_STANDARDS(state, value) {
      state.sortedStandards = value
      console.log('sorted set')
    },
    SET_STANDARDS(state, value) {
      state.standards = value
      console.log('standards set')
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
    async fetchGeneralStandards({ commit, dispatch }) {
      //  Start loading
      commit('SET_LOADING', true)

      //  Our collection of general Standards
      const generalStandards = firebase.firestore().collection('GeneralStandards');

      //  Dispatch the mapstandards request with our constructed payload
      await dispatch('mapStandards', { snapshot: await generalStandards.orderBy('number').get(), type: 'GENERAL_STANDARDS', discover: false })
    },
    async fetchStandards({ commit, dispatch }) {
      //  Start loading
      commit('SET_LOADING', true)

      //  Our collection of general Standards
      const standards = firebase.firestore().collection('Standards');

      //  Dispatch the mapstandards request with our constructed payload
      await dispatch('mapStandards', { snapshot: await standards.orderBy('number').get(), type: 'STANDARDS', discover: true })
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

      //  Stop loading
      commit('SET_LOADING', false)
    },
    async sortStandards({ commit, getters }) {
      //  Fetch our general standards and regular standards and await their execution
      await this.dispatch('fetchGeneralStandards')
      await this.dispatch('fetchStandards')

      //  Array to hold the sorted array
      const sorted = []

      //  Create an array of objects with the titles corresponding to the general standard
      for (let i = 0; i < getters.generalStandards.length; i++) {
          sorted[i] = { genStandard: getters.generalStandards[i], standards: [] }
          // console.log('sorted', sorted[i])
      }

      for (let i = 0; i < getters.standards.length; i++) {
          //  Add an additional met flag on each standard
          getters.standards[i].met = false
          //  Remove the general standard ref from each standard as it is unneeded in this context
          delete getters.standards[i].general_standard_ref
          //  For each standard, slot it into the correct position in our sorted standards
          //  We determine this based on the generalStandard.number, which is +1 of the index
          sorted[getters.standards[i].generalStandard.number - 1].standards.push(getters.standards[i])
      }

      //  Set our sorted standards (we use lodash to deep clone and remove proxies)
      commit('SET_SORTED_STANDARDS', _.cloneDeep(sorted))
    }
  }
})
