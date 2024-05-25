<template>
  <div class="page-wrapper">
    <div class="container">
      <h1 align="center">Tabella</h1>
      
      <!-- Data Table -->
      <div class="table-wrapper">
        <table v-if="jsonData.length">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index" :class="{ 'text-left': index === 0, 'text-right': index === headers.length - 1 }">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in jsonData" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Overlay and Info Card -->
      <div class="overlay" v-if="selectedCell">
        <div class="card">
          <h2>Details</h2>
          <p>{{ selectedCell }}</p>
          <button @click="closeCard">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'DataTable',
  data() {
    return {
      jsonData: [],
      headers: [],
      selectedCell: null
    };
  },
  mounted() {
    this.loadExcelFile();
  },
  methods: {
    async loadExcelFile() {
      try {
        const response = await fetch('/Tavole-Dati-Meteoclimatici-Anno-2021.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        let json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Set the headers
        this.headers = json.shift(); // Remove the header row from data

        // Convert to object array
        this.jsonData = json;

        // Debugging: log jsonData and headers
        console.log("Headers:", this.headers);
        console.log("Json Data:", this.jsonData);
      } catch (error) {
        console.error('Error loading Excel file:', error);
      }
    },
    closeCard() {
      this.selectedCell = null;
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #87CEEB; /* Light blue background resembling the sky */
  color: #333;
  margin: 0;
  padding: 0;
}

.page-wrapper {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.container {
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.center-align:last-child {
  text-align: center;
}

h1 {
  font-family: 'Courier New', monospace;
  color: #007BFF;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  color: #333;
}

</style>
