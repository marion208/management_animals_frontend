<template>
  <div class="global_container">
    <div class="container">
      <div>
        <p>Nom de l'espèce</p>
        <input id="input_species" :value="currentSpecies.designation">
        <br/>
        <input type="submit" value="Enregistrer les modifications"  v-on:click="updateSpecies">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateSpecies',
  data() {
    return {
      currentSpecies: []
    }
  },
  methods: {
    updateSpecies() {
      var el = document.getElementById('input_species');
      var inputtext = el.value;
      var updatedSpecies = {
                "designation": inputtext
          };
      var jsonUpdatedSpecies = JSON.stringify(updatedSpecies);
      var speciesParam = document.location.href.split('/');
      var idSpecies = speciesParam[speciesParam.length - 1];
      axios
      .put('http://localhost:9000/species/' + idSpecies,
        jsonUpdatedSpecies,
        {
          headers: {
            'Content-Type': 'application/json'
        }
        })
      .then(() => this.$router.push('/manage_species'));
    }
  },
  mounted() {
      var speciesParam = document.location.href.split('/');
      var idSpecies = speciesParam[speciesParam.length - 1];
      axios
      .get('http://localhost:9000/species/' + idSpecies)
      .then(response => (this.currentSpecies = response.data))
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