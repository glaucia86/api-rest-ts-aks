/**
 * file: src/index.ts
 * description: file responsible for the main entry point of the application.
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from 'dotenv';
import { GetEmployeesController } from './controllers/get-employees/get-employees';
import { MongoGetEmployeesRepository } from './repositories/get-employees/mongo-get-employees';
import { MongoClient } from './database/mongo';


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

  // GET: localhost:3000/employees
  app.get('/employees', async (_req: Request, res: Response) => {
    const mongoGetEmployeesRepository = new MongoGetEmployeesRepository();

    const getEmployeesController = new GetEmployeesController(mongoGetEmployeesRepository);

    const { body, statusCode } = await getEmployeesController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Application running on port: ${port}!`));
}

main();

