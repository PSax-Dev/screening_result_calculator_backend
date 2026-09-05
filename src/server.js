import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import calculateRoute from './routes/calculate.jsx'

const app = express()
const port = process.env.PORT || 5000
const allowed = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(x => x.trim()) : true
app.use(cors({ origin: allowed }))
app.use(express.json())
app.get('/health', (_req,res)=>res.json({ status:'ok', service:'futo-screening-api' }))
app.use('/api/v1/calculate', calculateRoute)
app.use((_req,res)=>res.status(404).json({message:'Route not found'}))
app.listen(port, ()=>console.log(`FUTO Screening API running on port ${port}`))
