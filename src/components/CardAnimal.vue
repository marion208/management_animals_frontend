<template>
    <div class="animal_card">
        <div class="list_item">
            <p>{{ designation }}</p>
            <div class="icons_item">
                <icon-base icon-name="Voir en détail" class="read_icon"  v-on:click.native="goDetails(idAnimal)"><icon-glasses /></icon-base>
            </div>
        </div>
        <div class="card_content">
            <p>Date de naissance : {{ birthDate }}</p>
            <p>Poids : {{ this.weighValue }} kg</p>
            <p>Numéro d'identification : {{ identificationNumber }}</p>
            <p>{{ species }} / {{ gender }}</p>
        </div>
    </div>
</template>

<script>
import IconBase from './IconBase.vue';
import IconGlasses from './icons/IconGlasses.vue';
import axios from 'axios';

export default {
  name: 'ListButtonAnimal',
  components: {
    IconBase,
    IconGlasses
  },
  data() {
    return {
        weighValue: ''
    }
  },
  props: ['designation', 'idAnimal', 'identificationNumber', 'species', 'gender', 'birthDate'],
  methods: {
      goDetails(idAnimal) {
        this.$router.push('/animal/' + idAnimal)
      }
  },
  mounted () {
        axios
        .get('http://localhost:9000/latest_weighing/' + this.idAnimal)
        .then(response => this.weighValue = response.data.weighValue)     
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.animal_card {
    border: 3px solid rgb(55,167,148);
    border-radius: 13px;
    margin: 10px;
}
.list_item {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    min-width: 40vw;
    padding: 0px 10px 0px 10px;
    margin: 0;
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
.card_content {
    padding: 5px;
    text-align: left;
}
.card_content > p {
    margin: 5px;
}
</style>
