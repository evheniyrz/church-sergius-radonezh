import * as express from 'express';
import * as cors from 'cors';
import * as https from 'https';
import { IncomingMessage } from 'http';

const Router = express.Router();
const corsOptions = {
  origin: 'https://api.cloudinary.com'
};

Router.use(cors(corsOptions)).get('/folders/site', function (req, res, next) {
  const GET_OPTIONS: https.RequestOptions = createGetRequestOptions(req.url);

  https.request(GET_OPTIONS, function (response: IncomingMessage) {
    let body: any[] = [];
    response.on('data', function (chunk) {
      body.push(chunk);
    })
      .on('end', () => {
        res.json(bufferToJSON(body));
      })
  }).end();
});

Router.use(cors(corsOptions)).get('/resources/search', function (req, res, next) {
  console.log('==RESOURCES==', req.url);
  const GET_OPTIONS: https.RequestOptions = createGetRequestOptions(req.url);

  https.request(GET_OPTIONS, function (response: IncomingMessage) {
    let body: any[] = [];
    response.on('data', function (chunk) {
      body.push(chunk);
    })
      .on('end', () => {
        res.json({ body });
      })
  }).end();
});

function bufferToJSON(response: Buffer[]) {
  let convertedData = {};
  try {
    const utf8decoder = new TextDecoder();

    convertedData = response.reduce((acc: {}, bufferChunk) => {
      let bytes = Uint8Array.from(bufferChunk);

      acc = {
        ...acc,
        ...JSON.parse(utf8decoder.decode(bytes))
      };
      return acc;
    }, {});

  } catch (error) {
    console.log('%c ERROR CORS CONVERTED DATA', 'color: brown', { error, convertedData });
  }

  return convertedData;
}

function createGetRequestOptions(url: string): https.RequestOptions {
  const auth: string = `${process.env['CLOUDINARY_KEY']}:${process.env['CLOUDINARY_SEC']}`;
  // console.log('==RESOURCES==', url);
  const GET_OPTIONS: https.RequestOptions = {
    method: 'GET',
    host: 'api.cloudinary.com',
    path: `/${process.env['CLOUDINARY_VER']}/${process.env['CLOUDINARY_NAME']}${url}`,
    headers: { 'Authorization': `Basic ${btoa(auth)}` },
  };

  return GET_OPTIONS;
}

export { Router as cloudinaryCorsRouter };