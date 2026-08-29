import { Router } from 'express'
import { calculate } from '../utils/grading.js'

const router = Router()
router.post('/', (req, res) => {
  try { res.json(calculate(req.body)) }
  catch (error) { res.status(400).json({ message: error.message || 'Unable to calculate result.' }) }
})
export default router
