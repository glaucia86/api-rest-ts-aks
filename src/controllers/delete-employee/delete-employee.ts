/**
 * file: src/controllers/delete-employee/delete-employee.ts
 * description: file responsible for implement the class 'DeleteEmployee'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteEmployeeRepository } from "./protocols";

export class DeleteEmployeeController implements IController {

  constructor(private readonly deleteEmployeeRepository: IDeleteEmployeeRepository) { }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Employee | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest('Missing Employee Id');
      }

      const employee = await this.deleteEmployeeRepository.deleteEmployee(id);

      return ok<Employee>(employee)
    } catch (error) {
      return serverError();
    }
  }

}