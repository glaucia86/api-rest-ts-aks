/**
 * file: src/controllers/get-employees/protocols.ts
 * description: file responsible for implement interface for 'get-employees.ts
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";
import { HttpResponse } from "../protocols";

export interface IGetEmployeesController {
  handle(): Promise<HttpResponse<Employee[]>>;
}

export interface IGetEmployeesRepository {
  getEmployees(): Promise<Employee[]>
}