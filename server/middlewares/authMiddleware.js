import JWT from 'jsonwebtoken';

// Token-based Protected Route
export const requireSignin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};
