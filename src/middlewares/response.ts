import { Middleware } from 'koa'

export const responseMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
    const { res } = ctx.state
    if (res) {
      ctx.body = {
        payload: res,
        status: 'ok',
      }
    } else {
      ctx.throw(404)
    }
  } catch (error) {
    ctx.status = typeof error.statusCode === 'number' ? error.statusCode : 400
    ctx.body = {
      error,
      status: 'error',
      statusCode: ctx.status,
    }
  }
}
