import UserDto from "../dto/user.dto.js";
import AuthService from "../services/auth.service.js";
import UsersService from "../services/users.service.js";
import { createUser } from "../validations/user.validation.js";
import { cookieOptions } from "../utils/cookieOptions.js";
import { AnyMessage } from "../utils/messages.js";

export default class AuthController {
  static register = async (body, res) => {
    try {
      const result = createUser(body);

      if (result != 1) {
        return res.status(400).json({ message: result });
      }

      const newUser = await AuthService.register(body);
      return res.status(201).json(new UserDto(newUser));
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static login = async (body, res) => {
    try {
      const user = await UsersService.findBy({ email: body.email });
      const token = await AuthService.login(body.password, user);
      //res.cookie("token", token, cookieOptions);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ message: "User or password invalid" });
    }
  };
}
