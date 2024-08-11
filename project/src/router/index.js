import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'clientes',
      component: () => import('../views/Clientes.vue')
    },
    {
      path: '/vendas',
      name: 'vendas',
      component: () => import('../views/Vendas.vue')
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: () => import('../views/Relatorios.vue')
    },
  ]
})

export default router
