import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/stores';

import HomeView from '../views/HomeView.vue'
import MyVesselsView from '../views/MyVesselsView.vue'
import PlanVoyageView from '../views/PlanVoyageView.vue'
import OverviewView from '../views/OverviewView.vue'
import VesselView from '../views/VesselView/VesselView.vue'
import VesselOverviewView from '../views/VesselView/VesselOverviewView.vue'
import VesselSubmittedView from '../views/VesselView/VesselSubmittedView.vue'
import VesselDraftView from '../views/VesselView/VesselDraftView.vue'
import VesselCancelledView from '../views/VesselView/VesselCancelledView.vue'
import AddReportToVesselView from '../views/AddReportToVesselView.vue'
import NoonSailingAtSeaReportView from '../views/NoonReportView/NoonSailingAtSeaReportView.vue'
import NoonCoastalWaterReportView from '../views/NoonReportView/NoonCoastalWaterReportView.vue'
import NoonInPortReportView from '../views/NoonReportView/NoonInPortReportView.vue'


const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView
  // },
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
      },
    ],
  },
  {
    path: '/vessels/:vesselname/:imo/add-report',
    name: 'vessel-report',
    component: AddReportToVesselView,
    children: [
      {
        path: 'noon-sailing-at-sea',
        name: 'noon-sailing-at-sea',
        component: NoonSailingAtSeaReportView
      },
      {
        path: 'noon-coastal-water',
        name: 'noon-coastal-water',
        component: NoonCoastalWaterReportView
      },
      {
        path: 'noon-in-port',
        name: 'noon-in-port',
        component: NoonInPortReportView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(async (to) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();

//   if (authRequired && !auth.user) {
//       auth.returnUrl = to.fullPath;
//       return '/login';
//   }
// })

export default router
