<template>
  <v-app>
    <v-container>
      <searchBar class="mb-8" />
      <hotelsView />
    </v-container>
  </v-app>
</template>
<script>
import hotelsView from './components/hotelsView'
import searchBar from './components/searchBar'
export default {
  components: {
    hotelsView,
    searchBar
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
