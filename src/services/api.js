import axios from 'axios'

const api = axios.create({
  baseURL: 'https://redfox-futebol-backend-dev-jsmd.4.us-1.fl0.io/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
