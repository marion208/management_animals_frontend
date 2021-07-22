import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import SpeciesManagement from '../views/SpeciesManagement.vue'
import AnimalsManagement from '../views/AnimalsManagement.vue'
import AddOneSpecies from '../views/AddOneSpecies.vue'
import AddAnimal from '../views/AddAnimal.vue'
import UpdateSpecies from '../views/UpdateSpecies.vue'
import UpdateAnimal from '../views/UpdateAnimal.vue'
import DetailsAnimal from '../views/DetailsAnimal.vue'
import AddWeigh from '../views/AddWeigh.vue'
import AddTreatment from '../views/AddTreatment.vue'
import UpdateWeighing from '../views/UpdateWeighing.vue'
import UpdateTreatment from '../views/UpdateTreatment.vue'
import ListWeighing from '../views/ListWeighing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/manage_species',
    name: 'SpeciesManagement',
    component: SpeciesManagement
  },
  {
    path: '/manage_animals',
    name: 'AnimalsManagement',
    component: AnimalsManagement
  },
  {
    path: '/add_species',
    name: 'AddOneSpecies',
    component: AddOneSpecies
  },
  {
    path: '/add_animal',
    name: 'AddAnimal',
    component: AddAnimal
  },
  {
    path: '/update_species/:idSpecies',
    name: 'UpdateSpecies',
    component: UpdateSpecies
  },
  {
    path: '/update_animal/:idAnimal',
    name: 'UpdateAnimal',
    component: UpdateAnimal
  },
  {
    path: '/animal/:idAnimal',
    name: 'DetailsAnimal',
    component: DetailsAnimal
  },
  {
    path: '/add_weigh/:idAnimal',
    name: 'AddWeigh',
    component: AddWeigh
  },
  {
    path: '/add_treatment/:idAnimal',
    name: 'AddTreatment',
    component: AddTreatment
  },
  {
    path: '/update_weighing/:idWeighing',
    name: 'UpdateWeighing',
    component: UpdateWeighing
  },
  {
    path: '/update_treatment/:idTreatment',
    name: 'UpdateTreatment',
    component: UpdateTreatment
  },
  {
    path: '/list_weighings/:idAnimal',
    name: 'ListWeighing',
    component: ListWeighing
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
