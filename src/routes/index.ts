import Router from 'koa-router'
import { peopleRoutes } from './people'

export const router = new Router()

router.use(peopleRoutes)
