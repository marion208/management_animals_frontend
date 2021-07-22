<template>
  <div class="global_container">
    <div class="container">
      <div>
        <p>Nom de l'espèce</p>
        <input id="input_species">
        <br/>
        <input type="submit" value="Ajouter la nouvelle espèce"  v-on:click="addOneSpecies">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddOneSpecies',
  methods: {
    addOneSpecies() {
      var el = document.getElementById('input_species');
      var inputtext = el.value;
      var newSpecies = {
                "designation": inputtext
          };
      var jsonNewSpecies = JSON.stringify(newSpecies);
      axios
      .post('http://localhost:9000/newspecies',
        jsonNewSpecies,
        {
          headers: {
            'Content-Type': 'application/json'
        }
        })
      .then(() => this.$router.push('/manage_species'));
    }
  }
}
</script>

<style scoped>
.global_container {
  display: flex;
}
.container {
  width: 80vw;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  height: 2em;
  text-align: center;
}

input[type=submit] {
  font-size: 1em;
  text-transform: uppercase;
  background-color: rgb(55,167,148);
  color: white;
  font-weight: bold;
  border: 0;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin: 30px 0 30px 0;
}
input[type=submit]:hover {
  background-color: rgb(21,123,106);
  cursor: pointer;
}
</style>