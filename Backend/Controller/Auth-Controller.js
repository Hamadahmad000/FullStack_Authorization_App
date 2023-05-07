const User = require("../Models/userSchema");
const verificationToken = require("../Models/VerificationSchema");
const { sendError } = require("../utils/Helper");
const jwt = require("jsonwebtoken");
const {
  generateOTP,
  MailTransport,
  generateEmailTemplate,
  plainEmailTemplate,
} = require("../utils/Mail");
const { isValidObjectId } = require("mongoose");
// Handling SingUp

const handleSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) return sendError(res, "This email is already exist");
    const newUser = await new User({ name, email, password });
    const OTP = generateOTP();
    const newOTP = await new verificationToken({
      own: newUser._id,
      token: OTP,
    });

    await newOTP.save();
    await newUser.save();

    MailTransport().sendMail({
      from: "emailverificatin@gmail.com",
      to: newUser.email,
      subject: "Verify your email account",
      html: generateEmailTemplate(OTP),
    });

    res.json({ success: true, messsage: "ok", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error while signup" });
    console.log(error);
  }
};

// Handling sing-in
const handleSingIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim())
      return sendError(res, "email/password missing!");
    const isRegisted = await User.findOne({ email });
    if (!isRegisted) return sendError(res, "User not found please Signup!");
    const passwordMatched = await isRegisted.comparePassword(password);
    if (!passwordMatched)
      return sendError(res, "email/password does not matched!");
    const token = await jwt.sign(
      { userID: isRegisted._id },
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: "1day",
      }
    );

    res.send({
      success: true,
      user: { email: isRegisted.email, password: isRegisted.password },
      token: token,
    });
  } catch (error) {
    sendError(res, "Server error while singin!");
    console.log(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userID, otp } = req.body;
    if (!userID || !otp.trim())
      return sendError(res, "invalid request missing Paramters!");
    if (!isValidObjectId(userID)) sendError(res, "Invalid user ID");
    const user = await User.findById(userID);
    if (!user) return sendError(res, "Sorry, user not found");
    if (user.verified)
      return sendError(res, "This account is already verified");
    const token = await verificationToken.findOne({ own: user._id });
    if (!token) return sendError(res, "Sorry, user not found");
    const isTokenMatched = await token.compareToken(otp);
    if (!isTokenMatched) return sendError(res, "OTP is not matched");
    token.verified = true;
    await verificationToken.findByIdAndDelete(token._id);
    await user.save();
    MailTransport().sendMail({
      from: "emailverificatin@gmail.com",
      to: user.email,
      subject: "Welcome Email!",
      html: plainEmailTemplate(
        "email verified successfully",
        "Thanks for connecting us"
      ),
    });
    res
      .status(200)
      .json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    sendError(res, "Server error while OTP verification");
    console.log(error);
  }
};

module.exports = {
  handleSignUp,
  handleSingIn,
  verifyEmail,
};
