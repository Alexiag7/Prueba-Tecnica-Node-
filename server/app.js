import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import {fileURLToPath} from 'url';
import cors from 'cors';
import campaignRouter from './modules/campaign/campaign.routes.js'
import influencerRouter from './modules/influencer/influencer.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/campaign', campaignRouter);
app.use('/influencer', influencerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json('error');
});

export default app;
