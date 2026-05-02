import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CoursesView from '../views/CoursesView.vue'
import FeaturesView from '../views/FeaturesView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import TestAxiosView from '../views/TestAxiosView.vue'
import { apiCheckLogin } from '../api'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/courses',
    path: '/courses',
    name: 'Courses',
    component: CoursesView
  },
  {
    path: '/features',
    name: 'Features',
    component: FeaturesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/test-axios',
    name: 'TestAxios',
    component: TestAxiosView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 检查是否登录
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  if (requiresAuth) {
    try {
      const result = await apiCheckLogin()
      if (!result.data.isLoggedIn) {
        // 跳转到登录页，并记录目标页面
        next({ path: '/login', query: { redirect: to.path } })
      } else {
        next()
      }
    } catch (error) {
      next({ path: '/login', query: { redirect: to.path } })
    }
  } else {
    next()
  }
})

export default router
