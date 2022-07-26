import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { baseContentSchema } from "../db-models/article-model";

const getContents = (req: Request, resp: Response) => {
  const { author, contentName } = req.query;

  baseContentSchema.set('collection', contentName as string);
  mongoose.model(contentName as string, baseContentSchema).aggregate([
    { $match: { author, contentType: contentName } },
  ])
    .then(result => {
      result.forEach(element => {
        element.id = element._id.toString();
      });;
      resp.status(200).send(result);
    });
}

const postContent = (req: Request, resp: Response) => {
  const content = req.body;

  baseContentSchema.set('collection', content.contentType as string);
  mongoose.model(content.contentType as string, baseContentSchema).create(content)
    .then(result => {
      result.id = result._id.toString();
      resp.status(200).send(result);
    });
}

export { getContents, postContent };