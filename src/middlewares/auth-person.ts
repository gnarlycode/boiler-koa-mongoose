import { Middleware } from 'koa'
import { Person } from '../models/person'

export const authPersonMiddleware: Middleware = async (ctx, next) => {
  if (ctx.state.jwt && ctx.state.jwt.sub) {
    const _id = ctx.state.jwt.sub
    const person = await Person.findOne({ _id })
    if (!ctx.docs) ctx.docs = {}
    if (person) ctx.state.authPerson = person
  }
  return next()
}
