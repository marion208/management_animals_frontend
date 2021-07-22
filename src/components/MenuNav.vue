<template>
  <div class="menu_bar">
    <h3>Menu</h3>
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li><a href="../manage_species">Gestion des espèces</a></li>
      <li><a href="../manage_animals">Gestion des animaux</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuNav'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0 0 40px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
}
a {
  color: #42b983;
  padding: 10px 0 10px 0;
}
</style>
