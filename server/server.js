//Setup required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3002;
const controller = require('./controller/controller');

//Setup Express Server
const app = express();

app.use(bodyParser.json());
app.use(cors());

//Setup Enpoints
app.get('/api/faves' , controller.getAll)

app.post('/api/faves', controller.create)

app.delete('/api/faves/:id', controller.delete)

app.put('/api/faves/:id', controller.update)

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));