import { File } from 'koa-multer'

type ReqFiles =
  | {
      [fieldname: string]: File[]
    }
  | File[]

declare module 'http' {
  export interface IncomingMessage {
    body?: { [key: string]: any }
    files?: ReqFiles
  }
}
