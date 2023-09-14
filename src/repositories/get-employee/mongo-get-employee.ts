/**
 * file: src/repositories/get-employee/mongo-get-employee.ts
 * description: file responsible for implement the class 'MongoGetEmployeeRepository'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { Employee } from "../../models/employee";
import { IGetEmployeeRepository } from "../../controllers/get-employee/protocols";
import { MongoEmployee } from "../mongo-protocols";

export class MongoGetEmployeeRepository implements IGetEmployeeRepository {
  async getEmployeeById(id: string): Promise<Employee> {
    try {
      const employee = await MongoClient.db
        .collection<MongoEmployee>('employees')
        .findOne({ _id: new ObjectId(id) });

      // if the employee was not found, we throw an error
      if (!employee) {
        throw new Error('Employee not found');
      }

      // if the employee was found, we return the employee
      const { _id, ...restEmployee } = employee;
      return {
        id: _id.toHexString(),
        ...restEmployee,
      }
    } catch (error) {
      console.log('Error fetching Employee...:', error);
      throw error;
    }
  }
}