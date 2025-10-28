import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/AuthPage.vue')
    },
    {
      path: '/schedules',
      name: 'agenda',
      component: () => import('@/views/SchedulingPage.vue')
    }
  ],
})

export default router
