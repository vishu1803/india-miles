const {
  findUserByEmail,
  findUserById,
  createUser,
  comparePassword,
  generateTokensForUser,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
} = require("../services/authService");

const {
  verifyRefreshToken,
  getAccessCookieOptions,
  getRefreshCookieOptions,
  generateAccessToken,
} = require("../utils/tokenUtils");

/**
 * POST /api/auth/register
 * Register a new user.
 */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Create user
    const user = await createUser(name, email, password);

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokensForUser(user);

    // Set HTTP-only cookies
    res.cookie("accessToken", accessToken, getAccessCookieOptions());
    res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());

    console.log(`[Auth] User registered: ${user.email}`);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("[Auth Register Error]", err.message);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
}

/**
 * POST /api/auth/login
 * Login an existing user.
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokensForUser(user);

    // Set HTTP-only cookies
    res.cookie("accessToken", accessToken, getAccessCookieOptions());
    res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());

    console.log(`[Auth] User logged in: ${user.email}`);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("[Auth Login Error]", err.message);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
}

/**
 * POST /api/auth/refresh
 * Refresh the access token using a valid refresh token.
 */
async function refresh(req, res) {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided.",
      });
    }

    // Verify JWT signature
    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token.",
      });
    }

    // Check token exists in database (not revoked)
    const storedToken = await findRefreshToken(token);
    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has been revoked.",
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    // Set new access token cookie
    res.cookie("accessToken", newAccessToken, getAccessCookieOptions());

    console.log(`[Auth] Token refreshed for: ${decoded.email}`);

    return res.status(200).json({
      success: true,
      message: "Token refreshed.",
    });
  } catch (err) {
    console.error("[Auth Refresh Error]", err.message);
    return res.status(500).json({
      success: false,
      message: "Token refresh failed.",
    });
  }
}

/**
 * POST /api/auth/logout
 * Logout user — delete refresh token and clear cookies.
 */
async function logout(req, res) {
  try {
    const token = req.cookies.refreshToken;

    // Delete refresh token from database if present
    if (token) {
      await deleteRefreshToken(token);
    }

    // Clear cookies
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });

    console.log("[Auth] User logged out");

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (err) {
    console.error("[Auth Logout Error]", err.message);
    return res.status(500).json({
      success: false,
      message: "Logout failed.",
    });
  }
}

/**
 * GET /api/auth/me
 * Get current authenticated user's profile.
 * Protected by verifyToken middleware.
 */
async function getMe(req, res) {
  try {
    const user = await findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("[Auth Me Error]", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile.",
    });
  }
}

/**
 * GET /api/auth/google/callback
 * Handle successful Google OAuth callback.
 */
async function googleCallback(req, res) {
  try {
    const user = req.user; // Set by passport

    if (!user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=Google login failed`,
      );
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokensForUser(user);

    // Set HTTP-only cookies
    res.cookie("accessToken", accessToken, getAccessCookieOptions());
    res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());

    console.log(`[Auth] User logged in via Google: ${user.email}`);

    // Redirect to frontend home page
    return res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
  } catch (err) {
    console.error("[Auth Google Callback Error]", err.message);
    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=Authentication failed`,
    );
  }
}

module.exports = { register, login, refresh, logout, getMe, googleCallback };
