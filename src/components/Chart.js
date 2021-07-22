import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],
    /*props: ['options'],*/
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    offset: true
                }
            },
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'probability'
                }
            }]
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}