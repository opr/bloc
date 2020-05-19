import express from 'express';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
const https = require('https');
const fs = require('fs');
const app = express();
require('dotenv').config();
const port = process.env.WEB_PORT;
import React from 'react';

import {StaticRouter} from 'react-router';

app.get('*', (req, res) => res.render('index'));
//app.get('*', (req, res) => res.render('index', {serverSide: renderToString(<StaticRouter location={req.url}><AppRoot /></StaticRouter>)}));
app.use(express.static('./'));
app.set('view engine', 'pug');
const httpsOptions = {
  key: fs.readFileSync('./bloc.key'),
  cert: fs.readFileSync('./bloc.crt')
};


const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(port, () => console.log(`Listening on https://localhost:${port}`));

//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
