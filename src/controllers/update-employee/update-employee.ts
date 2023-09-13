/**
 * file: src/controllers/update-employee/update-employee.ts
 * description: file responsible for implement the class 'UpdateEmployeeController'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateEmployeeController, IUpdateEmployeeRepository, UpdateEmployeeParams } from "./protocols";

export class UpdateEmployeeController implements IUpdateEmployeeController {

  constructor(private readonly updateEmployeeRepository: IUpdateEmployeeRepository) { }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Employee>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Employee ID is required'
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateEmployeeParams)[] =
        [
          'firstName',
          'lastName',
          'rolePosition',
          'password'
        ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        field => !allowedFieldsToUpdate.includes(field as keyof UpdateEmployeeParams));

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: 'Some field is not allowed to update'
        };
      }

      const employee = await this.updateEmployeeRepository.updateEmployee(id, body);

      return {
        statusCode: 200,
        body: employee
      };

    } catch (error) {
      return {
        statusCode: 500,
        body: 'Error to update Employee!'
      }
    }
  }

}