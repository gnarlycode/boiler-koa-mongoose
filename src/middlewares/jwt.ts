import jwt from 'jsonwebtoken'
import koaJwt from 'koa-jwt'

const jwtSecret = process.env.JWT_SECRET as string

export const generateJwt = (sub: string) => jwt.sign({ sub }, jwtSecret)

export const jwtMiddleware = koaJwt({
  key: 'jwt',
  passthrough: true,
  secret: jwtSecret,
})
