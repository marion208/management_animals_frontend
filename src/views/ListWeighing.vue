<template>
  <div class="global_container">
    <div class="container">
      <div class="item_container">
        <p class="container-header">
            <span>Nom : {{ currentAnimal.name }}</span>
        </p>
        <p>Espèce de l'animal : {{ currentAnimal.species.designation }}</p>
        <p>Genre de l'animal : {{ currentAnimal.gender.description }}</p>
        <p class="container-header">
            <span>Evolution du poids</span>
            <span>
              <span class="button_add icon_button" title="Ajouter une pesée" v-on:click="addWeigh(currentAnimal.animalId)">+</span>
            </span>
        </p>
        <template v-for="weighing in listWeighings">
            <p :key="weighing.weighingId" class="weigh_list">
                <span>{{ weighing.weighValue }} kg au {{ weighing.weighingDate }}</span>
                <span>
                    <icon-base icon-name="Modifier" class="icon_button" v-on:click.native="goUpdateWeighing(weighing.weighingId)"><icon-write /></icon-base>
                    <icon-base icon-name="Supprimer" class="icon_button" v-on:click.native="deleteWeighing(weighing.weighingId)"><icon-garbage /></icon-base>
                </span>
            </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconWrite from '@/components/icons/IconWrite.vue';
import IconGarbage from '@/components/icons/IconGarbage.vue';
import axios from 'axios';

export default {
  name: 'UpdateAnimal',
  components: {
    IconBase,
    IconWrite,
    IconGarbage
  },
  data() {
    return {
        currentAnimal: [],
        listWeighings: []
    }
  },
  methods: {
      addWeigh(idAnimal) {
        this.$router.push('/add_weigh/' + idAnimal)
      },
      goUpdateWeighing(idWeighing) {
        this.$router.push('/update_weighing/' + idWeighing)
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
.icon_button:hover {
    cursor: pointer;
}
.weigh_list {
    display: flex;
    justify-content: space-between;
}
</style>