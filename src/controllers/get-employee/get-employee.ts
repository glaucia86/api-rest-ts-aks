/**
 * file: src/controllers/get-employee/get-employee.ts
 * description: file responsible for retrieve employee by id.
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { HttpRequest, HttpResponse } from "../protocols";
import { IGetEmployeeController, IGetEmployeeRepository } from "./protocols";

export class GetEmployeeController implements IGetEmployeeController {
  constructor(private readonly getEmployeeRepository: IGetEmployeeRepository) { }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Employee>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Employee ID is required',
        };
      }

      const employee = await this.getEmployeeRepository.getEmployeeById(id);

      if (!employee) {
        return {
          statusCode: 404,
          body: 'Employee not found',
        };
      }

      return {
        statusCode: 200,
        body: employee,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Error fetching Employee',
      };
    }
  }
}