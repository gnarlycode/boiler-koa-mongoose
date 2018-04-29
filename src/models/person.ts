import mongoose from 'mongoose'

const PersonSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  },
)

export const Person = mongoose.model('Person', PersonSchema)
