<template>
  <div class="global_container">
    <div class="container">
      <a href="/add_animal">Ajouter un animal <icon-base icon-name="add"><icon-add /></icon-base></a>
      <div class="list_container">
        <template v-for="animal in listAnimals">
          <ListButtonAnimal @item-deleted="updatedAnimal" :key="animal.animalId" :designation="animal.name" :idAnimal="animal.animalId" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import ListButtonAnimal from '@/components/ListButtonAnimal.vue';
import axios from 'axios';

export default {
  name: 'animalsManagement',
  components: {
      IconBase,
      IconAdd,
      ListButtonAnimal
  },
  data() {
    return {
      listAnimals: []
    }
  },
  methods: {
    updatedAnimals() {
      axios
      .get('http://localhost:9000/animals')
      .then(response => {console.log(response.data); this.listAnimals = response.data;});
    }
  },
  mounted () {
     axios
      .get('http://localhost:9000/animals')
      .then(response => (this.listAnimals = response.data))
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
.container > a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>