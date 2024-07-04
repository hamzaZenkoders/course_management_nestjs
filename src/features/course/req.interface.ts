import { Request } from 'express';

interface CustomRequest extends Request {
  user?: any; // Define the type of 'user' based on your application's user object
}

export default CustomRequest;
