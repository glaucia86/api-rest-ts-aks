/**
 * file: src/controllers/get-employees/get-employees.ts
 * description: file responsible for listing all employees.
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetEmployeesRepository } from "./protocols";

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