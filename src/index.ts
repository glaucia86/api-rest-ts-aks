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
import { MongoCreateEmployeeRepository } from './repositories/create-employees/mongo-create-employee';
import { CreateEmployeeController } from './controllers/create-employee/create-employee';
import { MongoUpdateEmployeeRepository } from './repositories/update-employee/mongo-update-employee';
import { UpdateEmployeeController } from './controllers/update-employee/update-employee';
import { MongoGetEmployeeRepository } from './repositories/get-employee/mongo-get-employee';
import { GetEmployeeController } from './controllers/get-employee/get-employee';
import { MongoDeleteEmployeeRepository } from './repositories/delete-employee/mongo-delete.employee';
import { DeleteEmployeeController } from './controllers/delete-employee/delete-employee';


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

    res.status(statusCode).send(body);
  });

  // POST: localhost:3000/employees
  app.post('/employees', async (req: Request, res: Response) => {
    const mongoCreateEmployeeRepository = new MongoCreateEmployeeRepository();

    const createEmployeeController = new CreateEmployeeController(mongoCreateEmployeeRepository);

    const { body, statusCode } = await createEmployeeController.handle({
      body: req.body
    });

    res.status(statusCode).send(body);
  });

  // PATCH: localhost:3000/employees/:id
  app.patch("/employees/:id", async (req, res) => {
    const mongoUpdateEmployeeRepository = new MongoUpdateEmployeeRepository();

    const updateEmployeeController = new UpdateEmployeeController(
      mongoUpdateEmployeeRepository
    );

    const { body, statusCode } = await updateEmployeeController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // GET (By ID): localhost:3000/employees/:id
  app.get('/employees/:id', async (req: Request, res: Response) => {
    const mongoGetEmployeeRepository = new MongoGetEmployeeRepository();

    const getEmployeeController = new GetEmployeeController(mongoGetEmployeeRepository);

    const { body, statusCode } = await getEmployeeController.handle({
      params: req.params
    });

    res.status(statusCode).send(body);
  });

  // DELETE: localhost:3000/employees/:id
  app.delete('/employees/:id', async (req: Request, res: Response) => {
    const mongoDeleteEmployeeRepository = new MongoDeleteEmployeeRepository();

    const deleteEmployeeController = new DeleteEmployeeController(mongoDeleteEmployeeRepository);

    const { body, statusCode } = await deleteEmployeeController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });


  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Application running on port: ${port}!`));
}

main();

