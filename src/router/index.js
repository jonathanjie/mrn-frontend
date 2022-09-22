import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VesselsView from '../views/VesselsView.vue'
import PlanVoyageView from '../views/PlanVoyageView.vue'
import OverviewView from '../views/OverviewView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/overview',
    name: 'overview',
    component: OverviewView
  },
  {
    path: '/my-vessels',
    name: 'my-vessels',
    component: VesselsView
  },
  {
    path: '/plan-voyage',
    name: 'plan-voyage',
    component: PlanVoyageView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
