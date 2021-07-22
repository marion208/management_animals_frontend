<template>
  <div class="list_item">
    <p>{{ designation }}</p>
    <div class="icons_item">
        <icon-base icon-name="Modifier" v-on:click.native="goUpdate(idSpecies)"><icon-write /></icon-base>
        <icon-base icon-name="Supprimer" v-on:click.native="deleteSpecies(idSpecies)"><icon-garbage /></icon-base>
    </div>
  </div>
</template>

<script>
import IconBase from './IconBase.vue';
import IconWrite from './icons/IconWrite.vue';
import IconGarbage from './icons/IconGarbage.vue';
import axios from 'axios';

export default {
  name: 'ListButtonSpecies',
  components: {
    IconBase,
    IconWrite,
    IconGarbage
  },
  props: ['designation', 'idSpecies'],
  methods: {
      goUpdate(idSpecies) {
        this.$router.push('/update_species/' + idSpecies)
      },
      deleteSpecies(idSpecies) {
          axios
            .delete('http://localhost:9000/delete_species/' + idSpecies)
            .then(() => this.$emit('item-deleted'));
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_item {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    min-width: 40vw;
    padding: 0px 10px 0px 10px;
    margin: 10px;
    background: linear-gradient(rgb(50,87,168), rgb(55,167,148));
    border-radius: 10px;
    color: white;
}
.icons_item > * {
    padding: 5px;
}
.icons_item > *:hover {
    cursor: pointer;
}
</style>
