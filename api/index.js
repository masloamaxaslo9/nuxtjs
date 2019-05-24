import axios from 'axios'

export default axios.create({
    baseURL: 'https://shrouded-chamber-22050.herokuapp.com',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
