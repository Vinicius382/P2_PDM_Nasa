import axios from 'axios'

export const STORAGE_KEY = '@P2_fotosDoDia'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})