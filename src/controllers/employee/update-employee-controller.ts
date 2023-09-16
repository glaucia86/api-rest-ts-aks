/**
 * file: src/controllers/employee/update-employee-controller.ts
 * description: file responsible for implement the class 'UpdateEmployeeController'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { badRequest, ok, serverError } from "../protocols/helpers-protocols";
import { HttpRequest, HttpResponse, IController } from "../protocols/http-protocols";
import { IUpdateEmployeeRepository, UpdateEmployeeParams } from "../protocols/employee/update-employee-protocols";

export class UpdateEmployeeController implements IController {
  constructor(private readonly updateEmployeeRepository: IUpdateEmployeeRepository) { }

  async handle(
    httpRequest: HttpRequest<UpdateEmployeeParams>
  ): Promise<HttpResponse<Employee | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing employee id");
      }

      const allowedFieldsToUpdate: (keyof UpdateEmployeeParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateEmployeeParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const employee = await this.updateEmployeeRepository.updateEmployee(id, body);

      return ok<Employee>(employee);
    } catch (error) {
      return serverError();
    }
  }
}
