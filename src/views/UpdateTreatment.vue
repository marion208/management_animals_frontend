<template>
  <div class="global_container">
    <div class="container">
      <div>
        <p>Description</p>
        <input id="input_description" :value="currentTreatment.description">
        <p>Date du traitement</p>
        <input type="date" id="input_treatment_date" :value="currentTreatment.dateTreatment">
        <p>Date de renouvellement</p>
        <input type="date" id="input_renewal_date" :value="currentTreatment.dateRenewal">
        <p>Notes diverses</p>
        <textarea rows="4" id="input_notes" :value="currentTreatment.notes"></textarea>
        <br/>
        <input type="submit" value="Enregistrer les modifications"  v-on:click="updateTreatment">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdatedTreatment',
  data() {
    return {
      currentTreatment: []
    }
  },
  methods: {
    updateTreatment() {
        var treatmentParam = document.location.href.split('/');
        var idTreatment = treatmentParam[treatmentParam.length - 1];
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
                "dateTreatment": inputdatetreatment,
                "dateRenewal": inputdaterenewal
          };
      var jsonNewTreatment = JSON.stringify(newTreatment);
      console.log(jsonNewTreatment);
      axios
      .put('http://localhost:9000/treatment/' + idTreatment,
        jsonNewTreatment,
        {
          headers: {
            'Content-Type': 'application/json'
        }
        })
      .then(() => this.$router.push('/animal/' + this.currentTreatment.animal.animalId));
    }
  },
  mounted() {
      var treatmentParam = document.location.href.split('/');
      var idTreatment = treatmentParam[treatmentParam.length - 1];
      axios
      .get('http://localhost:9000/treatment/' + idTreatment)
      .then(response => (this.currentTreatment = response.data))
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