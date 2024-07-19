export default class CustomError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      // Mengatur prototipe secara manual karena kita menggunakan 'extends'
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }