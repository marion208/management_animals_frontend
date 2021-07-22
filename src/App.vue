<template>
  <div id="app">
    <div id="nav">
      <MenuNav/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import MenuNav from '@/components/MenuNav.vue'

export default {
  name: 'app',
  components: {
    MenuNav
  }
}
</script>

<style>
body {
  margin: 0px;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
}

#nav {
  display: flex;
  justify-content: center;
  width: 20vw;
  background-color: rgb(181,220,202);
}

.menu_bar {
  position: fixed;
  margin-top: 35vh;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
