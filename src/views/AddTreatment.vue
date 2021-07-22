<template>
  <div class="global_container">
    <div class="container">
      <div>
        <p>Description</p>
        <input id="input_description">
        <p>Date du traitement</p>
        <input type="date" id="input_treatment_date">
        <p>Date de renouvellement</p>
        <input type="date" id="input_renewal_date">
        <p>Notes diverses</p>
        <textarea rows="4" id="input_notes"></textarea>
        <br/>
        <input type="submit" value="Ajouter le nouveau traitement"  v-on:click="addTreatment">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddTreatment',
  methods: {
    addTreatment() {
        var animalParam = document.location.href.split('/');
        var idAnimal = animalParam[animalParam.length - 1];
        var elDescription = document.getElementById('input_description');
        var inputdescription = elDescription.value;
        var elNotes = document.getElementById('input_notes');
        var inputnotes = elNotes.value;
        var elDateTreatment = document.getElementById('input_treatment_date');
        var inputdatetreatment = elDateTreatment.value;
        var elDateRenewal = document.getElementById('input_renewal_date');
        var inputdaterenewal = elDateRenewal.value;
        var newTreatment = {
                "description": inputdescription,
                "notes": inputnotes,
                "animal": {
                    "animalId": idAnimal
                },
                "dateTreatment": inputdatetreatment,
                "dateRenewal": inputdaterenewal
          };
      var jsonNewTreatment = JSON.stringify(newTreatment);
      console.log(jsonNewTreatment);
      axios
      .post('http://localhost:9000/treatment',
        jsonNewTreatment,
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