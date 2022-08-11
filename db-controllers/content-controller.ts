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
  const { sectionId } = req.query;

  baseContentSchema.set('collection', sectionId as string);
  mongoose.model(sectionId as string, baseContentSchema).create(content)
    .then(dbResponse => {

      if (!Array.isArray(dbResponse)) {
        dbResponse.id = dbResponse._id.toString();
      } else {
        dbResponse.forEach(element => {
          element.id = element._id.toString();
        });
      }
      resp.status(200).send(dbResponse);
    });
}

const updateContent = (req: Request, resp: Response) => {
  const content = req.body;
  const { id, sectionId } = req.query;

  baseContentSchema.set('collection', sectionId as string);
  mongoose.model(sectionId as string, baseContentSchema).findOneAndUpdate({ _id: id }, content, { new: true })
    .then(dbResponse => {
      dbResponse.id = dbResponse._id.toString();

      resp.status(200).send(dbResponse);
    });
}

const deleteContent = (req: Request, resp: Response) => {
  const { contentId, sectionId } = req.query;

  baseContentSchema.set('collection', sectionId as string);
  mongoose.model(sectionId as string, baseContentSchema).deleteOne({ _id: contentId })
    .then(dbResponse => {

      resp.status(200).send(dbResponse);
    });
}

export { getContents, postContent, updateContent, deleteContent };