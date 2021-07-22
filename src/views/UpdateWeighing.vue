<template>
  <div class="global_container">
    <div class="container">
      <div>
        <p>Valeur du poids</p>
        <input type="number" min="0" step="1" id="weigh_value" :value="currentWeighing.weighValue">
        <p>Date de la pesée</p>
        <input type="date" id="input_weighing_date" :value="currentWeighing.weighingDate">
        <br/>
        <input type="submit" value="Enregistrer les modifications"  v-on:click="updateWeigh">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateWeighing',
  data() {
    return {
      currentWeighing: []
    }
  },
  methods: {
    updateWeigh() {
        var weighingParam = document.location.href.split('/');
        var idWeighing = weighingParam[weighingParam.length - 1];
      var elWeigh = document.getElementById('weigh_value');
      var inputweigh = elWeigh.value;
      var elDateWeigh = document.getElementById('input_weighing_date');
      var inputdateweigh = elDateWeigh.value;
      var updatedWeigh = {
                "weighValue": inputweigh,
                "weighingDate": inputdateweigh
          };
      var jsonUpdatedWeigh = JSON.stringify(updatedWeigh);
      console.log(jsonUpdatedWeigh);
      axios
      .put('http://localhost:9000/weighing/' + idWeighing,
        jsonUpdatedWeigh,
        {
          headers: {
            'Content-Type': 'application/json'
        }
        })
      .then(() => this.$router.push('/animal/' + this.currentWeighing.animal.animalId));
    }
  },
  mounted() {
      var weighingParam = document.location.href.split('/');
      var idWeighing = weighingParam[weighingParam.length - 1];
      axios
      .get('http://localhost:9000/weighing/' + idWeighing)
      .then(response => (this.currentWeighing = response.data))
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