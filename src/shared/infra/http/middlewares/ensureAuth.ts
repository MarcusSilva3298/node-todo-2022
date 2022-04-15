import { authConfig } from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface RequestUser {
  id: string
}

interface TokenPayload {
  iat: number
  exp: number
  user: RequestUser
}

export function ensureAuth(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('JWT token is missing', 401)

  const [_trash, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { user } = decoded as TokenPayload

    request.user = {
      id: user.id
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
