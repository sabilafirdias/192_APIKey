const express = require('express')
const path = require('path')
const crypto = require('crypto')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()) // <-- Tambahan: agar bisa menerima JSON

// Variabel penyimpanan API Key sementara
let myApiKey = null

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

