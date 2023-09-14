/**
 * file: src/controllers/create-employee/create-employee.ts
 * description: file responsible for implement the class 'CreateEmployeeController'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import validator from 'validator';
import { Employee } from "../../models/employee";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateEmployeeParams, ICreateEmployeeRepository } from "./protocols";
import { badRequest, created, serverError } from '../helpers';

export class CreateEmployeeController implements IController {
  constructor(private readonly createEmployeeRepository: ICreateEmployeeRepository) { }

  async handle(httpRequest: HttpRequest<CreateEmployeeParams>
  ): Promise<HttpResponse<Employee | string>> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'rolePosition', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateEmployeeParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const isEmailValid = validator.isEmail(httpRequest.body!.email);

      if (!isEmailValid) {
        return badRequest('E-mail is not valid');
      }

      const employee = await this.createEmployeeRepository.createEmployee(httpRequest.body!);

      return created<Employee>(employee);
    } catch (error) {
      return serverError();
    }
  }

}