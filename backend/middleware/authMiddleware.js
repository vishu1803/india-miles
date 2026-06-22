const { verifyAccessToken } = require("../utils/tokenUtils");

/**
 * Auth Middleware — verifyToken
 * Reads access token from HTTP-only cookies,
 * verifies it, and attaches decoded user data to req.user.
 *
 * If the token is expired, the frontend should call /api/auth/refresh
 * to get a new access token.
 */
function verifyToken(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
        code: "NO_TOKEN",
      });
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired.",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid access token.",
      code: "INVALID_TOKEN",
    });
  }
}

module.exports = { verifyToken };
