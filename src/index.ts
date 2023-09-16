/**
 * file: src/index.ts
 * description: file responsible for the main entry point of the application.
 * data: 09/16/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from 'dotenv';
import { MongoClient } from './database/mongo';
import routes from './routes';
import employeesRoutes from './routes/employee';

const main = async () => {

  config();

  const app: Application = express();

  try {
    await MongoClient.connect();
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }


  app.use(morgan('dev'));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes);
  app.use(employeesRoutes);

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Application running on port: ${port}!`));
}

main();

