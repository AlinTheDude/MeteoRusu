<template>
  <div id="app">
    <nav>
      <router-link to="/data-table">Data Table</router-link>
    </nav>
    <nav>
      <router-link to="/Chart">Chart</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #87CEEB; /* Light blue background resembling the sky */
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
