import { ResponseDTO } from '../models/dto/responseDTO';

export enum StatusCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNPROCESSABLE_ENTITY = 422,
}

class Result {
  private statusCode: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString () {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object): ResponseDTO {
    const result = new Result(StatusCode.SUCCESS, 'success', data);
    return result.bodyToString();
  }

  static error( message: string, httpStatusCode: StatusCode | number): ResponseDTO {
    const result = new Result(httpStatusCode, message);
    console.log(result.bodyToString());
    return result.bodyToString();
  }
}
