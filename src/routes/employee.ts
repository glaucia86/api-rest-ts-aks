/**
 * file: src/routes/employee.ts
 * description: file responsible for the routes of Employee API
 * data: 09/16/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Router, Request, Response } from 'express';
import * as controllers from '../controllers';
import * as repositories from '../repositories';

const router = Router();

// GET: localhost:3000/employees
router.get('/employees', async (_req: Request, res: Response) => {

  const getEmployeesController = new controllers.GetEmployeesController(
    new repositories.MongoGetEmployeesRepository());

  const { body, statusCode } = await getEmployeesController.handle();

  res.status(statusCode).send(body);
});

// POST: localhost:3000/employees
router.post('/employees', async (req: Request, res: Response) => {
  const createEmployeeController = new controllers.CreateEmployeeController(
    new repositories.MongoCreateEmployeeRepository());

  const { body, statusCode } = await createEmployeeController.handle({
    body: req.body
  });

  res.status(statusCode).send(body);
});

// PATCH: localhost:3000/employees/:id
router.patch("/employees/:id", async (req, res) => {

  const updateEmployeeController = new controllers.UpdateEmployeeController(
    new repositories.MongoUpdateEmployeeRepository());

  const { body, statusCode } = await updateEmployeeController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

// GET (By ID): localhost:3000/employees/:id
router.get('/employees/:id', async (req: Request, res: Response) => {

  const getEmployeeController = new controllers.GetEmployeeController(
    new repositories.MongoGetEmployeeRepository());

  const { body, statusCode } = await getEmployeeController.handle({
    params: req.params
  });

  res.status(statusCode).send(body);
});

// DELETE: localhost:3000/employees/:id
router.delete('/employees/:id', async (req: Request, res: Response) => {

  const deleteEmployeeController = new controllers.DeleteEmployeeController(
    new repositories.MongoDeleteEmployeeRepository());

  const { body, statusCode } = await deleteEmployeeController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default router;

