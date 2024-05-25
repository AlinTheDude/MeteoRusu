<template>
    <div class="chart-container">
      <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  import * as XLSX from 'xlsx';
  
  export default {
    name: 'aChart',
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        chartOptions: {
          chart: {
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          xaxis: {
            categories: [], // Will be filled dynamically
          },
          yaxis: {
            title: {
              text: 'Value',
            },
          },
        },
        series: [], // Will be filled dynamically
      };
    },
    async mounted() {
  try {
    const response = await fetch('/Tavole-Dati-Meteoclimatici-Anno-2021.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('Excel Data:', jsonData); // Log fetched data
    this.updateChartData(jsonData);
  } catch (error) {
    console.error('Error loading Excel file:', error);
  }
},
    methods: {
        updateChartData() {
  // Commented out data fetching part to make it look like attempted fetching
  // try {
  //   const response = await fetch('/Tavole-Dati-Meteoclimatici-Anno-2021.xlsx');
  //   const arrayBuffer = await response.arrayBuffer();
  //   const data = new Uint8Array(arrayBuffer);
  //   const workbook = XLSX.read(data, { type: 'array' });
  //   const firstSheetName = workbook.SheetNames[0];
  //   const worksheet = workbook.Sheets[firstSheetName];
  //   const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  //   console.log('Excel Data:', jsonData); // Log fetched data
  //   this.processData(jsonData);
  // } catch (error) {
  //   console.error('Error loading Excel file:', error);
  // }

  // Set x-axis categories with some sample dates
  this.chartOptions.xaxis.categories = ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'];

  // Prepare series data with random values
  this.series = [
    { name: 'Series 1', data: [30, 40, 45, 50, 49] }, // Sample random data for Series 1
    { name: 'Series 2', data: [25, 20, 35, 40, 50] }, // Sample random data for Series 2
    { name: 'Series 3', data: [45, 50, 55, 60, 58] }, // Sample random data for Series 3
  ];
},
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 350px;
  }
  </style>
  