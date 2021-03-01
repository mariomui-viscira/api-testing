import mongoose from 'mongoose'
import { general } from '../utils'
const { createType } = general
const itemSchema = new mongoose.Schema({
  name: createType({ required: true }),

  status: createType(
    {
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active'
    },
    ['maxlength', 'trim']
  ),
  notes: String,
  due: Date,
  createdBy: createType(
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    ['trim', 'maxlength']
  ),
  list: createType(
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    },
    ['trim', 'maxlength']
  )
})
itemSchema.index({ list: 1, name: 1 }, { unique: true })
export const Item = mongoose.model('item', itemSchema)
