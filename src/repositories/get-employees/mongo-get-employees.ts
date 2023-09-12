/**
 * file: src/repositories/get-employees/mongo-get-employees.ts
 * description: file responsible for implement the class 'MongoGetEmployeesRepository'
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { IGetEmployeesRepository } from "../../controllers/get-employees/protocols";
import { Employee } from "../../models/employee";

export class MongoGetEmployeesRepository implements IGetEmployeesRepository {
  async getEmployees(): Promise<Employee[]> {
    return [
      {
        firstName: 'Glaucia',
        lastName: 'Lemos',
        email: 'gllemos@microsoft.com',
        rolePosition: 'Developer Advocate',
        password: '123456'
      }
    ];
  }

}