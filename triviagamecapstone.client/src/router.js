import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, hasRoles, onAuthLoaded } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authGuard
  },
  {
    path: '/adminhome',
    name: 'AdminHomePage',
    component: loadPage('AdminHomePage'),
    beforeEnter: hostGuard
  },
  {
    path: '/joingame',
    name: 'TeamJoinGame',
    component: loadPage('TeamJoinGamePage'),
    beforeEnter: authGuard
  }
]

async function hostGuard(to, from, next) {
  try {
    await onAuthLoaded()
    if (hasRoles('Host')) {
      return next()
    }
    return next({ name: 'TeamJoinGame' })
  } catch (e) {
    return next({ name: 'Home' })
  }
}

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
