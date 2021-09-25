const express = require('express')
var cors = require('cors')


const connectToMongo = require("./db")
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/orders',require('./routes/orders'))
app.use('/api/bought',require('./routes/payment'))

// if(process.env.NODE_ENV == "production"){
//   app.use(express.static("client/build"))
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

connectToMongo();