const express = require('express')
const path = require('path');
const cors = require("cors")

const { getHouses, createHouse, deleteHouse, updateHouse } = require('./controller.js')


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/static'));
app.post('/api/houses', createHouse)
app.delete('/api/houses/:id', deleteHouse)
app.put('/api/houses/:id', updateHouse)

app.get('/', (req, res) => {
    res.sendFile('static/index.html', {root: __dirname});
})


app.get('/api/houses', getHouses)

app.listen(4000, () => console.log(`Server running on port 4000`))