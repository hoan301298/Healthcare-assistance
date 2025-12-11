import { COOKIE_OPTIONS } from "../../../middleware/cookies/cookie.config.js";
import { loginService, registerService } from "../service/auth.service.js";

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
      message: response.message
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
      message: response.message
    });
  } catch (error) {
    console.error({ message: error });
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const logoutController = async (req, res) => {
  try {
    const userId = req.user?.id; // set by authMiddleware

    if (!userId) {
      
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.PRODUCTION === "true",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export {
  loginController,
  registerController,
  logoutController
};