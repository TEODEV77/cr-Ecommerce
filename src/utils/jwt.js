import jwt from 'jsonwebtoken';
import { environment } from '../env.js';
export default class Jwt {

  
  static jwt_secret = environment.jwt.secret;
  static SECRET = process.env.JWT_SECRET || this.jwt_secret; 
  
  static generateToken = (payload,type,expiresIn) => {
    payload.type = type;
    return jwt.sign(payload, this.SECRET, {
      expiresIn: expiresIn,
    });
  };

  static verifyToken = (token) => {
    return jwt.verify(token, this.SECRET);
  };

  static expired = (message) => {
    return (message === "jwt expired");
  }

  static invalid = (message) => {
    return (message === "invalid token");                     
  }
}