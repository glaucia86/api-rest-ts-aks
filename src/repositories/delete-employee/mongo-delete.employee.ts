/**
 * file: src/repositories/delete-employee/mongo-delete.employee.ts
 * description: file responsible for implement the class 'MongoDeleteEmployee'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { ObjectId } from "mongodb";
import { IDeleteEmployeeRepository } from "../../controllers/delete-employee/protocols";
import { MongoClient } from "../../database/mongo";
import { Employee } from "../../models/employee";

export class MongoDeleteEmployeeRepository implements IDeleteEmployeeRepository {
  async deleteEmployee(id: string): Promise<Employee> {
    try {
      const employee = await MongoClient.db
        .collection<Omit<Employee, 'id'>>('employees')
        .findOne({ _id: new ObjectId(id) });

      if (!employee) {
        throw new Error('Employee not found');
      }

      const { deletedCount } = await MongoClient.db
        .collection('employees')
        .deleteOne({ _id: new ObjectId(id) });

      if (!deletedCount) {
        throw new Error('Employee not deleted');
      }

      const { _id, ...restEmployee } = employee;

      return {
        id: _id.toHexString(),
        ...restEmployee
      }
    } catch (error) {
      console.log('Error...:', error);
      throw error;
    }
  }
}