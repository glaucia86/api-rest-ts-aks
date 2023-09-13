/**
 * file: src/controllers/create-employee/protocols.ts
 * description: file responsible for implement interface for 'create-employees.ts
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateEmployeeController {
  handle(httpRequest: HttpRequest<CreateEmployeeParams>
  ): Promise<HttpResponse<Employee>>;
}

export interface CreateEmployeeParams {
  firstName: string;
  lastName: string;
  email: string;
  rolePosition: string;
  password: string;
}

export interface ICreateEmployeeRepository {
  createEmployee(params: CreateEmployeeParams): Promise<Employee>
}
