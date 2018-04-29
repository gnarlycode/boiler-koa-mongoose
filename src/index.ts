import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import chalk from 'chalk'
require('dotenv').config()
import { router } from './routes'
import { addDocsField } from './middlewares/document'
import { jwtMiddleware } from './middlewares/jwt'
import { authPersonMiddleware } from './middlewares/auth-person'
import { responseMiddleware } from './middlewares/response'

mongoose.connect(process.env.DB_HOST as string)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const app = new Koa()

app.use(responseMiddleware)
app.use(jwtMiddleware)
app.use(authPersonMiddleware)
app.use(addDocsField)
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))

router.prefix('/api')
app.use(router.routes())
app.use(router.allowedMethods())

const host = process.env.HOST
const port = process.env.PORT

app.listen(Number(port), host)

console.info(chalk.cyanBright(`\n\n💂  Listening at http://${host}:${port}\n`))
