const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

let otpStore = {};

// Test route
app.get("/test", (req, res) => {
  res.send("Server is working 🚀");
});

// Send OTP
app.post("/send-otp", (req, res) => {
  try {
    console.log("Request received:", req.body);

    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number required" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    otpStore[phone] = {
      otp: otp,
      expires: Date.now() + 5 * 60 * 1000
    };

    console.log("OTP for", phone, "is", otp);

    res.json({ success: true, message: "OTP sent" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (
      otpStore[phone] &&
      otpStore[phone].otp == otp &&
      otpStore[phone].expires > Date.now()
    ) {
      delete otpStore[phone];
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(400).json({ error: "Invalid or expired OTP" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});