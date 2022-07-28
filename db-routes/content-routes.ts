import * as express from 'express';
import { deleteContent, getContents, postContent, updateContent } from '../db-controllers/content-controller';
const Router = express.Router();

Router.get('/get-content', getContents);
Router.post('/post-content', postContent);
Router.patch('/update-content', updateContent);
Router.delete('/delete-content', deleteContent);


export { Router as contentRouter };