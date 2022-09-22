import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyVesselsView from '../views/MyVesselsView.vue'
import PlanVoyageView from '../views/PlanVoyageView.vue'
import OverviewView from '../views/OverviewView.vue'
import VesselView from '../views/VesselView/VesselView.vue'
import VesselOverviewView from '../views/VesselView/VesselOverviewView.vue'
import VesselSubmittedView from '../views/VesselView/VesselSubmittedView.vue'
import VesselDraftView from '../views/VesselView/VesselDraftView.vue'
import VesselCancelledView from '../views/VesselView/VesselCancelledView.vue'

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
    component: MyVesselsView
  },
  {
    path: '/plan-voyage',
    name: 'plan-voyage',
    component: PlanVoyageView
  },
  {
    path: '/vessels/:vesselname/:imo', 
    component: VesselView,
    children: [
      {
        path: 'overview',
        name: 'vessel-overview',
        component: VesselOverviewView
      },
      {
        path: 'submitted',
        name: 'vessel-submitted',
        component: VesselSubmittedView
      },
      {
        path: 'draft',
        name: 'vessel-draft',
        component: VesselDraftView
      },
      {
        path: 'cancelled',
        name: 'vessel-cancelled',
        component: VesselCancelledView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
