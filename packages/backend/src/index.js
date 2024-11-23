import express, { request, response } from 'express'

const app = express()

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    response.send('hello')
})

app.post('/login', (req, res) => {})
app.post('/register', (req, res) => {})
app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})