import { createRouter, createWebHistory } from 'vue-router'

import DataTable from '@/views/DataTable.vue'
import Chart from '@/views/Chart.vue'

const routes = [
  {
    path: '/data-table',
    name: 'data-table',
    component: DataTable
  },
  {
    path: '/Chart',
    name: 'Chart',
    component: Chart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
