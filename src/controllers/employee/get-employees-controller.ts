/**
 * file: src/controllers/employee/get-employees-controller.ts
 * description: file responsible for listing all employees.
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { ok, serverError } from "../protocols/helpers-protocols";
import { HttpResponse, IController } from "../protocols/http-protocols";
import { IGetEmployeesRepository } from "../protocols/employee/get-employees-protocols";

export class GetEmployeesController implements IController {
  constructor(private readonly getEmployeesRepository: IGetEmployeesRepository) { }

  async handle(): Promise<HttpResponse<Employee[] | string>> {
    try {
      const employees = await this.getEmployeesRepository.getEmployees();

      return ok<Employee[]>(employees);
    } catch (error) {
      return serverError();
    }
  }
}