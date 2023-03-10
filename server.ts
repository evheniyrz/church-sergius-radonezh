import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { userRouter } from './db-routes/user-routes';
import { contentRouter } from 'db-routes/content-routes';
import { corsRouter } from 'cors-route/cors-route';
import { cloudinaryCorsRouter } from 'cors-route/cloudinary-cors-route';

require('dotenv').config();

// const mongoose = require('mongoose');

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express()
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(userRouter)
    .use(contentRouter)
    .use(corsRouter)
    .use(cloudinaryCorsRouter);
  const distFolder = join(process.cwd(), 'dist/nik-prav/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
    mongoose.set('strictQuery', false);
    mongoose
      .connect(`${process.env['MONGO_PROTOCOL']}${process.env['MONGO_HOST']}${process.env['MONGO_PATH']}${process.env['MONGO_PARAMS']}`)
      .then((resp: any) => console.log('===DB CONNECTION SUCCESSFUL==='))
      .catch((error: any) => console.log('DB CONNECTION ERROR', error));
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
