const API_BASE = "https://smart-crop-9udb.onrender.com";

// ─── State ────────────────────────────────────────────────────────────────
let isSignup = false;
let currentLang = "en";
let resendTimer = null;

// ─── Translations ────────────────────────────────────────────────────────
const T = {
  en: {
    logoSub: "Powered by AI",
    loginTitle: "Welcome back",
    signupTitle: "Create account",
    formSub: "Enter your details to continue",
    labelName: "Full Name",
    labelPhone: "Phone Number",
    labelOtp: "One-Time Password",
    phonePlaceholder: "98765 43210",
    namePlaceholder: "Rajan Kumar",
    btnSend: "Send OTP",
    btnVerify: "Verify & Continue",
    otpTitle: "Verify OTP",
    otpSub: "Sent to ",
    switchHintLogin: "New here?",
    switchLinkLogin: "Sign Up instead",
    switchHintSignup: "Already registered?",
    switchLinkSignup: "Log In instead",
    resendHint: "Didn't receive it?",
    resendLink: "Resend OTP",
    errPhone: "Enter a valid 10-digit number.",
    errName: "Please enter your full name.",
    errOtp: "Enter a valid 4-digit OTP.",
    toastOtpSent: "OTP sent successfully.",
    toastSuccess: "Login successful! Redirecting...",
    toastResent: "OTP sent again.",
    toastServer: "Server error. Please try again."
  },
  hi: {
    logoSub: "AI द्वारा संचालित",
    loginTitle: "स्वागत है",
    signupTitle: "नया खाता बनाएं",
    formSub: "जारी रखने के लिए विवरण दर्ज करें",
    labelName: "पूरा नाम",
    labelPhone: "फ़ोन नंबर",
    labelOtp: "वन-टाइम पासवर्ड",
    phonePlaceholder: "98765 43210",
    namePlaceholder: "राजन कुमार",
    btnSend: "ओटीपी भेजें",
    btnVerify: "सत्यापित करें",
    otpTitle: "ओटीपी सत्यापन",
    otpSub: "भेजा गया: ",
    switchHintLogin: "नए उपयोगकर्ता?",
    switchLinkLogin: "साइन अप करें",
    switchHintSignup: "पहले से खाता है?",
    switchLinkSignup: "लॉगिन करें",
    resendHint: "ओटीपी नहीं मिला?",
    resendLink: "पुनः भेजें",
    errPhone: "सही 10 अंकों का नंबर दर्ज करें।",
    errName: "कृपया अपना पूरा नाम दर्ज करें।",
    errOtp: "सही 4 अंकों का ओटीपी दर्ज करें।",
    toastOtpSent: "ओटीपी सफलतापूर्वक भेजा गया।",
    toastSuccess: "लॉगिन सफल! आगे बढ़ रहे हैं...",
    toastResent: "ओटीपी फिर से भेजा गया।",
    toastServer: "सर्वर त्रुटि। कृपया पुनः प्रयास करें।"
  }
};

function t(key) {
  return T[currentLang][key] || key;
}

// ─── Language ────────────────────────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  document.getElementById("enBtn").classList.toggle("active", lang === "en");
  document.getElementById("hiBtn").classList.toggle("active", lang === "hi");
  applyLang();
}

function applyLang() {
  const phone = document.getElementById("phone").value.replace(/\s/g, "").trim();

  document.getElementById("logoSub").innerText = t("logoSub");
  document.getElementById("formTitle").innerText = isSignup ? t("signupTitle") : t("loginTitle");
  document.getElementById("formSub").innerText = t("formSub");
  document.getElementById("labelName").innerText = t("labelName");
  document.getElementById("labelPhone").innerText = t("labelPhone");
  document.getElementById("labelOtp").innerText = t("labelOtp");

  document.getElementById("name").placeholder = t("namePlaceholder");
  document.getElementById("phone").placeholder = t("phonePlaceholder");

  document.getElementById("btnSendLabel").innerText = t("btnSend");
  document.getElementById("btnVerifyLabel").innerText = t("btnVerify");
  document.getElementById("otpTitle").innerText = t("otpTitle");
  document.getElementById("resendHint").innerText = t("resendHint");
  document.getElementById("resendLink").innerText = t("resendLink");

  document.getElementById("switchHint").innerText = isSignup
    ? t("switchHintSignup")
    : t("switchHintLogin");

  document.getElementById("switchLink").innerText = isSignup
    ? t("switchLinkSignup")
    : t("switchLinkLogin");

  document.getElementById("nameField").style.display = isSignup ? "block" : "none";

  const phoneDisplay = document.getElementById("phoneDisplay");
  if (phoneDisplay) {
    phoneDisplay.innerText = phone;
  }
}

// ─── Mode Toggle ─────────────────────────────────────────────────────────
function toggleMode() {
  isSignup = !isSignup;
  clearFieldMsg("nameMsg");
  clearFieldMsg("phoneMsg");
  clearFieldMsg("otpMsg");
  document.getElementById("nameField").style.display = isSignup ? "block" : "none";
  applyLang();
}

// ─── Validation ──────────────────────────────────────────────────────────
function validatePhone(value) {
  return /^[6-9]\d{9}$/.test(value);
}

function validateName(value) {
  return value.trim().length >= 2;
}

function setFieldMsg(id, msg, type = "hint") {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = msg;
  el.className = "field-msg " + type;
}

function clearFieldMsg(id) {
  setFieldMsg(id, "", "hint");
}

function getOTPValue() {
  return ["o1", "o2", "o3", "o4"]
    .map(id => document.getElementById(id).value.trim())
    .join("");
}

// ─── OTP Input Handling ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const digits = document.querySelectorAll(".otp-digit");

  digits.forEach((el, i) => {
    el.addEventListener("input", () => {
      el.value = el.value.replace(/\D/g, "").slice(-1);
      if (el.value && i < digits.length - 1) {
        digits[i + 1].focus();
      }
    });

    el.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !el.value && i > 0) {
        digits[i - 1].focus();
      }
    });
  });

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  applyLang();
});

// ─── Send OTP ────────────────────────────────────────────────────────────
async function sendOTP() {
  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");

  const phone = phoneInput.value.replace(/\s/g, "").trim();
  const name = nameInput.value.trim();

  clearFieldMsg("phoneMsg");
  clearFieldMsg("nameMsg");
  clearFieldMsg("otpMsg");

  if (isSignup && !validateName(name)) {
    setFieldMsg("nameMsg", t("errName"), "error");
    nameInput.focus();
    return;
  }

  if (!validatePhone(phone)) {
    setFieldMsg("phoneMsg", t("errPhone"), "error");
    phoneInput.focus();
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone, name, isSignup })
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      setFieldMsg("phoneMsg", data.error || data.message || t("toastServer"), "error");
      return;
    }

    document.getElementById("screenPhone").style.display = "none";
    document.getElementById("screenOtp").style.display = "block";
    document.getElementById("dot1").classList.remove("active");
    document.getElementById("dot2").classList.add("active");

    document.getElementById("phoneDisplay").innerText = phone;

    ["o1", "o2", "o3", "o4"].forEach(id => {
      document.getElementById(id).value = "";
    });

    document.getElementById("o1").focus();
    showToast(t("toastOtpSent"), "success");
    startResendTimer();
    applyLang();

  } catch (err) {
    console.error("Send OTP error:", err);
    setFieldMsg("phoneMsg", t("toastServer"), "error");
  }
}

// ─── Verify OTP ──────────────────────────────────────────────────────────
async function verifyOTP() {
  const phone = document.getElementById("phone").value.replace(/\s/g, "").trim();
  const name = document.getElementById("name").value.trim();
  const otp = getOTPValue();

  clearFieldMsg("otpMsg");

  if (otp.length !== 4) {
    setFieldMsg("otpMsg", t("errOtp"), "error");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone, otp })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userPhone", phone);
      localStorage.setItem("userName", name || "User");

      showToast(t("toastSuccess"), "success");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      setFieldMsg("otpMsg", data.error || data.message || t("errOtp"), "error");
    }

  } catch (err) {
    console.error("Verify OTP error:", err);
    setFieldMsg("otpMsg", t("toastServer"), "error");
  }
}

// ─── Resend OTP ──────────────────────────────────────────────────────────
function startResendTimer() {
  const link = document.getElementById("resendLink");
  let secs = 30;

  clearInterval(resendTimer);

  link.style.pointerEvents = "none";
  link.style.opacity = "0.5";
  link.innerText = `${t("resendLink")} (${secs}s)`;

  resendTimer = setInterval(() => {
    secs--;

    if (secs <= 0) {
      clearInterval(resendTimer);
      link.style.pointerEvents = "auto";
      link.style.opacity = "1";
      link.innerText = t("resendLink");
    } else {
      link.innerText = `${t("resendLink")} (${secs}s)`;
    }
  }, 1000);
}

async function resendOTP() {
  const phone = document.getElementById("phone").value.replace(/\s/g, "").trim();
  const name = document.getElementById("name").value.trim();

  clearFieldMsg("otpMsg");
  clearFieldMsg("phoneMsg");

  if (!validatePhone(phone)) {
    setFieldMsg("phoneMsg", t("errPhone"), "error");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone, name, isSignup })
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      setFieldMsg("otpMsg", data.error || data.message || t("toastServer"), "error");
      return;
    }

    ["o1", "o2", "o3", "o4"].forEach(id => {
      document.getElementById(id).value = "";
    });

    document.getElementById("o1").focus();
    showToast(t("toastResent"), "success");
    startResendTimer();

  } catch (err) {
    console.error("Resend OTP error:", err);
    setFieldMsg("otpMsg", t("toastServer"), "error");
  }
}

// ─── Toast ───────────────────────────────────────────────────────────────
function showToast(msg, type = "") {
  const el = document.getElementById("toast");
  if (!el) return;

  el.innerText = msg;
  el.className = "show " + type;

  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.className = "";
  }, 3000);
}