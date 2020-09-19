import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export const WS_ROOT = 'ws://localhost:3000/cable'
