import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoutes } from './app/modules/student/student.route'
const app: Application = express()
// parsers
app.use(express.json())
app.use(cors())
app.use('/api/v1/students', studentRoutes)

app.get('/', (req: Request, res: Response) => {
  const a = 10
  res.status(200).json({
    Text: a,
  })
})

export default app
