/**
 * file: src/repositories/mongo-protocols.ts
 * description: file responsible for implement the class 'MongoProtocols'
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Employee } from "../models/employee";

export type MongoEmployee = Omit<Employee, 'id'>