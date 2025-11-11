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

// Generate API Key
app.post('/create', (req, res) => {
  const apiKey = 'sk-sm-v1-' + crypto.randomBytes(16).toString('hex').toUpperCase()
  myApiKey = apiKey // <-- Simpan di variabel
  res.json({ apiKey })
})

// Cek validitas API Key
app.post('/cekapi', (req, res) => {
  const userKey = req.body.apiKey // API key yang dikirim dari frontend

  if (!userKey) {
    return res.status(400).json({ valid: false, message: "API Key tidak boleh kosong" })
  }

  if (userKey === myApiKey) {
    return res.json({ valid: true, message: "API Key valid" })
  }

  return res.json({ valid: false, message: "API Key tidak valid" })
})

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})
