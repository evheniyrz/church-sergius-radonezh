import * as express from 'express';
import { getContents, postContent } from '../db-controllers/content-controller';
const Router = express.Router();

Router.get('/get-content', getContents);
Router.post('/post-content', postContent);

export { Router as contentRouter };