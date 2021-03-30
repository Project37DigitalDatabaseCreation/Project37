/******************************************************* 
 * ./router/index.js
 * 
 * Description: Handles all of the vue routing and
 * contains records for each navigation item.
*******************************************************/
import { createRouter, createWebHashHistory } from 'vue-router'
import Invitations from '../components/Invitations'
import InvitationPending from '../components/InvitationPending'
import Login from '../components/Login'
import Register from '../components/Register'
import Review from '../components/Review'
import ReviewsList from '../components/ReviewsList'
import Reviews from '../components/Reviews'
import AccessDenied from '../components/AccessDenied'
import AdminDashboard from '../components/AdminDashboard'
import ClientDashboard from '../components/ClientDashboard'
import ReviewerDashboard from '../components/ReviewerDashboard'
import ProjectReviews from '../components/ProjectReviews'
import AddReviewer from '../components/AddReviewer'
import ModifyReviewer from '../components/ModifyReviewer'
import CurrentProjects from '../components/CurrentProjects'
import ViewProject from '../components/ViewProject'
import ManageReviewers from '../components/ManageReviewers'
import ManageClients from '../components/ManageClients'
import ReviewerList from '../components/ReviewerList'
import Organizations from '../components/Organizations'
import store from '../store/index'
import ForgotPassword from '../components/ForgotPassword'
import ReviewToPDF from '../components/ReviewToPDF'

const routes = [
  {
    path: '/',
    name: 'Default',
    component: Login
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/AccessDenied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/Pending',
    name: 'Pending',
    component: InvitationPending,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/AdminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/ClientDashboard',
    name: 'ClientDashboard',
    component: ClientDashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/ReviewerDashboard',
    name: 'ReviewerDashboard',
    component: ReviewerDashboard,
    meta: {
      requiresAuth: true,
      requiresReviewer: true
    }
  },
  {
    path: '/project-reviews',
    name: 'Project Reviews',
    component: ProjectReviews,
    meta: {
      requiresAdmin: true,
    }
  },
  {
    path: '/currentProjects',
    name: 'CurrentProjects',
    component: CurrentProjects,
    props: true,
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/viewProject',
    name: 'ViewProject',
    component: ViewProject,
    props: true,
    meta: {
      requiresAdmin: true
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
      requiresAuth: true,
      requiresReviewer: true
    }
  },
  {
    path: '/addreviewer',
    name: 'AddReviewer',
    component: AddReviewer,
    meta: {
      requiresAdmin: true
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
      requiresAdmin: true
    }
  },
  {
    path: '/manage-clients',
    name: 'ManageClients',
    component: ManageClients,
    meta: {
      requiresAdmin: true
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
    props: true,
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: Organizations,
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/reviewtopdf',
    name: 'ReviewToPDF',
    component: ReviewToPDF
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresReviewer = to.matched.some(record => record.meta.requiresReviewer)

  if (requiresAuth && !store.state.user.loggedIn) {
    next("Login");
  } else if (!requiresAuth && to.name !== "Default") {
    next(); 
  } else {
    if (to.name === "Default" && store.state.user.isAdmin === true) {
      next("AdminDashboard");
    } else if (to.name === "Default" && store.state.user.isClient === true) {      
      next("ClientDashboard");
    } else if (to.name === "Default" && store.state.user.isReviewer === true) {
      next("ReviewerDashboard");
    } else if (requiresAdmin && store.state.user.isAdmin !== true || requiresReviewer && store.state.user.isReviewer !== true) {
      next("AccessDenied");
    } else if (to.name === "Default" && store.state.user.isAdmin === false &&
    store.state.user.isClient === false && store.state.user.isReviewer === false) {
      // the user has been authenticated but is not either an admin, client or reviewer.
      next('Pending');   
    } else {
      next();
    }
  }
});

export default router
