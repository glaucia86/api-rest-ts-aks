/**
 * file: src/repositories/update-employee/mongo-update-employee.ts
 * description: file responsible for implement the class 'MongoUpdateEmployeeRepository'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { ObjectId } from "mongodb";
import { IUpdateEmployeeRepository, UpdateEmployeeParams } from "../../controllers/update-employee/protocols";
import { MongoClient } from "../../database/mongo";
import { Employee } from "../../models/employee";

export class MongoUpdateEmployeeRepository implements IUpdateEmployeeRepository {
  async updateEmployee(id: string, params: UpdateEmployeeParams): Promise<Employee> {
    try {
      await MongoClient.db
        .collection('employees')
        .updateOne({ _id: new ObjectId(id) }, {
          $set: {
            ...params
          }
        });

      const employee = await MongoClient.db
        .collection<Omit<Employee, 'id'>>('employees')
        .findOne({ _id: new ObjectId(id) });

      if (!employee) {
        throw new Error('Employee not updated!');
      }

      const { _id, ...restEmployee } = employee;
      return {
        id: _id.toHexString(),
        ...restEmployee,
      }
    } catch (error) {
      console.log('Error...:', error);
      throw error;
    }
  }
}
