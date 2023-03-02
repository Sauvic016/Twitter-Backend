import { UserRepository } from "../repository/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findBy({ email });
      return user;
    } catch (error) {
      console.log("Something went wrong in the Service layer");
      throw error;
    }
  }

  async signin({ email, password }) {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw {
          message: "No user found",
        };
      }
      if (!user.comparePassword(password)) {
        throw {
          message: "Incorrect password",
        };
      }
      const token = user.genJWT();
      return token;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
