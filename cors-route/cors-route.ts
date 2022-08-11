import * as express from 'express';
import * as cors from 'cors';
import * as https from 'https';
import { IncomingMessage } from 'http';

const Router = express.Router();
const corsOptions = {
  origin: 'https://www.holytrinityorthodox.com'
};

Router.use(cors(corsOptions)).get('/ru/calendar/*', function (req, res, next) {

  const options: https.RequestOptions = {
    method: 'GET',
    host: 'www.holytrinityorthodox.com',
    path: req.url
  };

  https.request(options, function (response: IncomingMessage) {
    let body: any[] = [];
    response.on('data', function (chunk) {
      // const bufferData = chunk.toJSON(); Buffer.from(bufferData.data)
      body.push(chunk);
    })
      .on('end', () => {

        res.json({ body });
      })
  }).end();
});

export { Router as corsRouter };