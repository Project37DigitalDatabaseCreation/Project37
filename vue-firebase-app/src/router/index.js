/******************************************************* 
 * ./router/index.js
 * 
 * Description: Handles all of the vue routing and
 * contains records for each navigation item.
*******************************************************/
import { createRouter, createWebHashHistory } from 'vue-router'
import Invitations from '../components/Invitations'
import Login from '../components/Login'
import Register from '../components/Register'
import Review from '../components/Review'
import ReviewsList from '../components/ReviewsList'
import Reviews from '../components/Reviews'
import Dashboard from '../components/Dashboard'
import ProjectReviews from '../components/ProjectReviews'
import AddReviewer from '../components/AddReviewer'
import ModifyReviewer from '../components/ModifyReviewer'
import NewProject from '../components/NewProject'
import CurrentProjects from '../components/CurrentProjects'
import ViewProject from '../components/ViewProject'
import ManageReviewers from '../components/ManageReviewers'
import ManageClients from '../components/ManageClients'
import ReviewerList from '../components/ReviewerList'
import Organizations from '../components/Organizations'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Default',
    component: Dashboard
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project-reviews',
    name: 'Project Reviews',
    component: ProjectReviews,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/newProject',
    name: 'NewProject',
    component: NewProject,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/currentProjects',
    name: 'CurrentProjects',
    component: CurrentProjects,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/viewProject',
    name: 'ViewProject',
    component: ViewProject,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews,
    children: [
        { path: '', name: 'ReviewsList', component: ReviewsList },
        { path: '/review', name: 'Review', component: Review, props: true }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addreviewer',
    name: 'AddReviewer',
    component: AddReviewer,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/managereviewers',
    name: 'ManageReviewers',
    component: ManageReviewers, children: [

      { path: '', name: 'ReviewerList', component: ReviewerList },
      { path: '/modifyreviewer', name: 'ModifyReviewer', component: ModifyReviewer, props: true }

    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-clients',
    name: 'ManageClients',
    component: ManageClients,
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
      path: '/invitations',
      name: 'Invitations',
      component: Invitations,
      meta: {
          requiresAuth: true
      },
  },
  {
    path: '/modifyreviewer',
    name: 'ModifyReviewer',
    component: ModifyReviewer,
    props:true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: Organizations,
    
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !store.state.user.loggedIn) {
    next('Login');
  }else{
    next();
  }
});

export default router
