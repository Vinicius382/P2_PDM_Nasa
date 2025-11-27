require('dotenv').config()
const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000
const NASA_API_KEY = process.env.NASA_API_KEY

app.get('/imagem-dia', async (req, res) => {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
    res.json(response.data)
})

app.get('/buscar', async (req, res) => {
    const { termo, ano } = req.query
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${termo}&year_start=${ano}&year_end=${ano}&media_type=image`)

app.listen(port, () => { console.log(`Servidor na Porta ${port}`) 
})