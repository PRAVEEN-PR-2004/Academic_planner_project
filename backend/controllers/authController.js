const jwt = require("jsonwebtoken");
const User = require("../model/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Signup User (NO hashing)
exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password, // ✅ plain password stored directly (for testing only)
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ token, name: newUser.name });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login User (NO bcrypt)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, name: user.name });

    console.log("Login attempt for:", email);
    console.log("Password Match:", isMatch);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
