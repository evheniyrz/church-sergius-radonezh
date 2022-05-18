import * as express from 'express';
import { isAdmin } from '../db-controllers/user-controller';

const Router = express.Router();

Router.post('/users', isAdmin);

export { Router as userRouter };
