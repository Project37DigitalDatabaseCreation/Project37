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
import ProjectReviews from '../components/ProjectReviews'
import AddReviewer from '../components/AddReviewer'
import ModifyReviewer from '../components/ModifyReviewer'
import Project from '../components/Project'
import NewProject from '../components/NewProject'
import CurrentProjects from '../components/CurrentProjects'
import ManageReviewers from '../components/ManageReviewers'
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
    path: '/project-reviews',
    name: 'Project Reviews',
    component: ProjectReviews
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
    path: '/managereviewers',
    name: 'ManageReviewers',
    component: ManageReviewers
  },
  {

    path: '/modifyreviewer',
    name: 'ModifyReviewer',
    component: ModifyReviewer
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
