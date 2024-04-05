import { useLoginStore } from '@/stores/login'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: { requiresAuth: true },
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('@/pages/Dashboard/DashboardPage.vue')
        },
        {
          path: '/message/:message',
          name: 'message',
          component: () => import('@/pages/MessagePage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login/LoginPage.vue')
    },
    {
      path: '/test',
      component: () => import('@/pages/Comp1Page.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'index' } }
  ]
})

router.beforeEach((to) => {
  const login = useLoginStore()

  if (to.meta.requiresAuth && !login.loginState) {
    return '/login'
  }

  // if (to.meta.roles && !login.checkRole(to.meta.roles)) {
  //   return { name: 'message', params: { message: 'Forbidden' } }
  // }
})

export default router
