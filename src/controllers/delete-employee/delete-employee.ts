/**
 * file: src/controllers/delete-employee/delete-employee.ts
 * description: file responsible for implement the class 'DeleteEmployee'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteEmployeeController, IDeleteEmployeeRepository } from "./protocols";

export class DeleteEmployeeController implements IDeleteEmployeeController {

  constructor(private readonly deleteEmployeeRepository: IDeleteEmployeeRepository) { }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Employee>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing Employee Id'
        }
      }

      const employee = await this.deleteEmployeeRepository.deleteEmployee(id);

      return {
        statusCode: 200,
        body: employee
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Error to delete employee'
      }
    }
  }

}