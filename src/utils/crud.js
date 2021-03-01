import mongoose from 'mongoose'
export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  const isValidId = mongoose.Types.ObjectId.isValid(id)
  if (isValidId) {
    const doc = await model.findOne({ _id: id, createdBy: userId }).exec()
    if (!doc) {
      return res.status(400).end()
    } else {
      return res.status(200).json({ data: doc })
    }
  }
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id
  const doc = await model.find({ createdBy: userId }).exec()
  if (doc) {
    console.log('🚀 ~ file: crud.js ~ line 20 ~ getMany ~ doc', doc)
    return res.status(200).json({ data: doc })
  }
}

export const createOne = model => async (req, res) => {}

export const updateOne = model => async (req, res) => {}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
