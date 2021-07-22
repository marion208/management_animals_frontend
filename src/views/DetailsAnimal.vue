<template>
  <div class="global_container">
    <div class="container">
      <div class="item_container">
        <p class="container-header">
            <span>Nom : {{ currentAnimal.name }}</span>
            <span>
                <icon-base icon-name="Modifier" class="icon_button" v-on:click.native="goUpdate(currentAnimal.animalId)"><icon-write /></icon-base>
                <icon-base icon-name="Supprimer" class="icon_button" v-on:click.native="deleteAnimal(currentAnimal.animalId)"><icon-garbage /></icon-base>
            </span>
        </p>
        <p>Numéro d'identification : {{ currentAnimal.identificationNumber }}</p>
        <p>Date de naissance : {{ birthDate }}</p>
        <p>Notes diverses : {{ currentAnimal.notes }}</p>
        <p>Espèce de l'animal : {{ currentAnimal.species.designation }}</p>
        <p>Genre de l'animal : {{ currentAnimal.gender.description }}</p>
      </div>
      <div class="item_container">
        <p class="container-header">
            <span>Evolution du poids</span>
            <span>
              <icon-base icon-name="Modifier" class="icon_button" v-on:click.native="goListWeigh(currentAnimal.animalId)"><icon-write /></icon-base>
              <span class="button_add icon_button" title="Ajouter une pesée" v-on:click="addWeigh(currentAnimal.animalId)">+</span>
            </span>
        </p>
        <Chart/>
      </div>
      <div class="item_container">
        <p class="container-header">
            <span>Liste des traitements</span>
            <span class="button_add" title="Ajouter un traitement" v-on:click="addTreatment(currentAnimal.animalId)">+</span>
        </p>
        <template v-for="treatment in listTreatments">
            <div :key="treatment.treatmentId" class="treatement_div">
                <p class="container-header">
                    <span>{{ treatment.description }}</span>
                    <span>
                        <icon-base icon-name="Modifier" class="icon_button" v-on:click.native="goUpdateTreatment(treatment.treatmentId)"><icon-write /></icon-base>
                        <icon-base icon-name="Supprimer" class="icon_button" v-on:click.native="deleteTreatment(treatment.treatmentId)"><icon-garbage /></icon-base>
                    </span>
                </p>
                <p>Date du traitement : {{ treatment.dateTreatment }}</p>
                <p>Date du renouvellement : {{ treatment.dateRenewal }}</p>
                <p>Notes : {{ treatment.notes }}</p>
            </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconWrite from '@/components/icons/IconWrite.vue';
import IconGarbage from '@/components/icons/IconGarbage.vue';
import Chart from '@/components/Chart.vue';
import axios from 'axios';

export default {
  name: 'UpdateAnimal',
  components: {
    IconBase,
    IconWrite,
    IconGarbage,
    Chart
  },
  data() {
    return {
        currentAnimal: [],
        birthDate: '',
        listWeighings: [],
        listTreatments: []
    }
  },
  methods: {
      addWeigh(idAnimal) {
        this.$router.push('/add_weigh/' + idAnimal)
      },
      addTreatment(idAnimal) {
        this.$router.push('/add_treatment/' + idAnimal)
      },
      goUpdate(idAnimal) {
        this.$router.push('/update_animal/' + idAnimal)
      },
      goUpdateWeighing(idWeighing) {
        this.$router.push('/update_weighing/' + idWeighing)
      },
      goUpdateTreatment(idTreatment) {
          this.$router.push('/update_treatment/' + idTreatment)
      },
      goListWeigh(idAnimal) {
        this.$router.push('/list_weighings/' + idAnimal)
      },
      deleteAnimal(idAnimal) {
          axios
            .delete('http://localhost:9000/delete_animal/' + idAnimal)
            .then(() => this.$router.push('/manage_animals'));
      },
      deleteWeighing(idWeighing) {
          var animalParam = document.location.href.split('/');
        var idAnimal = animalParam[animalParam.length - 1];
          axios
            .delete('http://localhost:9000/delete_weighing/' + idWeighing)
            .then(() => axios
        .get('http://localhost:9000/weighings/' + idAnimal)
        .then(response => {
            this.listWeighings = response.data;
            response.data.forEach(
                element => {
                    var dateWeighingSplitted = element.weighingDate.split('-');
                    var dateWeighing = dateWeighingSplitted[2] + '-' + dateWeighingSplitted[1] + '-' + dateWeighingSplitted[0];
                    element.weighingDate = dateWeighing;
                })
            }));
      },
      deleteTreatment(idTreatment) {
          var animalParam = document.location.href.split('/');
        var idAnimal = animalParam[animalParam.length - 1];
          axios
            .delete('http://localhost:9000/delete_treatment/' + idTreatment)
            .then(() => axios
        .get('http://localhost:9000/treatments/' + idAnimal)
        .then(response => {
            this.listTreatments = response.data;
            response.data.forEach(
                element => {
                    var dateTreatmentSplitted = element.dateTreatment.split('-');
                    var dateTreatment = dateTreatmentSplitted[2] + '-' + dateTreatmentSplitted[1] + '-' + dateTreatmentSplitted[0];
                    var dateRenewalSplitted = element.dateRenewal.split('-');
                    var dateRenewal = dateRenewalSplitted[2] + '-' + dateRenewalSplitted[1] + '-' + dateRenewalSplitted[0];
                    element.dateTreatment = dateTreatment;
                    element.dateRenewal = dateRenewal;
                })
            }));
      },
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
        var descriptionGender = '';
        this.listGender.forEach(element => {
            if (element['genderId'] == inputGender) {
                descriptionGender = element['description'];
            }
        });
        var elSpecies = document.getElementById('input_species');
        var inputSpecies = elSpecies.value;
        var descriptionSpecies = '';
        this.listSpecies.forEach(element => {
            if (element['speciesId'] == inputSpecies) {
                descriptionSpecies = element['designation'];
            }
        });
        var updatedAnimal = {
                "animalId": idAnimal,
                "name": inputName,
                "identificationNumber": inputIdentificationNumber,
                "birthDate": inputBirthDate,
                "notes": inputNotes,
                "gender": {
                    "genderId": inputGender,
                    "description": descriptionGender
                },
                "species": {
                    "speciesId": inputSpecies,
                    "designation": descriptionSpecies
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
        .then(response => {
            this.currentAnimal = response.data;
            var birthDateSplitted = response.data.birthDate.split('-');
            this.birthDate = birthDateSplitted[2] + '-' + birthDateSplitted[1] + '-' + birthDateSplitted[0];
            });
        axios
        .get('http://localhost:9000/weighings/' + idAnimal)
        .then(response => {
            this.listWeighings = response.data;
            response.data.forEach(
                element => {
                    var dateWeighingSplitted = element.weighingDate.split('-');
                    var dateWeighing = dateWeighingSplitted[2] + '-' + dateWeighingSplitted[1] + '-' + dateWeighingSplitted[0];
                    element.weighingDate = dateWeighing;
                })
            });
        axios
        .get('http://localhost:9000/treatments/' + idAnimal)
        .then(response => {
            this.listTreatments = response.data;
            response.data.forEach(
                element => {
                    var dateTreatmentSplitted = element.dateTreatment.split('-');
                    var dateTreatment = dateTreatmentSplitted[2] + '-' + dateTreatmentSplitted[1] + '-' + dateTreatmentSplitted[0];
                    var dateRenewalSplitted = element.dateRenewal.split('-');
                    var dateRenewal = dateRenewalSplitted[2] + '-' + dateRenewalSplitted[1] + '-' + dateRenewalSplitted[0];
                    element.dateTreatment = dateTreatment;
                    element.dateRenewal = dateRenewal;
                })
            });
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
  flex-direction: column;
  align-items: center;
}
.item_container {
    border: 2px solid rgb(55,167,148);
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    text-align: left;
    min-width: 500px;
}
.container-header {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0 0 0;
}
.container-header > .button_add {
    font-size: 1.8em;
}
.container-header > .button_add:hover {
    cursor: pointer;
}
.treatement_div {
    border: 2px solid rgb(55,167,148);
    border-radius: 5px;
    margin: 10px;
    padding: 10px 10px 0 10px;
}
.icon_button:hover {
    cursor: pointer;
}
</style>