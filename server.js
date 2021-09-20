const express = require('express')
const bodyParser = require('body-parser')
const registration = require('./routes/Admission')
const cors = require('cors')
const dbConfig = require('./config/config')
const ingestDataAddress = process.env.ALLOWEDADDRESS


var app = express()
app.use(bodyParser.json())




app.use(cors({ origin: ingestDataAddress }))


dbConfig.authenticate().then(() => {
    console.log("database connected")
}).catch(err => console.log('Error: ' + err))


app.post('/registration', registration)

app.post('/chatapi',(req,res)=>{
    
    console.log('heelo there')
})





const PORT = process.env.port || 8080


app.listen(PORT, console.log("server is running", PORT))
