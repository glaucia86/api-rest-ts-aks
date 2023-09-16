/**
 * file: src/index.ts
 * description: file responsible for the main entry point of the application.
 * data: 09/15/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from 'dotenv';
import { MongoClient } from './database/mongo';

import * as repositories from './repositories';
import * as controllers from './controllers';

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

    const getEmployeesController = new controllers.GetEmployeesController(
      new repositories.MongoGetEmployeesRepository());

    const { body, statusCode } = await getEmployeesController.handle();

    res.status(statusCode).send(body);
  });

  // POST: localhost:3000/employees
  app.post('/employees', async (req: Request, res: Response) => {

    const createEmployeeController = new controllers.CreateEmployeeController(
      new repositories.MongoCreateEmployeeRepository());

    const { body, statusCode } = await createEmployeeController.handle({
      body: req.body
    });

    res.status(statusCode).send(body);
  });

  // PATCH: localhost:3000/employees/:id
  app.patch("/employees/:id", async (req, res) => {

    const updateEmployeeController = new controllers.UpdateEmployeeController(
      new repositories.MongoUpdateEmployeeRepository());

    const { body, statusCode } = await updateEmployeeController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // GET (By ID): localhost:3000/employees/:id
  app.get('/employees/:id', async (req: Request, res: Response) => {

    const getEmployeeController = new controllers.GetEmployeeController(
      new repositories.MongoGetEmployeeRepository());

    const { body, statusCode } = await getEmployeeController.handle({
      params: req.params
    });

    res.status(statusCode).send(body);
  });

  // DELETE: localhost:3000/employees/:id
  app.delete('/employees/:id', async (req: Request, res: Response) => {

    const deleteEmployeeController = new controllers.DeleteEmployeeController(
      new repositories.MongoDeleteEmployeeRepository());

    const { body, statusCode } = await deleteEmployeeController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Application running on port: ${port}!`));
}

main();

