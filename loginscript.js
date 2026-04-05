const API_BASE = "https://smart-crop-9udb.onrender.com";

// ─── State ─────────────────────────────────────────────────────────────────
let isSignup = false;
let currentLang = "en";
let resendTimer = null;

// ─── Translations ───────────────────────────────────────────────────────────
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
    errOtp: "Incorrect OTP. Please try again.",
    toastOtpSent: "OTP sent! Check your phone.",
    toastSuccess: "Login successful! Redirecting…",
    toastResent: "A new OTP has been sent.",
    toastServer: "Server error. Please try again."
  },
  hi: {
    logoSub: "AI द्वारा संचालित",
    loginTitle: "स्वागत है",
    signupTitle: "नया खाता बनाएं",
    formSub: "जारी रखने के लिए विवरण दर्ज करें",
    labelName: "पूरा नाम",
    labelPhone: "फ़ोन नंबर",
    labelOtp: "एकमुश्त पासवर्ड",
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
    errPhone: "10 अंकों का सही नंबर दर्ज करें।",
    errName: "कृपया अपना पूरा नाम दर्ज करें।",
    errOtp: "गलत ओटीपी। कृपया पुनः प्रयास करें।",
    toastOtpSent: "ओटीपी भेजा गया!",
    toastSuccess: "लॉगिन सफल! पुनर्निर्देशित हो रहे हैं…",
    toastResent: "नया ओटीपी भेजा गया।",
    toastServer: "सर्वर त्रुटि। कृपया पुनः प्रयास करें।"
  }
};

function t(key) {
  return T[currentLang][key] || key;
}

// ─── Language ───────────────────────────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  document.getElementById("enBtn").classList.toggle("active", lang === "en");
  document.getElementById("hiBtn").classList.toggle("active", lang === "hi");
  applyLang();
}

function applyLang() {
  const screenOtp = document.getElementById("screenOtp");
  const isOtpVisible = screenOtp && screenOtp.style.display !== "none";

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

  const otpPhone = document.getElementById("otpPhone");
  if (otpPhone) {
    const phone = document.getElementById("phone").value.trim();
    otpPhone.innerText = t("otpSub") + phone;
  }

  const sHint = isSignup ? t("switchHintSignup") : t("switchHintLogin");
  const sLink = isSignup ? t("switchLinkSignup") : t("switchLinkLogin");
  document.getElementById("switchHint").innerText = sHint;
  document.getElementById("switchLink").innerText = sLink;

  document.getElementById("nameField").style.display = isSignup ? "block" : "none";

  if (isOtpVisible) {
    document.getElementById("screenPhone").style.display = "none";
    document.getElementById("screenOtp").style.display = "block";
  }
}

// ─── Mode Toggle ────────────────────────────────────────────────────────────
function toggleMode() {
  isSignup = !isSignup;
  document.getElementById("nameField").style.display = isSignup ? "block" : "none";
  clearFieldMsg("nameMsg");
  clearFieldMsg("phoneMsg");
  clearFieldMsg("otpMsg");
  applyLang();
}

// ─── Validation ─────────────────────────────────────────────────────────────
function validatePhone(v) {
  return /^[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
}

function validateName(v) {
  return v.trim().length >= 2;
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
    .map(id => document.getElementById(id).value)
    .join("");
}

// ─── OTP digit navigation ──────────────────────────────────────────────────
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

  applyLang();
});

// ─── Send OTP ───────────────────────────────────────────────────────────────
async function sendOTP() {
  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");

  const phone = phoneInput.value.replace(/\s/g, "").trim();
  const name = nameInput.value.trim();

  clearFieldMsg("phoneMsg");
  clearFieldMsg("nameMsg");

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
    console.log("Send OTP response:", data);

    if (!res.ok || data.success === false) {
      alert(data.error || data.message || t("toastServer"));
      return;
    }

    document.getElementById("screenPhone").style.display = "none";
    document.getElementById("screenOtp").style.display = "block";

    const otpPhone = document.getElementById("otpPhone");
    if (otpPhone) {
      otpPhone.innerText = t("otpSub") + phone;
    }

    ["o1", "o2", "o3", "o4"].forEach(id => {
      document.getElementById(id).value = "";
    });

    document.getElementById("o1").focus();
    showToast(t("toastOtpSent"), "success");
    startResendTimer();

  } catch (err) {
    console.error("Send OTP error:", err);
    alert(t("toastServer"));
  }
}

// ─── Verify OTP ─────────────────────────────────────────────────────────────
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
    console.log("Verify OTP response:", data);

    if (res.ok && data.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userPhone", phone);
      localStorage.setItem("userName", name || "User");

      console.log("Saved isLoggedIn:", localStorage.getItem("isLoggedIn"));

      showToast(t("toastSuccess"), "success");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 800);
    } else {
      setFieldMsg("otpMsg", data.message || t("errOtp"), "error");
    }
  } catch (err) {
    console.error("Verify OTP error:", err);
    alert(t("toastServer"));
  }
}

// ─── Resend OTP ─────────────────────────────────────────────────────────────
function startResendTimer() {
  const link = document.getElementById("resendLink");
  let secs = 30;

  clearInterval(resendTimer);

  link.style.pointerEvents = "none";
  link.style.opacity = "0.45";
  link.innerText = `${t("resendLink")} (${secs}s)`;

  resendTimer = setInterval(() => {
    secs--;

    if (secs <= 0) {
      clearInterval(resendTimer);
      link.style.pointerEvents = "";
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
    console.log("Resend OTP response:", data);

    if (!res.ok || data.success === false) {
      alert(data.error || data.message || t("toastServer"));
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
    alert(t("toastServer"));
  }
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg, type = "") {
  const el = document.getElementById("toast");
  el.innerText = msg;
  el.className = "show " + type;

  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.className = "";
  }, 3000);
}