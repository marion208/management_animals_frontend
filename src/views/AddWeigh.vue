<template>
  <div class="global_container">
    <div class="container">
      <div>
        <p>Valeur du poids</p>
        <input type="number" id="weigh_value">
        <p>Date de la pesée</p>
        <input type="date" id="input_weighing_date">
        <br/>
        <input type="submit" value="Ajouter la nouvelle pesée"  v-on:click="addWeigh">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddWeigh',
  methods: {
    addWeigh() {
        var animalParam = document.location.href.split('/');
        var idAnimal = animalParam[animalParam.length - 1];
      var elWeigh = document.getElementById('weigh_value');
      var inputweigh = elWeigh.value;
      var elDateWeigh = document.getElementById('input_weighing_date');
      var inputdateweigh = elDateWeigh.value;
      var newWeigh = {
                "weighValue": inputweigh,
                "weighingDate": inputdateweigh,
                "animal": {
                    "animalId": idAnimal
                }
          };
      var jsonNewWeigh = JSON.stringify(newWeigh);
      console.log(jsonNewWeigh);
      axios
      .post('http://localhost:9000/weighing',
        jsonNewWeigh,
        {
          headers: {
            'Content-Type': 'application/json'
        }
        })
      .then(() => this.$router.push('/animal/' + idAnimal));
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