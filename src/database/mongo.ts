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
    const url = process.env.MONGODB_LOCAL_URL as string;

    const client = new Mongo(url);
    const db = client.db(process.env.MONGODB_NAME);

    console.log(process.env.MONGODB_NAME)

    this.client = client;
    this.db = db;
  },
};