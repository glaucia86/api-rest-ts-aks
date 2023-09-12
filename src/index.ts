/**
 * file: src/index.ts
 * description: file responsible for the main entry point of the application.
 * data: 09/11/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Application running on port: ${port}!`));

app.get('/', (req, res) => {
  res.send('Hi, friends!');
});