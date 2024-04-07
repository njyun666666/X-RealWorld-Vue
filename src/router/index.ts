import { useLoginStore } from '@/stores/login'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // meta: { requiresAuth: true },
      component: () => import('@/layouts/XLayout.vue'),
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('@/pages/Dashboard/DashboardPage.vue')
        },
        {
          path: 'message/:message',
          name: 'message',
          component: () => import('@/pages/MessagePage.vue')
        },
        {
          path: '/demo',
          children: [
            {
              path: 'ParentChildPassValue',
              component: () => import('@/pages/Demo/ParentChildPassValue/Comp1Page.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/Register/RegisterPage.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'index' } }
  ]
})

router.beforeEach((to) => {
  const login = useLoginStore()

  if (to.meta.requiresAuth && !login.loginState) {
    return { name: 'login', query: { url: to.fullPath } }
  }

  // if (to.meta.roles && !login.checkRole(to.meta.roles)) {
  //   return { name: 'message', params: { message: 'Forbidden' } }
  // }
})

export default router
