import axios from 'axios'

export default axios.create({
  baseURL: 'https://teamwork-server.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export const WS_ROOT = 'wss://teamwork-server.herokuapp.com/cable'
