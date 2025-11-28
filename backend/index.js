require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

const nasaApodClient = axios.create({
    baseURL: 'https://api.nasa.gov',
    params: { api_key: process.env.NASA_API_KEY }
})

const nasaSearchClient = axios.create({
    baseURL: 'https://images-api.nasa.gov'
})

app.get('/imagem-dia', async (req, res) => {
    const response = await nasaApodClient.get('/planetary/apod')
    res.json(response.data)
})

app.get('/buscar', async (req, res) => {
    const response = await nasaSearchClient.get('/search', {
        params: {
            q: req.query.termo,
            year_start: req.query.ano,
            year_end: req.query.ano,
            media_type: 'image',
            page_size: 10
        }
    })

    const items = response.data.collection.items

    const resultados = items.map(item => ({
        titulo: item.data?.[0]?.title || 'Sem título',
        descricao: item.data?.[0]?.description || 'Sem descrição',
        urlImagem: item.links?.[0]?.href || ''
    }))

    res.json(resultados)
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))