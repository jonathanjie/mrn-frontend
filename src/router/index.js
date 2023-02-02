import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

// import LoginView from '@/views/LoginView.vue'from ;
import VesselView from "@/views/VesselView/VesselView.vue";
import VesselOverview from "@/views/VesselView/VesselOverview.vue";
import VesselReportViewWrapper from "@/views/VesselView/VesselReportViewWrapper.vue";
import AddReportToVoyageView from "@/views/ReportViews/AddReportToVoyageView/AddReportToVoyageView.vue";
import NoonReportView from "@/views/ReportViews/AddReportToVoyageView/NoonReportView/NoonReportView.vue";
import ArrivalReportView from "@/views/ReportViews/AddReportToVoyageView/ArrivalReportView/ArrivalReportView.vue";
import DepartureReportView from "@/views/ReportViews/AddReportToVoyageView/DepartureReportView/DepartureReportView.vue";
import BunkerReportViewWrapper from "@/views/ReportViews/AddReportToVoyageView/BunkerReportView/BunkerReportViewWrapper.vue";
import HarbourPortReportView from "@/views/ReportViews/AddReportToVoyageView/HarbourPortReportView/HarbourPortReportView.vue";
import ReportDetailsViewWrapper from "@/views/ReportViews/ReportDetailsView/ReportDetailsViewWrapper.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView
  // },

  {
    path: "/",
    name: "home",
    component: () => import("../views/EmptyPage.vue"),
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
        path: "overview",
        name: "speed-graph-overview",
        component: () =>
          import("../views/HQViews/Overview/SpeedGraphOverview.vue"),
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
        component: () => import("../views/VesselView/VesselReportView.vue"),
        props: true,
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
        props: true,
        component: VesselOverview,
      },
      {
        path: "reports",
        name: "vessel-reports",
        props: true,
        component: VesselReportViewWrapper,
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
        component: BunkerReportViewWrapper,
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
    path: "/cii-overview",
    name: "cii-overview",
    component: () => import("../views/CIIViews/CIIOverview.vue"),
    props: true,
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
