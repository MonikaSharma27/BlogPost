import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './Routes/user.routes.js'
import cors from 'cors'


const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow credentials if needed
}))


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