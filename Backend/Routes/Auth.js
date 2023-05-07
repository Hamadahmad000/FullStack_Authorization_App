const {
  handleSignUp,
  handleSingIn,
  verifyEmail,
} = require("../Controller/Auth-Controller");
const {
  userValidation,
  userValidationResult,
  userSignInValidation,
} = require("../Middleware/Validation");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
// Singup Route
router.post("/sign-up", userValidation, userValidationResult, handleSignUp);

// SignIn Route
router.post(
  "/sign-in",
  userSignInValidation,
  userValidationResult,
  handleSingIn
);
router.post("/verify-email", verifyEmail);

module.exports = router;
