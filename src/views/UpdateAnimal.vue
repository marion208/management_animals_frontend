<template>
  <div class="global_container">
    <div class="container">
      <div>
        <p>Nom de l'animal</p>
        <input id="input_name" :value="currentAnimal.name">
        <p>Numéro d'identification</p>
        <input type="number" id="input_identification"  :value="currentAnimal.identificationNumber">
        <p>Date de naissance</p>
        <input type="date" id="input_birth_date"  :value="currentAnimal.birthDate">
        <p>Notes diverses</p>
        <textarea rows="4" id="input_notes"  :value="currentAnimal.notes"></textarea>
        <p>Espèce de l'animal</p>
        <select id="input_species"  :value="currentAnimal.species.speciesId">
        <option value="">Veuillez sélectionner une valeur</option>
        <template v-for="oneSpecies in listSpecies">
            <option :key="oneSpecies.speciesId" :value="oneSpecies.speciesId">{{ oneSpecies.designation }}</option>
        </template>
        </select>
        <p>Genre de l'animal</p>
        <select id="input_gender" :value="currentAnimal.gender.genderId">
        <option value="">Veuillez sélectionner une valeur</option>
        <template v-for="gender in listGender">
            <option :key="gender.genderId" :value="gender.genderId">{{ gender.description }}</option>
        </template>
        </select>
        <br/>
        <input type="submit" value="Enregistrer les modifications"  v-on:click="updateAnimal">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateAnimal',
  data() {
    return {
        listSpecies: [],
        listGender: [],
        currentAnimal: []
    }
  },
  methods: {
    updateAnimal() {
        var animalParam = document.location.href.split('/');
        var idAnimal = animalParam[animalParam.length - 1];
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
        var updatedAnimal = {
                "animalId": idAnimal,
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
      var jsonUpdatedAnimal = JSON.stringify(updatedAnimal);
      console.log(jsonUpdatedAnimal);
      axios
      .put('http://localhost:9000/animal/' + idAnimal,
        jsonUpdatedAnimal,
        {
          headers: {
            'Content-Type': 'application/json'
        }
        })
      .then(() => this.$router.push('/manage_animals'));
    }
  },
  beforeMount() {
      var animalParam = document.location.href.split('/');
      var idAnimal = animalParam[animalParam.length - 1];
      axios
        .get('http://localhost:9000/animal/' + idAnimal)
        .then(response => (this.currentAnimal = response.data));
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