import { Middleware } from 'koa'

export const auth: Middleware = async (ctx, next) => {
  if (!ctx.state.authPerson) return ctx.throw(401, 'Authorization error')
  return next()
}
