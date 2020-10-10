const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/records', require('./routes/records'))
app.use('/', express.static(path.join(__dirname, '../dist')))

mongoose.connect(
    'mongodb://localhost:27017/mevn-contacts-app',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to mongoDB');
})

db.on('error', (error) => {
    console.log(error)
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
