const T = {
  en: {
    appTitle: "Smart Crop Advisor",
    appSub: "AI-Powered Farming Intelligence",
    heroStrip: "🌱 Enter your field details below and get personalized crop recommendations",
    formLabel: "RECOMMENDATION ENGINE",
    formTitle: "Tell us about your field",
    formDesc: "Fill in your soil conditions, local weather, and preferences to receive data-driven crop suggestions tailored to your land.",
    soilTitle: "Soil Parameters",
    weatherTitle: "Weather Conditions",
    prefTitle: "Farmer Preferences",
    lblArea: "Field Area",
    unitArea: "acres",
    lblSoilType: "Soil Type",
    lblPh: "Soil pH",
    lblN: "Nitrogen (N)",
    lblP: "Phosphorus (P)",
    lblK: "Potassium (K)",
    lblState: "State / Region",
    lblSeason: "Current Season",
    lblTemp: "Average Temperature",
    lblRainfall: "Annual Rainfall",
    lblHumidity: "Humidity",
    lblIrrigation: "Irrigation Available",
    lblBudget: "Budget per Acre",
    lblMarket: "Nearest Market",
    lblPrevCrop: "Previous Crop Grown",
    lblGoal: "Primary Goal",
    lblExp: "Farming Experience",
    btnLabel: "🌾 Get Crop Recommendations",
    btnLoading: "Analyzing your field...",
    resLabel: "RECOMMENDATION RESULTS",
    resTitle: "Best Crops For Your Field",
    resBadge: "AI Analyzed",
    matchLabel: "Match",
    topBadge: "TOP PICK",
    adv1: "Field Advisory",
    adv2: "Recommended Practices",
  },
  hi: {
    appTitle: "स्मार्ट फसल सलाहकार",
    appSub: "AI-संचालित कृषि बुद्धिमत्ता",
    heroStrip: "🌱 नीचे अपने खेत का विवरण भरें और व्यक्तिगत फसल सुझाव पाएं",
    formLabel: "सिफारिश प्रणाली",
    formTitle: "अपने खेत के बारे में बताएं",
    formDesc: "अपनी मिट्टी, मौसम और प्राथमिकताओं की जानकारी भरें और अपनी ज़मीन के लिए सटीक फसल सुझाव पाएं।",
    soilTitle: "मिट्टी के मापदंड",
    weatherTitle: "मौसम की स्थिति",
    prefTitle: "किसान की प्राथमिकताएं",
    lblArea: "खेत का क्षेत्रफल",
    unitArea: "एकड़",
    lblSoilType: "मिट्टी का प्रकार",
    lblPh: "मिट्टी का pH",
    lblN: "नाइट्रोजन (N)",
    lblP: "फास्फोरस (P)",
    lblK: "पोटेशियम (K)",
    lblState: "राज्य / क्षेत्र",
    lblSeason: "वर्तमान मौसम",
    lblTemp: "औसत तापमान",
    lblRainfall: "वार्षिक वर्षा",
    lblHumidity: "आर्द्रता",
    lblIrrigation: "सिंचाई उपलब्ध",
    lblBudget: "प्रति एकड़ बजट",
    lblMarket: "निकटतम बाज़ार",
    lblPrevCrop: "पिछली फसल",
    lblGoal: "मुख्य लक्ष्य",
    lblExp: "खेती का अनुभव",
    btnLabel: "🌾 फसल सुझाव प्राप्त करें",
    btnLoading: "आपके खेत का विश्लेषण हो रहा है...",
    resLabel: "सिफारिश परिणाम",
    resTitle: "आपके खेत के लिए सर्वश्रेष्ठ फसलें",
    resBadge: "AI विश्लेषित",
    matchLabel: "मिलान",
    topBadge: "सर्वोत्तम",
    adv1: "खेत सलाह",
    adv2: "अनुशंसित प्रथाएं",
  }
};

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');
  applyLang();
}

function applyLang() {
  const t = T[currentLang];
  document.getElementById('app-title').textContent = t.appTitle;
  document.getElementById('app-sub').textContent = t.appSub;
  document.getElementById('hero-strip').textContent = t.heroStrip;
  document.getElementById('form-label').textContent = t.formLabel;
  document.getElementById('form-title').textContent = t.formTitle;
  document.getElementById('form-desc').textContent = t.formDesc;
  document.getElementById('soil-title').textContent = t.soilTitle;
  document.getElementById('weather-title').textContent = t.weatherTitle;
  document.getElementById('pref-title').textContent = t.prefTitle;
  document.getElementById('lbl-area').textContent = t.lblArea;
  document.getElementById('unit-area').textContent = t.unitArea;
  document.getElementById('lbl-soil-type').textContent = t.lblSoilType;
  document.getElementById('lbl-ph').textContent = t.lblPh;
  document.getElementById('lbl-nitrogen').textContent = t.lblN;
  document.getElementById('lbl-phosphorus').textContent = t.lblP;
  document.getElementById('lbl-potassium').textContent = t.lblK;
  document.getElementById('lbl-state').textContent = t.lblState;
  document.getElementById('lbl-season').textContent = t.lblSeason;
  document.getElementById('lbl-temp').textContent = t.lblTemp;
  document.getElementById('lbl-rainfall').textContent = t.lblRainfall;
  document.getElementById('lbl-humidity').textContent = t.lblHumidity;
  document.getElementById('lbl-irrigation').textContent = t.lblIrrigation;
  document.getElementById('lbl-budget').textContent = t.lblBudget;
  document.getElementById('lbl-market').textContent = t.lblMarket;
  document.getElementById('lbl-prev-crop').textContent = t.lblPrevCrop;
  document.getElementById('lbl-goal').textContent = t.lblGoal;
  document.getElementById('lbl-exp').textContent = t.lblExp;
  document.getElementById('btn-label').textContent = t.btnLabel;
  document.getElementById('res-label').textContent = t.resLabel;
  document.getElementById('res-title').textContent = t.resTitle;
  document.getElementById('res-badge').textContent = t.resBadge;
  document.getElementById('adv-title1').textContent = t.adv1;
  document.getElementById('adv-title2').textContent = t.adv2;
}

// ===================== CROP DATABASE =====================
const CROPS = [
  { name: "Wheat",      nameHi: "गेहूँ",      emoji: "🌾", seasons: ["rabi"],        soils: ["alluvial","loamy","clayey"],         minPh:6, maxPh:7.5, minTemp:10, maxTemp:25, minRain:300, maxRain:800,  water:"medium", profit:"high",   tags:["Rabi","Medium Water","High Profit"] },
  { name: "Rice/Paddy", nameHi: "धान",         emoji: "🍚", seasons: ["kharif"],       soils: ["alluvial","clayey","black"],          minPh:5, maxPh:7,   minTemp:20, maxTemp:35, minRain:600, maxRain:2500, water:"high",   profit:"high",   tags:["Kharif","High Water","Staple Crop"] },
  { name: "Maize",      nameHi: "मक्का",        emoji: "🌽", seasons: ["kharif","zaid"],soils: ["loamy","alluvial","red"],             minPh:5.5,maxPh:7.5,minTemp:18, maxTemp:35, minRain:400, maxRain:1000, water:"medium", profit:"medium", tags:["Versatile","Medium Water","Animal Feed"] },
  { name: "Soybean",    nameHi: "सोयाबीन",     emoji: "🌱", seasons: ["kharif"],       soils: ["black","loamy","alluvial"],           minPh:6, maxPh:7.5, minTemp:20, maxTemp:35, minRain:600, maxRain:1100, water:"medium", profit:"high",   tags:["Kharif","Protein Rich","Export"] },
  { name: "Cotton",     nameHi: "कपास",        emoji: "🏵️", seasons: ["kharif"],       soils: ["black","alluvial","loamy"],           minPh:6, maxPh:8,   minTemp:20, maxTemp:40, minRain:600, maxRain:1200, water:"medium", profit:"high",   tags:["Kharif","Cash Crop","Export"] },
  { name: "Sugarcane",  nameHi: "गन्ना",        emoji: "🎋", seasons: ["kharif","rabi"],soils: ["alluvial","loamy","clayey"],          minPh:6, maxPh:8,   minTemp:20, maxTemp:40, minRain:1500,maxRain:2500, water:"high",   profit:"high",   tags:["Long Season","High Water","Mill Crop"] },
  { name: "Chickpea",   nameHi: "चना",          emoji: "🌰", seasons: ["rabi"],        soils: ["loamy","alluvial","sandy"],           minPh:6, maxPh:8,   minTemp:10, maxTemp:25, minRain:400, maxRain:700,  water:"low",    profit:"medium", tags:["Rabi","Low Water","Protein"] },
  { name: "Mustard",    nameHi: "सरसों",        emoji: "🌼", seasons: ["rabi"],        soils: ["alluvial","loamy","sandy"],           minPh:6, maxPh:7.5, minTemp:5,  maxTemp:25, minRain:250, maxRain:500,  water:"low",    profit:"high",   tags:["Rabi","Low Water","Oilseed"] },
  { name: "Tomato",     nameHi: "टमाटर",        emoji: "🍅", seasons: ["rabi","zaid"], soils: ["loamy","alluvial","red"],             minPh:5.5,maxPh:7,  minTemp:15, maxTemp:35, minRain:400, maxRain:800,  water:"medium", profit:"high",   tags:["Vegetable","High Value","Market"] },
  { name: "Onion",      nameHi: "प्याज़",       emoji: "🧅", seasons: ["rabi","kharif"],soils: ["loamy","alluvial","sandy"],          minPh:6, maxPh:7,   minTemp:13, maxTemp:35, minRain:500, maxRain:900,  water:"medium", profit:"high",   tags:["Vegetable","Cash Crop","Export"] },
  { name: "Groundnut",  nameHi: "मूंगफली",      emoji: "🥜", seasons: ["kharif","zaid"],soils: ["sandy","loamy","red"],               minPh:6, maxPh:7,   minTemp:22, maxTemp:35, minRain:500, maxRain:1000, water:"medium", profit:"high",   tags:["Kharif","Oilseed","Protein"] },
  { name: "Green Gram", nameHi: "मूंग",         emoji: "🟢", seasons: ["kharif","zaid"],soils: ["loamy","alluvial","sandy"],           minPh:6, maxPh:7.5, minTemp:25, maxTemp:35, minRain:600, maxRain:1000, water:"medium", profit:"medium", tags:["Pulse","Soil Health","Protein"] },
  { name: "Turmeric",   nameHi: "हल्दी",        emoji: "🌿", seasons: ["kharif"],       soils: ["loamy","alluvial","red"],             minPh:5, maxPh:7.5, minTemp:20, maxTemp:35, minRain:1000,maxRain:2000, water:"high",   profit:"high",   tags:["Spice","High Value","Export"] },
  { name: "Potato",     nameHi: "आलू",          emoji: "🥔", seasons: ["rabi"],        soils: ["loamy","alluvial","sandy"],           minPh:5, maxPh:7,   minTemp:10, maxTemp:25, minRain:400, maxRain:800,  water:"medium", profit:"high",   tags:["Rabi","Vegetable","Staple"] },
  { name: "Sunflower",  nameHi: "सूरजमुखी",    emoji: "🌻", seasons: ["kharif","zaid"],soils: ["alluvial","loamy","black"],           minPh:6, maxPh:7.5, minTemp:18, maxTemp:35, minRain:500, maxRain:900,  water:"medium", profit:"medium", tags:["Oilseed","Versatile","Medium Water"] },
];

function scoreCrop(crop, inputs) {
  let score = 0; let total = 0;
  const season = inputs.season; const soilType = inputs.soilType; const ph = inputs.ph;
  const temp = inputs.temp; const rain = inputs.rain; const n = inputs.n;

  // Season match
  total += 25;
  if (!season || crop.seasons.includes(season)) score += 25;
  else score += 5;

  // Soil type
  total += 20;
  if (!soilType || crop.soils.includes(soilType)) score += 20;
  else score += 4;

  // pH
  total += 15;
  if (!ph) { score += 10; }
  else if (ph >= crop.minPh && ph <= crop.maxPh) score += 15;
  else { const diff = Math.min(Math.abs(ph - crop.minPh), Math.abs(ph - crop.maxPh)); score += Math.max(0, 15 - diff * 5); }

  // Temp
  total += 15;
  if (!temp) { score += 10; }
  else if (temp >= crop.minTemp && temp <= crop.maxTemp) score += 15;
  else { const diff = Math.min(Math.abs(temp - crop.minTemp), Math.abs(temp - crop.maxTemp)); score += Math.max(0, 15 - diff * 1.5); }

  // Rain
  total += 15;
  if (!rain) { score += 10; }
  else if (rain >= crop.minRain && rain <= crop.maxRain) score += 15;
  else { const diff = Math.min(Math.abs(rain - crop.minRain), Math.abs(rain - crop.maxRain)); score += Math.max(0, 15 - diff * 0.02); }

  // N content
  total += 10;
  if (!n) { score += 7; }
  else if (n >= 80 && n <= 200) score += 10;
  else score += 5;

  return Math.round((score / total) * 100);
}

function getAdvisory(inputs, topCrop, lang) {
  const ph = inputs.ph || 6.5;
  const n = inputs.n || 100;
  const season = inputs.season;
  const soilType = inputs.soilType;
  const area = inputs.area || 1;

  if (lang === 'hi') {
    const text = `आपके खेत के मापदंडों के विश्लेषण से पता चला है कि मिट्टी का pH ${ph} है जो ${ph < 6 ? 'थोड़ा अम्लीय है — चूना डालने की सलाह है।' : ph > 7.5 ? 'थोड़ा क्षारीय है — गंधक का प्रयोग करें।' : 'उपयुक्त श्रेणी में है।'} नाइट्रोजन स्तर ${n >= 80 ? 'संतोषजनक' : 'कम — यूरिया या जैविक खाद बढ़ाएं'} है। ${area} एकड़ क्षेत्र के लिए ${topCrop.nameHi} सबसे उपयुक्त विकल्प है।`;
    const tips = [
      'फसल बुवाई से पहले मिट्टी परीक्षण कराएं',
      'बीज उपचार करने के बाद ही बोएं',
      'सिंचाई का सही समय और मात्रा बनाए रखें',
      'फसल चक्र अपनाएं — दलहन के बाद अनाज',
      'जैविक खाद का उपयोग बढ़ाएं',
      'स्थानीय कृषि विभाग से समय-समय पर सलाह लें',
    ];
    return { text, tips };
  } else {
    const text = `Analysis of your field shows a soil pH of ${ph}, which is ${ph < 6 ? 'slightly acidic — consider lime application to raise pH.' : ph > 7.5 ? 'slightly alkaline — sulfur amendments may help.' : 'in an ideal range for most crops.'} Nitrogen levels are ${n >= 80 ? 'adequate' : 'low — consider urea or organic manure addition'}. For your ${area}-acre field, ${topCrop.name} is the strongest match this ${season || 'season'}.`;
    const tips = [
      'Conduct a soil test before every planting season',
      'Treat seeds with fungicide before sowing',
      'Maintain irrigation schedules to avoid water stress',
      'Practice crop rotation — legumes before cereals',
      'Increase organic matter with compost or FYM',
      'Consult your local Krishi Vigyan Kendra for guidance',
    ];
    return { text, tips };
  }
}

// ===================== MAIN FUNCTION =====================
async function analyzeAndRecommend() {
  const btn = document.getElementById('submit-btn');
  const btnLabel = document.getElementById('btn-label');

  btn.classList.add('loading');
  btnLabel.textContent = T[currentLang].btnLoading;

  const inputs = {
    area: parseFloat(document.getElementById('field-area').value) || null,
    soilType: document.getElementById('soil-type').value,
    ph: parseFloat(document.getElementById('soil-ph').value) || null,
    n: parseFloat(document.getElementById('nitrogen').value) || null,
    p: parseFloat(document.getElementById('phosphorus').value) || null,
    k: parseFloat(document.getElementById('potassium').value) || null,
    state: document.getElementById('state').value,
    season: document.getElementById('season').value,
    temp: parseFloat(document.getElementById('temperature').value) || null,
    rain: parseFloat(document.getElementById('rainfall').value) || null,
    humidity: parseFloat(document.getElementById('humidity').value) || null,
    irrigation: document.getElementById('irrigation').value,
    budget: parseFloat(document.getElementById('budget').value) || null,
    market: document.getElementById('market').value,
    prevCrop: document.getElementById('prev-crop').value,
    goal: document.getElementById('goal').value,
    exp: document.getElementById('experience').value,
  };

  try {
    const response = await fetch("http://smart-crop-9udb.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    });

    const data = await response.json();
    console.log("Backend Response:", data);

    if (!response.ok) {
      throw new Error(data.error || "Backend request failed");
    }

    const scored = CROPS.map(c => ({ ...c, score: scoreCrop(c, inputs) }));
    scored.sort((a, b) => b.score - a.score);
    const top6 = scored.slice(0, 6);

    const grid = document.getElementById('crops-grid');
    grid.innerHTML = '';
    const lang = currentLang;
    const t = T[lang];

    top6.forEach((crop, i) => {
      const isTop = i === 0;
      const card = document.createElement('div');
      card.className = 'crop-card' + (isTop ? ' top-pick' : '');

      const tagHtml = crop.tags.map(tag => {
        const cls = tag.toLowerCase().includes('water')
          ? 'tag-water'
          : tag.toLowerCase().includes('profit')
          ? 'tag-profit'
          : 'tag-season';
        return `<span class="tag ${cls}">${tag}</span>`;
      }).join('');

      card.innerHTML = `
        <div class="crop-top">
          ${isTop ? `<span class="top-badge">${t.topBadge}</span>` : ''}
          <span class="crop-emoji">${crop.emoji}</span>
          <div class="crop-name">${currentLang === "hi" ? crop.nameHi : crop.name}</div>
          <div class="crop-name-hi">${currentLang === "hi" ? crop.name : crop.nameHi}</div>
        </div>
        <div class="crop-body">
          <div class="match-bar-wrap">
            <span class="match-label">${t.matchLabel}</span>
            <div class="match-bar">
              <div class="match-fill" style="width:${crop.score}%"></div>
            </div>
            <span class="match-pct">${crop.score}%</span>
          </div>
          <div class="crop-tags">${tagHtml}</div>
        </div>
      `;
      grid.appendChild(card);
    });

    const advisory = getAdvisory(inputs, top6[0], lang);
    document.getElementById('adv-text1').textContent = advisory.text;
    document.getElementById('adv-list2').innerHTML =
      advisory.tips.map(tip => `<li>${tip}</li>`).join('');

    const rs = document.getElementById('result-section');
    rs.style.display = 'block';
    rs.scrollIntoView({ behavior: 'smooth' });

  } catch (err) {
    console.error("Analyze Error:", err);
    alert("Server error: " + err.message);
  } finally {
    btn.classList.remove('loading');
    btnLabel.textContent = T[currentLang].btnLabel;
  }
}
 
window.onload = function () {
  applyLang();

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      console.log("Logout clicked"); // debug

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("userName");

      window.location.href = "login.html";
    });
  }
};
window.onload = function () {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      console.log("Logout clicked");

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("userName");

      window.location.href = "login.html";
    });
  }
};