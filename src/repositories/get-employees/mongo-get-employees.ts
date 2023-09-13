/**
 * file: src/repositories/get-employees/mongo-get-employees.ts
 * description: file responsible for implement the class 'MongoGetEmployeesRepository'
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { IGetEmployeesRepository } from "../../controllers/get-employees/protocols";
import { MongoClient } from "../../database/mongo";
import { Employee } from "../../models/employee";

export class MongoGetEmployeesRepository implements IGetEmployeesRepository {

  async getEmployees(): Promise<Employee[]> {
    const employees = await MongoClient.db
      .collection<Omit<Employee, "id">>('employees')
      .find({})
      .toArray();

    return employees.map(({ _id, ...restEmployee }) => ({
      ...restEmployee,
      id: _id.toHexString(),
    }));
  }
}
