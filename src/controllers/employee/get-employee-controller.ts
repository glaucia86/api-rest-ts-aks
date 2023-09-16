/**
 * file: src/controllers/employee/get-employee-controller.ts
 * description: file responsible for retrieve employee by id.
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { badRequest, ok, serverError } from "../protocols/helpers-protocols";
import { HttpRequest, HttpResponse, IController } from "../protocols/http-protocols";
import { IGetEmployeeRepository } from "../protocols/employee/get-employee-protocols";

export class GetEmployeeController implements IController {
  constructor(private readonly getEmployeeRepository: IGetEmployeeRepository) { }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Employee | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest('Employee ID is required');
      }

      const employee = await this.getEmployeeRepository.getEmployeeById(id);

      if (!employee) {
        return badRequest('Employee not found');
      }

      return ok<Employee>(employee);
    } catch (error) {
      return serverError();
    }
  }
}