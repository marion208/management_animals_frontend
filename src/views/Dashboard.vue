<template>
  <div class="global_container">
    <div class="container">
      <h1>Mes animaux</h1>
      <div class="list_container">
        <template v-for="animal in listAnimals">
          <CardAnimal @item-deleted="updatedAnimal" :key="animal.animalId" :designation="animal.name" :idAnimal="animal.animalId" :identificationNumber="animal.identificationNumber" :species="animal.species.designation" :gender="animal.gender.description" :birthDate="animal.birthDate" />
        </template>
      </div>
      <div class="list_container">
        <template v-for="species in listSpecies">
          <ListSpecies :key="species.speciesId" :designation="species.designation" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CardAnimal from '@/components/CardAnimal.vue';
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: {
      CardAnimal
  },
  data() {
    return {
      listAnimals: []
    }
  },
  mounted () {
     axios
      .get('http://localhost:9000/animals')
      .then(response => {
        this.listAnimals = response.data;
        response.data.forEach(
                element => {
                    var birthDateSplitted = element.birthDate.split('-');
                    var dateBirth = birthDateSplitted[2] + '-' + birthDateSplitted[1] + '-' + birthDateSplitted[0];
                    element.birthDate = dateBirth;
                });      
        })
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
}
.list_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
</style>