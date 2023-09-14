/**
 * file: src/controllers/delete-employee/protocols.ts
 * description: file responsible for implement interface for 'delete-employee' controller
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../../models/employee";

export interface IDeleteEmployeeRepository {
  deleteEmployee(id: string): Promise<Employee>
}