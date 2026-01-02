export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // 7 Days Expiry
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    httpOnly: true,
    secure: false, // Localhost ke liye FALSE (Important)
    sameSite: "Lax",
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      message,
      user,
      token,
    });
};