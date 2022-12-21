import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

// import LoginView from '../views/LoginView.vue'from ;
import VesselView from "../views/VesselView/VesselView.vue";
import VesselOverviewView from "../views/VesselView/VesselOverviewView.vue";
import AddReportToVoyageView from "../views/ReportViews/AddReportToVoyageView.vue";
import NoonReportView from "../views/ReportViews/NoonReportView.vue";
import ArrivalReportView from "../views/ReportViews/ArrivalReportView.vue";
import DepartureReportView from "../views/ReportViews/DepartureReportView.vue";
import BunkerReportView from "../views/ReportViews/BunkerReportView.vue";
import HarbourPortReportView from "../views/ReportViews/HarbourPortReportView.vue";
import ReportDetailsViewWrapper from "../views/ReportViews/ReportDetailsView/ReportDetailsViewWrapper.vue";

import NotFound from "../views/NotFound.vue";

const routes = [
  {
    // Need to edit
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/my-vessels",
    name: "my-vessels",
    component: () => import("../views/HQViews/HQView"),
    beforeEnter: authGuard,
  },
  {
    path: "/speed-graph/:vesselname/:imo",
    name: "speed-graph",
    component: () => import("../views/HQViews/SpeedGraph.vue"),
    props: true,
    children: [
      {
        path: "speed-graph-overview",
        name: "speed-graph-overview",
        component: () => import("../views/HQViews/SpeedGraphOverview.vue"),
        props: true,
        beforeEnter: authGuard,
      },
      {
        path: "vessel-spec",
        name: "vessel-spec",
        component: () => import("../views/VesselSpec.vue"),
        props: true,
        beforeEnter: authGuard,
      },
      {
        path: "uploaded-reports",
        name: "uploaded-reports",
        component: () => import("../views/VesselView/VesselOverviewView.vue"),
        beforeEnter: authGuard,
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: "/vessels/:vesselname/:imo",
    component: VesselView,
    props: true,
    children: [
      {
        path: "overview",
        name: "vessel-overview",
        component: VesselOverviewView,
      },
      {
        path: "vessel-spec",
        name: "vessel-spec",
        component: () => import("../views/VesselSpec.vue"),
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: "/vessels/:vesselname/:imo/add-report",
    name: "add-report",
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
  {
    path: "/vessels/:vesselname/:imo/report/:uuid",
    name: "report-details",
    component: ReportDetailsViewWrapper,
    props: true,
    // children: [
    //   {
    //     path: "noon",
    //     name: "noon",
    //     component: NoonReportView,
    //   },
    // ],
    beforeEnter: authGuard,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
