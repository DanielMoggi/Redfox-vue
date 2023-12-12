<template>
  <div class="relative flex flex-col justify-center items-center h-screen overflow-hidden">
    <div
      class="w-full p-6 m-auto bg-white border-t-4 border-purple-600 rounded-md shadow-md border-top lg:max-w-md"
    >
      <h1 class="text-3xl font-semibold text-center text-purple-700">Redfox Admin</h1>
      <form class="mt-0" v-on:submit.prevent="login">
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
            type="email"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            v-model="email"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="block text-sm text-gray-800">Senha</label>
            <input
              type="password"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              v-model="password"
            />
          </div>
          <div class="mt-6">
            <button
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import api from '../../services/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const local = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  const response = await api.post('/token/', {
    email: email.value,
    password: password.value
  })

  if (response.data.access) {
    localStorage.setItem('token', response.data.access)
    local.push('/')
  }
}
</script>
