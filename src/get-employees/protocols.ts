/**
 * file: src/get-employees/protocols.ts
 * description: file responsible for implement interface for 'get-employees.ts
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface IGetEmployeesController {
  handle(): any;
}

export interface IGetEmployeesRepository {
  getEmployees(): Promise<Employee[]>
}