import { defineStore } from "pinia";
// import { ref } from "vue";
// import { useAuthStore } from "@/stores/useAuthStore";
import { useReportQuery } from "../queries/useReportQuery";

export const useReportDetailsStore = defineStore("ReportDetails", () => {
  // const auth = useAuthStore();
  // const report = ref({});

  // const getReport = (uuid) => {
  //   fetch(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/reports/` + uuid + "/", {
  //     headers: {
  //       Authorization: "Bearer " + auth.jwt,
  //       "Content-Type": "application/json",
  //     },
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       report.value = data;
  //       console.log("Data is fetched.");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const getReportQuery = (uuid) => {
    return useReportQuery(uuid);
  };

  return {
    // report,
    // getReport,
    getReportQuery,
  };
});
