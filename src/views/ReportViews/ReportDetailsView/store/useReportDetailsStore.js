import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

export const useReportDetailsStore = defineStore("ReportDetails", () => {
  const auth = useAuthStore();
  const report = ref({});

  const getReport = (uuid) => {
    fetch("https://testapi.marinachain.io/marinanet/reports/" + uuid + "/", {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        report.value = data;
        console.log("Data is fetched.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const getReport = async (uuid) => {
  //   fetch("https://testapi.marinachain.io/marinanet/reports/" + uuid + "/", {
  //     headers: {
  //       Authorization: "Bearer " + auth.jwt,
  //       "Content-Type": "application/json",
  //     },
  //     method: "GET",
  //   });
  // };

  return {
    report,
    getReport,
  };
});
