import * as express from 'express';
import { getAdminUser } from '../db-controllers/user-controller';

const Router = express.Router();

Router.post('/users', getAdminUser);

export { Router as userRouter };
