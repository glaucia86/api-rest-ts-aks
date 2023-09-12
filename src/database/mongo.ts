/**
 * file: src/database/mongo.ts
 * description: file responsible for create the connection with mongodb
 * data: 09/12/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { MongoClient as Mongo, Db } from 'mongodb';

export const MongoClient = {

  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || 'localhost:27017';
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db('employees-db');

    this.client = client;
    this.db = db;

    console.log('MongoDB connected!')
  },
};