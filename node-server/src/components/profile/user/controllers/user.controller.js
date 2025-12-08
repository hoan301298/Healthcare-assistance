import { COOKIE_OPTIONS } from "../../../middleware/cookies/cookie.config.js";
import { loginService, registerService } from "../services/user.service.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Fields are missing"
    })
  }

  try {
    const response = await loginService(email, password);

    if (!response.success) {
      return res.status(401).json(response);
    }

    res.cookie("token", response.token, COOKIE_OPTIONS)

    return res.status(200).json({
      success: true,
      user: response.user,
      mesesage: response.message
    });
  } catch (error) {
    console.error({ message: error })
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const registerController = async (req, res) => {
  const userRequest = req.body;

  if (!userRequest || !userRequest.name || !userRequest.email || !userRequest.password) {
    return res.status(400).json({
      success: false,
      message: "Fields are missing"
    })
  }

  try {
    const response = await registerService(userRequest);

    if (!response.success) {
      return res.status(401).json(response);
    }

    res.cookie("token", response.token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      user: response.user,
      mesesage: response.message
    });
  } catch (error) {
    console.error({ message: error });
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export {
  loginController,
  registerController
};