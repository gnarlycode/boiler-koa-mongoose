import { Document } from 'mongoose'

declare module 'koa' {
  interface Context {
    docs: { [key: string]: Document }
  }
}
