import { defineStore } from "pinia";
import { ref, reactive, computed, onMounted } from "vue";

export const useReportDetailsStore = defineStore("ReportDetails", () => {
  const report = ref({});

  const getReport = (uuid) => {
    fetch("https://testapi.marinachain.io/marinanet/reports/" + uuid)
      .then((response) => response.json())
      .then((data) => {
        report.value = data;
        console.log("Data is fetched.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    report,
    getReport,
  };
});
