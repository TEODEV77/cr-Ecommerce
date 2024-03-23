import jwt from 'jsonwebtoken';

export default class Jwt {

  static SECRET = process.env.JWT_SECRET || "7q)zP-G5RU2%O3E7BpI£6VB";  
    
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