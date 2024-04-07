import { i18n } from '@/i18n/config'
import { webTitle } from '@/libs/common'
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
          // ArticleLayout
          path: '/',
          component: () => import('@/layouts/ArticleLayout.vue'),
          children: [
            {
              path: '/',
              name: 'index',
              meta: { title: 'page.Home' },
              component: () => import('@/pages/Dashboard/DashboardPage.vue')
            }
          ]
        },
        {
          // SettingLayout
          path: 'settings',
          name: 'settings',
          meta: { title: 'page.Settings' },
          component: () => import('@/layouts/SettingsLayout.vue'),
          children: [
            {
              path: 'language',
              meta: { title: 'page.Language' },
              component: () => import('@/pages/Settings/LanguagePage.vue')
            },
            {
              path: 'theme',
              meta: { title: 'page.Theme' },
              component: () => import('@/pages/Settings/ThemePage.vue')
            }
          ]
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
      meta: { title: 'page.Login' },
      component: () => import('@/pages/Login/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'page.Register' },
      component: () => import('@/pages/Register/RegisterPage.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'index' } }
  ]
})

router.beforeEach((to) => {
  const login = useLoginStore()
  const { t } = i18n.global

  if (to.meta.requiresAuth && !login.loginState) {
    return { name: 'login', query: { url: to.fullPath } }
  }

  // if (to.meta.roles && !login.checkRole(to.meta.roles)) {
  //   return { name: 'message', params: { message: 'Forbidden' } }
  // }

  router.afterEach((to, from, failure) => {
    if (!failure) {
      webTitle.value = t(to.meta.title as string)
    }
  })
})

export default router
