import multer from 'koa-multer'
import { ReqFiles } from '../../typings/http'

export const upload = multer({ storage: multer.memoryStorage() })

export const normalizeFiles = (files: ReqFiles = [], fieldName: string) =>
  Array.isArray(files) ? files : files[fieldName]
