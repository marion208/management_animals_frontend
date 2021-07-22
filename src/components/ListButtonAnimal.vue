<template>
  <div class="list_item">
    <p><icon-base icon-name="Voir en détail" class="read_icon"  v-on:click.native="goDetails(idAnimal)"><icon-glasses /></icon-base> {{ designation }}</p>
    <div class="icons_item">
        <icon-base icon-name="Modifier" v-on:click.native="goUpdate(idAnimal)"><icon-write /></icon-base>
        <icon-base icon-name="Supprimer" v-on:click.native="deleteAnimal(idAnimal)"><icon-garbage /></icon-base>
    </div>
  </div>
</template>

<script>
import IconBase from './IconBase.vue';
import IconGlasses from './icons/IconGlasses.vue';
import IconWrite from './icons/IconWrite.vue';
import IconGarbage from './icons/IconGarbage.vue';
import axios from 'axios';

export default {
  name: 'ListButtonAnimal',
  components: {
    IconBase,
    IconGlasses,
    IconWrite,
    IconGarbage
  },
  props: ['designation', 'idAnimal'],
  methods: {
      goDetails(idAnimal) {
        this.$router.push('/animal/' + idAnimal)
      },
      goUpdate(idAnimal) {
        this.$router.push('/update_animal/' + idAnimal)
      },
      deleteAnimal(idAnimal) {
          axios
            .delete('http://localhost:9000/delete_animal/' + idAnimal)
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
.icons_item > *:hover, .read_icon {
    cursor: pointer;
}
</style>
