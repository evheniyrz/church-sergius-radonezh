import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const baseContentSchema = new Schema(
  {
    id: {
      type: String,
      required: false
    },
    contentType: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    authorId: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    editor: {
      type: String,
      required: false
    }
  },
  {
    autoIndex: false,
    autoCreate: false
  }
);

export { baseContentSchema };