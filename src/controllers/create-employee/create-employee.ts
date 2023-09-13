/**
 * file: src/controllers/create-employee/create-employee.ts
 * description: file responsible for implement the class 'CreateEmployeeController'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import validator from 'validator';
import { Employee } from "../../models/employee";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateEmployeeParams, ICreateEmployeeController, ICreateEmployeeRepository } from "./protocols";

export class CreateEmployeeController implements ICreateEmployeeController {
  constructor(private readonly createEmployeeRepository: ICreateEmployeeRepository) { }

  async handle(httpRequest: HttpRequest<CreateEmployeeParams>
  ): Promise<HttpResponse<Employee>> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'rolePosition', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateEmployeeParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      // verificar se o email é válido
      const isEmailValid = validator.isEmail(httpRequest.body!.email);

      if (!isEmailValid) {
        return {
          statusCode: 400,
          body: 'E-mail is not valid',
        };
      }

      const employee = await this.createEmployeeRepository.createEmployee(httpRequest.body!);

      return {
        statusCode: 201,
        body: employee
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong...'
      }
    }
  }

}