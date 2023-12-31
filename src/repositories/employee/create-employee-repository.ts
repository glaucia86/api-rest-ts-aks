/**
 * file: src/repositories/employee/create-employee-repository.ts
 * description: file responsible for implement the class 'MongoCreateEmployeeRepository'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { CreateEmployeeParams, ICreateEmployeeRepository } from "../../controllers/protocols/employee/create-employee-protocols";
import { MongoClient } from "../../database/mongo";
import { Employee } from "../../models/employee";
import { MongoEmployee } from "../mongo-protocols";

export class MongoCreateEmployeeRepository implements ICreateEmployeeRepository {
  async createEmployee(params: CreateEmployeeParams): Promise<Employee> {

    try {
      // we are creating a new employee in the database
      const { insertedId } = await MongoClient.db
        .collection('employees')
        .insertOne(params);

      // here we are searching if the employee was created
      const employee = await MongoClient.db
        .collection<MongoEmployee>('employees')
        .findOne({ _id: insertedId });

      // if the employee was not created, we throw an error
      if (!employee) {
        throw new Error('Employee not created');
      }

      // if the employee was created, we return the employee
      const { _id, ...restEmployee } = employee;
      return {
        id: _id.toHexString(),
        ...restEmployee,
      }
    } catch (error) {
      console.log('Error to create a new employee...:', error);
      throw error;
    }
  }
}