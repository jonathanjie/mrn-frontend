import { createRouter, createWebHistory } from "vue-router";
import { authGuard, useAuth0 } from "@auth0/auth0-vue";

// import LoginView from '../views/LoginView.vue'
import HomeView from "../views/HomeView.vue";
import SpeedGraph from "../views/HQViews/SpeedGraph.vue";
import PlanVoyageView from "../views/PlanVoyageView.vue";
import VesselView from "../views/VesselView/VesselView.vue";
import VesselOverviewView from "../views/VesselView/VesselOverviewView.vue";
import VesselSubmittedView from "../views/VesselView/VesselSubmittedView.vue";
import VesselDraftView from "../views/VesselView/VesselDraftView.vue";
import VesselCancelledView from "../views/VesselView/VesselCancelledView.vue";
import AddReportToVoyageView from "../views/AddReportToVoyageView.vue";
import NoonReportView from "../views/ReportViews/NoonReportView.vue";
import ArrivalReportView from "../views/ReportViews/ArrivalReportView.vue";
import DepartureReportView from "../views/ReportViews/DepartureReportView.vue";
import BunkerReportView from "../views/ReportViews/BunkerReportView.vue";
import HarbourPortReportView from "../views/ReportViews/HarbourPortReportView.vue";
import VesselSpec from "../views/VesselSpec.vue";
import SpeedGraphOverview from "../views/HQViews/SpeedGraphOverview.vue";
import HQView from "../views/HQViews/HQView";
import Forbidden from "../views/Forbidden.vue";

const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView
  // },
  {
    path: "/forbidden",
    name: "forbidden",
    component: Forbidden,
    beforeEnter: authGuard,
  },
  {
    // Need to edit
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: authGuard,
  },
  {
    path: "/my-vessels",
    name: "my-vessels",
    component: HQView,
    beforeEnter: authGuard,
  },
  {
    path: "/speed-graph/:vesselname/:imo",
    name: "speed-graph",
    component: SpeedGraph,
    props: true,
    children: [
      {
        path: "overview",
        name: "speed-graph-overview",
        component: SpeedGraphOverview,
        props: true,
        beforeEnter: authGuard,
      },
      {
        path: "vessel-spec",
        name: "vessel-spec",
        component: VesselSpec,
        props: true,
        beforeEnter: authGuard,
      },
      {
        path: "uploaded-reports",
        name: "uploaded-reports",
        component: VesselOverviewView,
        props: true, // To pass HQ parameter to hide Add Report Button
        beforeEnter: authGuard,
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: "/plan-voyage",
    name: "plan-voyage",
    component: PlanVoyageView,
    beforeEnter: authGuard,
  },
  {
    path: "/vessels/:vesselname/:imo/:specs",
    component: VesselView,
    props: true,
    children: [
      {
        path: "overview",
        name: "vessel-overview",
        component: VesselOverviewView,
      },
      {
        path: "submitted",
        name: "vessel-submitted",
        component: VesselSubmittedView,
      },
      {
        path: "draft",
        name: "vessel-draft",
        component: VesselDraftView,
      },
      {
        path: "cancelled",
        name: "vessel-cancelled",
        component: VesselCancelledView,
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: "/vessels/:vesselname/:imo/add-report",
    name: "vessel-report",
    component: AddReportToVoyageView,
    children: [
      {
        path: "noon",
        name: "noon",
        component: NoonReportView,
      },
      {
        path: "departure",
        name: "departure",
        component: DepartureReportView,
      },
      {
        path: "arrival",
        name: "arrival",
        component: ArrivalReportView,
      },
      {
        path: "harbour-port",
        name: "harbour-port",
        component: HarbourPortReportView,
      },
      {
        path: "bunker-delivery",
        name: "bunker-delivery",
        component: BunkerReportView,
      },
    ],
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
