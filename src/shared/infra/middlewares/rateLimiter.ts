import { Request, Response, NextFunction } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'

import AppError from '../../errors/AppError'

const limiter = new RateLimiterMemory({
  points: 5,
  duration: 5,
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (!request.ip) throw new AppError('Client disconnected suddenly', 500)

  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
