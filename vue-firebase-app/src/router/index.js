/******************************************************* 
 * ./router/index.js
 * 
 * Description: Handles all of the vue routing and
 * contains records for each navigation item.
*******************************************************/
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Review from '../components/Review'
import Reviews from '../components/Reviews'
import Dashboard from '../components/Dashboard'
import EditReview from '../components/EditReview'
import AddReviewer from '../components/AddReviewer'
import Project from '../components/Project'
import NewProject from '../components/NewProject'
import CurrentProjects from '../components/CurrentProjects'
import ClientEntry from '../components/ClientEntry'

const routes = [
  {
    path: '/login',
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
    component: Dashboard
  },
  {
    path: '/edit-review',
    name: 'EditReview',
    component: EditReview
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  },
  {
    path: '/newProject',
    name: 'NewProject',
    component: NewProject
  },
  {
    path: '/currentProjects',
    name: 'CurrentProjects',
    component: CurrentProjects
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews
  },
  {
    path: '/review',
    name: 'Review',
    component: Review
  },
  {
    path: '/addreviewer',
    name: 'AddReviewer',
    component: AddReviewer
  },
  {
    path: '/clientEntry',
    name: 'ClientEntry',
    component: ClientEntry
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
