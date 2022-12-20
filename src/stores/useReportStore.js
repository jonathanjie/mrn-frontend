import { defineStore } from "pinia";
import { ref } from "vue";

const temp = {
  // Overview
  reportNo: "4",
  legNo: "1",
  voyageNo: "2",
};

export const useReportStore = defineStore("report", () => {
  // Overview
  const reportNo = ref(temp.reportNo);
  const legNo = ref(temp.legNo);
  const voyageNo = ref(temp.voyageNo);

  return {
    reportNo,
    legNo,
    voyageNo,
  };
});
