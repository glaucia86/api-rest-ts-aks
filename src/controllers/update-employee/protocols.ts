/**
 * file: src/controllers/update-employee/protocols.ts
 * description: file responsible for implement interface for 'update-employee.ts
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";

export interface UpdateEmployeeParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateEmployeeRepository {
  updateEmployee(id: string, params: UpdateEmployeeParams): Promise<Employee>
}