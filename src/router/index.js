import { createRouter, createWebHistory } from 'vue-router'
import PokemonView from '../views/PokemonView.vue'
import DetallesView from '../views/DetallesView.vue'

const routes = [
  {
    path: '/',
    name: 'pokemon',
    component: PokemonView,
    props: true
  },
  {
    path: '/detalles',
    name: 'detalles',
    component: DetallesView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
