import { Document } from 'mongoose'

export const oneToManyRelation = (
  a: Document,
  b: Document,
  refField: string,
) => {
  const refValues = b.get(refField)
  const index = refValues.indexOf(a._id)

  const create = () => {
    if (index !== -1) return Promise.resolve(b)
    b.set(refField, [...refValues, a._id])
    return b.save()
  }

  const remove = () => {
    if (index === -1) return Promise.resolve(b)
    b.set(refField, [
      ...refValues.slice(0, index),
      ...refValues.slice(index + 1),
    ])
    return b.save()
  }

  return {
    create,
    remove,
  }
}

export const manyToManyRelation = (
  a: Document,
  aField: string,
  b: Document,
  bField: string,
) => {
  const relationAtoB = oneToManyRelation(a, b, bField)
  const relationBtoA = oneToManyRelation(b, a, aField)

  const create = () =>
    Promise.all([relationBtoA.create(), relationAtoB.create()])

  const remove = () =>
    Promise.all([relationBtoA.remove(), relationAtoB.remove()])

  return {
    create,
    remove,
  }
}
