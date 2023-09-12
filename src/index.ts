/**
 * file: src/index.ts
 * description: file responsible for the main entry point of the application.
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { GetEmployeesController } from './controllers/get-employees/get-employees';
import { MongoGetEmployeesRepository } from './repositories/get-employees/mongo-get-employees';

dotenv.config();

const port = process.env.PORT || 3000;
const app: Application = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Application running on port: ${port}!`));

// GET: localhost:3000/employees
app.get('/employees', async (_req: Request, res: Response) => {
  const mongoGetEmployeesRepository = new MongoGetEmployeesRepository();

  const getEmployeesController = new GetEmployeesController(mongoGetEmployeesRepository);

  const { body, statusCode } = await getEmployeesController.handle();

  res.send(body).status(statusCode);
});