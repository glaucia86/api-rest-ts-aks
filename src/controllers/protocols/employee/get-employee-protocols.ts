/**
 * file: src/controllers/get-employee/protocols.ts
 * description: file responsible for implement interface for 'get-employee.ts
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../../models/employee";

export interface IGetEmployeeRepository {
  getEmployeeById(id: string): Promise<Employee | null>
}
