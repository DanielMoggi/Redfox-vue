<script setup>
import HeaderBarVue from '@/components/HeaderBar.vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const times = ref([])
const partidas = ref([])
const ingressos = ref([])
const selecedTime = ref('')
const selecedTime2 = ref('')
const dia = ref('')

const getPartidas = async () => {
  const response = await api.get('/partidas/')
  partidas.value = response.data
}

const getTimes = async () => {
  const response = await api.get('/times/')
  times.value = response.data
}

const getIngressos = async () => {
  const response = await api.get('/ingressos/')
  ingressos.value = response.data
}

const criarPartida = async () => {
  const response = await api.post('/partidas/', {
    times: [selecedTime.value, selecedTime2.value],
    data: dia.value
  })

  console.log(response.data)

  if (response.data) {
    getPartidas()
  }
}

onMounted(() => {
  getTimes()
  getPartidas()
  getIngressos()
})
</script>

<template>
  <HeaderBarVue />
  <main class="h-screen bg-slate-800 grid grid-cols-2">
    <div class="bg-slate-900">
      <div class="mt-5">
        <div>
          <h1 class="text-center text-gray-100 text-xl">Partidas</h1>
        </div>

        <div class="mt-4">
          <p class="text-white text-center">Criar partida</p>
          <form class="space-y-4" v-on:submit.prevent="criarPartida">
            <div>
              <label for="name" class="text-gray-100">Dia do jogo</label>
              <vue-tailwind-datepicker v-model="dia" overlay as-single />
            </div>
            <div>
              <label for="times" class="text-gray-100 mb-5">Times em confronto</label>
              <select
                name=""
                id=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="time in times" :key="time.id" :value="time.id">
                  {{ time.nome }}
                </option>
              </select>
              <select
                name=""
                id=""
                class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="time in times" :key="time.id" :value="time.id">
                  {{ time.nome }}
                </option>
              </select>
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
              Criar partida
            </button>
          </form>

          <div class="mt-48">
            <p class="text-white text-center text-xl mb-4">Partidas cadastradas:</p>
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-gray-100">ID</th>
                  <th class="text-gray-100">Time 1</th>
                  <th class="text-gray-100">Time 2</th>
                  <th class="text-gray-100">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="partida in partidas" :key="partida.id">
                  <td class="text-gray-100 text-center">{{ partida.id }}</td>
                  <td class="text-gray-100 text-center">{{ times[0].nome }}</td>
                  <td class="text-gray-100 text-center">{{ times[1].nome }}</td>
                  <td class="text-gray-100 text-center">{{ partida.data }}</td>
                </tr>
                <!-- Add table lines here -->
                <tr>
                  <td colspan="4" class="border-t border-gray-500"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-slate-800">
      <div class="mt-5">
        <h1 class="text-center text-gray-100 text-xl">Últimos Ingressos Vendidos</h1>

        <div class="mt-4">
          <table class="w-full">
            <thead>
              <tr>
                <th class="text-gray-100">ID</th>
                <th class="text-gray-100">Valor</th>
                <th class="text-gray-100">Partida</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ingresso in ingressos" :key="ingresso.id">
                <td class="text-gray-100 text-center">{{ ingresso.id }}</td>
                <td class="text-gray-100 text-center">{{ ingresso.preco }}</td>
                <td class="text-gray-100 text-center">{{ ingresso.partida }}</td>
              </tr>
              <!-- Add table lines here -->
              <tr>
                <td colspan="3" class="border-t border-gray-500"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
