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
import AddReviewer from '../components/AddReviewer'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
