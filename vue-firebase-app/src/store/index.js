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
    notificationBar: null,
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
      isReviewer: false,
      isAdmin: false,
      loggedIn: false
    },
    userLoading: false
  },
  getters: {
    generalStandards(state) {
      return state.generalStandards
    },
    loading(state) {
      return state.loading
    },
    notificationBar(state) {
        return state.notificationBar
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
    SET_NOTIFICATION_BAR(state, obj) {
        state.notificationBar = obj
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
        //  This will default to use loggedIn if provided, if not, use the state
      data.loggedIn = Object.prototype.hasOwnProperty.call(data,'loggedIn') ? data.loggedIn : state.user.loggedIn;
      state.user = data;
    },
    SET_USER_LOADING(state, bool) {
        console.log('bool',bool)
        state.userLoading = bool
    }
  },
  actions: {
    async fetchUser({ commit, dispatch }, user) {
        commit("SET_LOGGED_IN", user !== null);

        if (user) {
            //  Get an invitation first because non auth users don't have access to other docs
            const invitation = await firebase.firestore().collection('Invitations').where('uid', '==', user.uid).get()

            if (invitation.docs && invitation.docs.length) {
                //  Commit our user as an Invited user
                return commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email,
                    isClient: false,
                    isReviewer: false,
                    isAdmin: false,
                });
            }

        //  If no invitations, then continue to get a Reviewer
        const reviewers = await firebase.firestore().collection("Reviewers").doc(user.uid).get()
        //  Start getting our sorted standards
        dispatch('sortStandards')

        if(!reviewers.data()) {
          let userToSet = {
            displayName: user.displayName,
            email: user.email,
            isClient: false,
            isReviewer: false,
            isAdmin: false
          };

          const client = await firebase.firestore().collection('Clients').doc(user.uid).get();

          userToSet.isClient = typeof client.data() !== 'undefined';

          return commit("SET_USER", userToSet);
        } else if(reviewers.data().isAdmin === true) {
              return commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                isClient: false,
                isReviewer: true,
                isAdmin: true
              });    
            } else {
              return commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                isClient: false,
                isReviewer: true,
                isAdmin: false
              });
            }
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
    async fetchReviews({commit, getters}) {
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
        rev.project_ref.get().then(doc => {
            let proj = doc.data();
            
            if (proj) {
                proj.id = doc.id;
                rev.project = proj;

                proj.org_ref.get()
                .then(doc => {
                    let org = doc.data();

                    if(org) {
                        org.id = doc.id;
                        rev.org = org; 
                    }
                });
            }
        });

        //  Get our reviewer
        rev.reviewer_ref.get().then(doc => {
            let reviewer = doc.data();
            
            if(reviewer) {
                reviewer.id = doc.id;
                rev.reviewer = reviewer;
            }
        });

        // Initialize our scores array and points values
        rev.scores = []
        rev.points = 0
        const revDoc = firebase.firestore().doc(`/Reviews/${rev.id}`)
        
        //  Store our scores
        firebase.firestore().collection("Scores").where("review_ref", "==", revDoc).get().then(result => {
            result.forEach(doc => {
                let score = doc.data()
                let scoreStandard = null

                if (score.standard_ref && getters.standards) {
                    scoreStandard = getters.standards.find(x => x.id === score.standard_ref.id)
                }

                if (scoreStandard) {
                    if (score.met) rev.points += scoreStandard.points
                    score.standard = scoreStandard
                }

                rev.scores.push(score)
            })
            //  If this is the last review, set our reviews to be loaded
            if (i === obj.docs.length - 1) commit('SET_LOADING', false)
        })

        //  Push the document onto the container
        response.push(rev)
      }

      //  We have our documents, now we can set our reviews
      commit('SET_REVIEWS', response);
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

      for (let i = 0; i < obj.snapshot.docs.length; i++) {
          let doc = obj.snapshot.docs[i]
          let std = doc.data()
          std.id = doc.id
          standards.push(std)
      }

      //  Commit this early so we can access our standards points
      commit(`SET_${obj.type}`, standards)

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

      const value = _.cloneDeep(sorted)

      //  Set our sorted standards (we use lodash to deep clone and remove proxies)
      commit('SET_SORTED_STANDARDS', value)

      //  Stop loading
      commit('SET_LOADING', false)
    }
  }
})
