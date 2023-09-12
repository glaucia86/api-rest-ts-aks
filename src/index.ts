/**
 * file: src/index.ts
 * description: file responsible for the main entry point of the application.
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import express from 'express';
import { config } from 'dotenv';
import { GetEmployeesController } from './controllers/get-employees/get-employees';
import { MongoGetEmployeesRepository } from './repositories/get-employees/mongo-get-employees';

config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Application running on port: ${port}!`));

app.get('/employees', async (_req, res) => {
  const mongoGetEmployeesRepository = new MongoGetEmployeesRepository();

  const getEmployeesController = new GetEmployeesController(mongoGetEmployeesRepository);

  const { body, statusCode } = await getEmployeesController.handle();

  res.send(body).status(statusCode);
});