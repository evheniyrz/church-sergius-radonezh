import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
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
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    },
    editor: {
      type: String,
      required: false
    }
  }
);

const Article = mongoose.model('Article', articleSchema);

export { Article };