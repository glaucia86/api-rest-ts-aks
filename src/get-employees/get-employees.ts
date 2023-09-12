/**
 * file: src/get-employees/get-employees.ts
 * description: file responsible for listing all employees.
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { IGetEmployeesController, IGetEmployeesRepository } from "./protocols";

export class GetEmployeesController implements IGetEmployeesController {
  constructor(private readonly getEmployeesRepository: IGetEmployeesRepository) { }

  async handle() {
    try {
      const employees = await this.getEmployeesRepository.getEmployees();

      return {
        statusCode: 200,
        body: employees
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error...!')
      }
    }
  }
}