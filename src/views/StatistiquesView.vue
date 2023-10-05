<script setup>
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import { reactive, onMounted, ref, computed } from "vue";
import axios from "@/config/axios";
import TableStats from "@/components/TableStats.vue";
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";

const store = useStore();

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut } from "vue-chartjs";
import { Bar } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { Line } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend, PointElement, LineElement);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useStore } from "vuex";

const gridApi = ref(null); // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api;
};

const allStats = computed(() => store.getters["articles/allStats"]);

const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [{ field: "name" }, { field: "sortie" }, { field: "price" }],
});

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

// Example load data from server
onMounted(async () => {
  await axios
    .get("/article/stats/all")
    .then((remoteRowData) => (rowData.value = remoteRowData.data.data));
});
const deselectRows = () => {
  gridApi.value.deselectAll();
};

const data = reactive({
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
});

const dataBand = reactive({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
});

const dataPie = reactive({
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
});

const dataLine = reactive({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
});

const options = reactive({
  responsive: true,
  maintainAspectRatio: false,
});
</script>
<template>
  <div>
    <div class="h-52">
      <Doughnut :data="data" :options="options" />
    </div>

    <div class="h-52">
      <Bar :data="dataBand" :options="options" />
    </div>

    <div class="h-52">
      <Pie :data="dataPie" :options="options" />
    </div>

    <div class="h-52">
      <Line :data="dataLine" :options="options" />
    </div>

    <!-- <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 500px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue> -->

    <CardBox>
      <div v-for="(item, index) in allStats" :key="index">
        <div v-if="item.sortie.length" class="p-3 border-t">
          <div class="p-1 font-bold text-xl border border-emerald-400">
            {{ item.name }}
          </div>
          <div v-if="item.sortie.length">
            <TableStats :details="item.sortie" />
          </div>
        </div>
        <!-- <div v-if="!item.sortie.length" class="flex items-center justify-center text-gray-400">
          <vue-feather type="search"></vue-feather>
          <div>Aucune sortie</div>
        </div> -->
      </div>
    </CardBox>
  </div>
</template>
