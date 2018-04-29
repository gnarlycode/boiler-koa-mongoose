import { Middleware } from 'koa'
import { Document, Model, DocumentQuery } from 'mongoose'

type Query<M extends Document> = DocumentQuery<M | null, M>

export const createDocumentMiddleware = <M extends Document>(
  model: Model<M>,
  param: string,
) => (queryMod?: (q: Query<M>) => Query<M>): Middleware => async (
  ctx,
  next,
) => {
  const _id = ctx.params[param]
  let query = model.findById(_id)
  if (queryMod) query = queryMod(query)
  const doc = await query.exec()
  if (!doc) {
    ctx.throw(404, 'Not Found')
    return
  }
  ctx.docs[model.modelName.toLowerCase()] = doc
  ctx.state.res = doc
  return next()
}

export const addDocsField: Middleware = async (ctx, next) => {
  if (!ctx.docs) ctx.docs = {}
  return next()
}
