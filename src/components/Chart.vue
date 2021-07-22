<template>
  <div>
    <chart :chart-data="datacollection"></chart>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from './Chart.js'

  export default {
    components: {
      Chart
    },
    data () {
      return {
        datacollection: null,
        listWeighValue: [],
        listDateWeigh: []
      }
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: this.listDateWeigh,
          datasets: [
            {
              label: 'Evolution du poids',
              backgroundColor: 'rgb(248,171,156)',
              data: this.listWeighValue
            }
          ]
        }
      }
    },
    mounted() {
      var animalParam = document.location.href.split('/');
      var idAnimal = animalParam[animalParam.length - 1];
        axios
        .get('http://localhost:9000/weighings/' + idAnimal)
        .then(response => {
            this.listWeighings = response.data;
            response.data.forEach(
                element => {
                    var dateWeighingSplitted = element.weighingDate.split('-');
                    var dateWeighing = dateWeighingSplitted[2] + '-' + dateWeighingSplitted[1] + '-' + dateWeighingSplitted[0];
                    element.weighingDate = dateWeighing;
                    this.listWeighValue.push(element.weighValue);
                    this.listDateWeigh.push(element.weighingDate);
                })
            }).then(() => this.fillData())
  }
  }
</script>
