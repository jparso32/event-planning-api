import * as authService from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email, and password are required"
      });
    }

    const user = await authService.signup(req.body);

    res.status(201).json(user);
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        error: "Email or username already exists"
      });
    }

    res.status(400).json({
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const result = await authService.login(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error: "Invalid email or password"
    });
  }
};