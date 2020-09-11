import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID xfvngexHSv0W45O7BMT3FyFF_NWD7BPGpiuO9i1r-Aw',
  },
})
