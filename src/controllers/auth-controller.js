import UserService from "../services/user-service.js";

const userService = new UserService();

export const signup = async (req, res) => {
  try {
    const response = await userService.signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: response,
      message: "Successfully created a user",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Something went wrong",
      success: false,
      err: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const response = await userService.signin(req.body);
    return res.status(200).json({
      data: response,
      message: "Successfully signed in",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Something went wrong",
      success: false,
      err: error,
    });
  }
};
