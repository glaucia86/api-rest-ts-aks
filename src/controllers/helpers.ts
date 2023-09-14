/**
 * file: src/controllers/helpers.ts
 * description: file responsible for all the helpers in the application
 * data: 09/13/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { HttpResponse } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: 200,
  body
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: 201,
  body
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: 'Something went wrong!'
  };
};