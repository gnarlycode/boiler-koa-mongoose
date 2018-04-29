import bcrypt from 'bcrypt'
import Router from 'koa-router'
import { Document } from 'mongoose'
import { createDocumentMiddleware } from '../middlewares/document'
import { generateJwt } from '../middlewares/jwt'
import { Person } from '../models/person'

const router = new Router({ prefix: '/people' })
export const idKey = 'personId'
export const personUrl = `/:${idKey}`
export const findPerson = createDocumentMiddleware(Person, idKey)

const excludePassword = (person: Document) => ({
  ...person.toJSON(),
  password: undefined,
})

const personWithToken = (person: Document) => ({
  person: excludePassword(person),
  token: generateJwt(person._id),
})

/**
 * POST /people/auth
 */
router.post('/auth', async ctx => {
  const throwError = () => ctx.throw(422, 'Email or password is invalid')

  const { body } = ctx.request
  if (typeof body !== 'object' || !body.email || !body.password) throwError()

  const person = await Person.findOne({ email: body.email })
  if (!person) return throwError()

  const isValid = await bcrypt.compare(body.password, person.get('password'))
  if (!isValid) return throwError()

  ctx.state.res = personWithToken(person)
})

/**
 * GET /people
 */
router.get('/', async ctx => {
  ctx.state.res = await Person.find({}).select('-password')
})

/**
 * POST /people
 */
router.post('/', async ctx => {
  const { body } = ctx.request
  body.password = await bcrypt.hash(body.password, 10)
  const person = new Person(ctx.request.body)
  await person.save()
  ctx.state.res = personWithToken(person)
})

/**
 * GET /people/:personId
 */
router.get(personUrl, findPerson(), async ctx => {
  ctx.state.res = excludePassword(ctx.docs.person)
})

/**
 * PUT /people/:personId
 */
router.put(personUrl, findPerson(), async ctx => {
  const { person } = ctx.docs
  person.set(ctx.request.body)
  await person.save()
  ctx.state.res = excludePassword(person)
})

export const peopleRoutes = router.routes()
