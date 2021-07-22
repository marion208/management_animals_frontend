<template>
  <div class="global_container">
    <div class="container">
      <a href="/add_species">Ajouter une espèce <icon-base icon-name="add"><icon-add /></icon-base></a>
      <div class="list_container">
        <template v-for="oneSpecies in listSpecies">
          <ListButtonSpecies @item-deleted="updatedSpecies" :key="oneSpecies.speciesId" :designation="oneSpecies.designation" :idSpecies="oneSpecies.speciesId" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import ListButtonSpecies from '@/components/ListButtonSpecies.vue';
import axios from 'axios';

export default {
  name: 'speciesManagement',
  components: {
      IconBase,
      IconAdd,
      ListButtonSpecies
  },
  data() {
    return {
      listSpecies: []
    }
  },
  methods: {
    updatedSpecies() {
      console.log('before update');
      axios
      .get('http://localhost:9000/species')
      .then(response => {console.log(response.data); this.listSpecies = response.data;});
    }
  },
  mounted () {
     axios
      .get('http://localhost:9000/species')
      .then(response => (this.listSpecies = response.data))
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