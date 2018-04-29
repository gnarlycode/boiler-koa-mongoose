import fs from 'fs'
import path from 'path'
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const ENV_PATH = path.resolve(__dirname, '../../')
const DOT_ENV_PATH = path.resolve(ENV_PATH, '.env')
const UNDER_ENV_PATH = path.resolve(ENV_PATH, '_env')

try {
  fs.statSync(DOT_ENV_PATH)
} catch (e) {
  throw new Error(
    `${DOT_ENV_PATH} does not exist. \nTry renaming the 'env' file.`,
  )
}

const env = dotenv.config({ path: DOT_ENV_PATH })
dotenvExpand(env.parsed)

// `./env` is considered a definitive list of required environment variables
const missingVars = Object.keys(
  dotenv.parse(fs.readFileSync(UNDER_ENV_PATH)),
).filter(key => !process.env[key])

if (missingVars.length) {
  throw new Error(
    `Missing required environment variable(s): ${missingVars.join(', ')}`,
  )
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'
