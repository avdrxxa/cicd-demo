import express from 'express'
import cors from 'cors'
const app= express()
const PORT=process.env.PORT||3000
app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>{
    res.send('Backend funkar')
})
app.post('/api/signup', (req, res)=>{
    const {name, email}= req.body
    res.status(201).json({message:`Vällkommen ${name}`, email })
})
app.listen(PORT, ()=> console.log(`Servern kör här: ${PORT}` ))