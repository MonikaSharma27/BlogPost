import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './Routes/user.routes.js'

const app = express()
const port = 3000

dotenv.config()
const URI = process.env.MONGODB_URI;


try{
    mongoose.connect(URI)
    console.log('Connected to MongoDB')
}catch(error){
    console.log(error)
}

app.use("/user", userRoutes)

app.get('/', (req, res) => {
  res.send('Hello n')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})