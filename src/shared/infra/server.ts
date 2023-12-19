import 'reflect-metadata'
import 'dotenv/config'

import 'express-async-errors'

import express, { Request, Response, NextFunction } from 'express'

import AppError from '../errors/AppError'
import rateLimiter from './middlewares/rateLimiter'
import routes from './routes'

const app = express()

app.use(rateLimiter)
app.use(express.json())
app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('👻 Buuu! Server started on port 3333!')
})
