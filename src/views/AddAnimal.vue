<template>
  <div class="global_container">
    <div class="container">
      <div>
          <p>Nom de l'animal</p>
          <input id="input_name">
          <p>Numéro d'identification</p>
          <input type="number" id="input_identification">
          <p>Date de naissance</p>
          <input type="date" id="input_birth_date">
          <p>Notes diverses</p>
          <textarea rows="4" id="input_notes"></textarea>
          <p>Espèce de l'animal</p>
          <select id="input_species">
            <option value="">Veuillez sélectionner une valeur</option>
            <template v-for="oneSpecies in listSpecies">
              <option :key="oneSpecies.speciesId" :value="oneSpecies.speciesId">{{ oneSpecies.designation }}</option>
            </template>
          </select>
          <p>Genre de l'animal</p>
          <select id="input_gender">
            <option value="">Veuillez sélectionner une valeur</option>
            <template v-for="gender in listGender">
              <option :key="gender.genderId" :value="gender.genderId">{{ gender.description }}</option>
            </template>
          </select>
          <br/>
          <input type="submit" value="Ajout le nouvel animal" v-on:click="addAnimal">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddOneSpecies',
  data() {
    return {
      listSpecies: [],
      listGender: []
    }
  },
  methods: {
    addAnimal() {
      var elName = document.getElementById('input_name');
      var inputName = elName.value;
      var elIdentificationNumber = document.getElementById('input_identification');
      var inputIdentificationNumber = elIdentificationNumber.value;
      var elBirthDate = document.getElementById('input_birth_date');
      var inputBirthDate = elBirthDate.value;
      var elNotes = document.getElementById('input_notes');
      var inputNotes = elNotes.value;
      var elGender = document.getElementById('input_gender');
      var inputGender = elGender.value;
      var elSpecies = document.getElementById('input_species');
      var inputSpecies = elSpecies.value;
      var newAnimal = {
                "name": inputName,
                "identificationNumber": inputIdentificationNumber,
                "birthDate": inputBirthDate,
                "notes": inputNotes,
                "gender": {
                    "genderId": inputGender
                },
                "species": {
                    "speciesId": inputSpecies
                }
          };
      var jsonNewAnimal = JSON.stringify(newAnimal);
      console.log(jsonNewAnimal);
      axios
      .post('http://localhost:9000/animal',
        jsonNewAnimal,
        {
          headers: {
            'Content-Type': 'application/json'
        }
        })
      .then(() => this.$router.push('/manage_animals'));
    }
  },
  mounted () {
     axios
      .get('http://localhost:9000/genders')
      .then(response => (this.listGender = response.data));
    axios
      .get('http://localhost:9000/species')
      .then(response => (this.listSpecies = response.data));
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
input, select {
  height: 2em;
  text-align: center;
}
input[type=number] {
  height: 1.5em;
}
textarea {
  min-width: 30vw;
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