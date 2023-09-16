/**
 * file: src/repositories/employee/get-employees-repository.ts
 * description: file responsible for implement the class 'MongoGetEmployeesRepository'
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { IGetEmployeesRepository } from "../../controllers/get-employees/protocols";
import { MongoClient } from "../../database/mongo";
import { Employee } from "../../models/employee";
import { MongoEmployee } from "../mongo-protocols";

export class MongoGetEmployeesRepository implements IGetEmployeesRepository {

  async getEmployees(): Promise<Employee[]> {
    const employees = await MongoClient.db
      .collection<MongoEmployee>('employees')
      .find({})
      .toArray();

    return employees.map(({ _id, ...restEmployee }) => ({
      ...restEmployee,
      id: _id.toHexString(),
    }));
  }
}
