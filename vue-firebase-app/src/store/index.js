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
    loading: false,
    organizations: null,
    projects: null,
    reviews: null,
    reviewers: null,
    sortedStandards: null,
    standards: null,
    user: {
      displayName: "",
      email: "",
      isClient: false,
      isAdmin: false,
      loggedIn: false
    },
    userDocument: null,
    userLoading: false
  },
  getters: {
    generalStandards(state) {
      return state.generalStandards
    },
    loading(state) {
      return state.loading
    },
    organizations(state) {
      return state.organizations
    },
    projects(state) {
      return state.projects
    },
    reviews(state) {
      return state.reviews
    },
    reviewers(state) {
      return state.reviewers
    },
    sortedStandards(state) {
      return state.sortedStandards
    },
    standards(state) {
      return state.standards
    },
    user(state){
      return state.user
    },
    userDocument(state) {
        return state.userDocument
    },
    userLoading(state) {
        return state.userLoading
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
    SET_ORGANIZATIONS(state, value) {
      console.log("ORGS", value)
      state.organizations = value
    },
    SET_PROJECTS(state, value) {
      console.log("pROJS", value)
      state.projects = value
    },
    SET_REVIEWS(state, value) {
      console.log('VALUE', value)
      state.reviews = value
      console.log('NEW',state.reviews)
    },
    SET_REVIEWERS(state, value) {
      state.reviewers = value
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
      data.loggedIn = state.user.loggedIn;
      state.user = data;
    },
    SET_USER_DOCUMENT(state, userDoc) {
        state.userDocument = userDoc
    },
    SET_USER_LOADING(state, bool) {
        console.log('bool',bool)
        state.userLoading = bool
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      return new Promise((resolve) => {
        commit("SET_LOGGED_IN", user !== null);
        if (user) {
          firebase.firestore().collection("Reviewers").where("email", "==", user.email).get()
          .then(result => {
            if(result.size === 0) {
              commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                isClient: true,
                isAdmin: false
              });          
            } else if(result.docs[0].data().isAdmin === true) {
              commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                isClient: false,
                isAdmin: true
              });    
            } else {
              commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                isClient: false,
                isAdmin: false
              });            
            }
      
            resolve(this.state.user);
          }).catch(err => {
            console.log(err);
          });   
        }        
      });
      state.user.data = data;
    },
    async fetchUserDocument({ commit }, uid) {
        commit('SET_USER_LOADING', true)

        //  Grab the reviewer matching this uid
        try {
            const reviewer = await firebase.firestore().collection('Reviewers').doc(uid).get()
            //  If the reviewer exists, commit
            if (reviewer) commit("SET_USER_DOCUMENT", reviewer)

            //  Else, get the client matching this uid
            const client = await firebase.firestore().collection('Client').doc(uid).get()
            //  If the client exists, commit
            if (client) commit("SET_USER_DOCUMENT", client)

            //  Else set to null
            if (!client && !reviewer) commit("SET_USER_DOCUMENT", null)
        } catch (e) {
            console.log("No user document.")
        }
        finally {
            commit('SET_USER_LOADING', false)
        }
    },
    async fetchGeneralStandards({ dispatch }) {
      //  Our collection of general Standards
      const generalStandards = firebase.firestore().collection('GeneralStandards');

      //  Dispatch the mapstandards request with our constructed payload
      await dispatch('mapStandards', { snapshot: await generalStandards.orderBy('number').get(), type: 'GENERAL_STANDARDS', discover: false })
    },
    async fetchOrganizations({commit}) {
      //  Start loading
      commit('SET_LOADING', true)

      //  Our collection or organizations
      const orgs = firebase.firestore().collection("Organizations").orderBy("title", "asc")
      
      //  Container for our organizations
      const response = []

      //  Get all the organizations and look at the docs
      const obj = await orgs.get();

      //  Iterate through each document parsing appropriately
      for (let i = 0; i < obj.docs.length; i++) {
        //  Our current document with the data parsed
        let doc = obj.docs[i].data()
        //  Attach the id
        doc.id = obj.docs[i].id
        //  Push our doc in
        response.push(doc);
      }
      
      //  We have our documents so set our organizations
      commit("SET_ORGANIZATIONS", response)

      // Stop loading
      commit('SET_LOADING', false)
    },
    async fetchProjects({commit}, orgRef) {
      //  Start loading
      commit('SET_LOADING', true)

      //  Our collection of projects
      const projects = firebase.firestore().collection("Projects").where("org_ref", "==", orgRef)

      //  Container for our projects
      const response = []

      //  We have to get all the projects
      const obj = await projects.get()

      //  Iterate through each document parsing appropriately
      for (let i = 0; i < obj.docs.length; i++) {
        //  Our current document with the data parsed
        let doc = obj.docs[i].data()
        //  Attach the id
        doc.id = obj.docs[i].id
        //  Push our doc in
        response.push(doc);
      }

      //  Commit the projects
      commit('SET_PROJECTS', response)

      //  Stop loading
      commit('SET_LOADING', false)
    },
    async fetchReviews({commit}) {
      //  Start loading
      commit('SET_LOADING', true)

      //  Our collection of reviews
      let reviews = firebase.firestore().collection('Reviews')

      //  Container for our reviews
      const response = []

      //  We have to get all of our reviews, and look at the docs from it
      const obj = await reviews.get()

      //  Iterate through each document, parsing appropriately
      for (let i = 0; i < obj.docs.length; i++) {
        //  The document we want
        let rev = obj.docs[i].data()
        //  Attach document id since it won't be available now that we got the data
        rev.id = obj.docs[i].id

        //  Parse the project for this document
        let proj = await rev.project_ref.get()

        //  Parse the reviewer for this document
        let reviewer = await rev.reviewer_ref.get()

        //  Attach to our reviewer
        rev.project = proj.data()
        if (rev.project) rev.project.id = proj.id
        rev.reviewer = reviewer.data()
        if (rev.reviewer) rev.reviewer.id = reviewer.id

        //  Push the document onto the container
        response.push(rev)
      }

      //  We have our documents, now we can set our reviews
      commit('SET_REVIEWS', response);

      // Stop loading
      commit('SET_LOADING', false)
    },
    async fetchReviewers({commit}) {
      //  Our collection of reviewers
      const reviewers = firebase.firestore().collection("Reviewers").orderBy("lastName", "asc")

      //  Container for our reviewers
      const response = []

      //  Get all of our reviewers
      const obj = await reviewers.get()

      //  Iterate through all reviewers to get all documents
      for (let i = 0; i < obj.docs.length; i++) {
        //  Our current document with the data parsed
        let doc = obj.docs[i].data()
        //  Attach the id
        doc.id = obj.docs[i].id
        //  Push our doc in
        response.push(doc);
      }

      //  We have our documents, now we can set our reviewers
      commit('SET_REVIEWERS', response)

      //  Stop loading
      commit('SET_LOADING', false)
    },
    async fetchStandards({ dispatch }) {
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

          //  Attach the id
          standard.id = doc.id

          //  If the general standard ref doesn't exist, then just push
          return standards.push(standard)
      })

      //  If this is the standards array, discover the general standard refs
      if (obj.discover) {
        for (let i = 0; i < standards.length; i++) {
            //  Parse the general standard ref
            const snap = await standards[i].general_standard_ref.get()
            //  Parse the data
            standards[i].generalStandard = snap.data()
            //  Attach the id
            standards[i].generalStandard.id = snap.id
        }
      }

      //  Commit this array to the corresponding array
      commit(`SET_${obj.type}`, standards)
    },
    async sortStandards({ commit, getters }) {
      //  Start loading
      commit('SET_LOADING', true)

      //  Fetch our general standards and regular standards and await their execution
      await this.dispatch('fetchGeneralStandards')
      await this.dispatch('fetchStandards')

      //  Array to hold the sorted array
      const sorted = []

      //  Create an array of objects with the titles corresponding to the general standard
      for (let i = 0; i < getters.generalStandards.length; i++) {
          sorted[i] = { genStandard: getters.generalStandards[i], standards: [] }
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

      //  Stop loading
      commit('SET_LOADING', false)
    }
  }
})
