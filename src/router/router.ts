import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to) => {
    if (to) {
      return { selector: to.hash }
    }

    return { left: 0, top: 0 }
  },
})

export default router
