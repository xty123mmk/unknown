import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import mainRoutes from './routes/main'

const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());

mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;

const port = process.env.PORT;

app.use('/api/v1', mainRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to Sworte',
  });
});

app.get('*', (req, res) => {
  res.status(400).json({
    message: 'Welcome to Sworte API. Please see documentation for proper routing',
  });
});

app.listen(port, () => {
  console.log('server');
});
