// =====================================
// NETSCOPE INDIA - AI TELECOM ENGINE v3 (PRO FIXED)
// =====================================

// ==========================
// MAP INIT
// ==========================
const map = L.map("map").setView([22.9734, 78.6569], 5);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  { attribution: "© CARTO" }
).addTo(map);

// ==========================
// STATE
// ==========================
let liveUsers = 500;
let testsToday = 2000;
let outages = 0;

let history = {
  speed: [],
  ping: [],
  users: []
};

// ==========================
// TELECOM OPERATORS
// ==========================
const operators = {
  Jio: { weight: 1.0 },
  Airtel: { weight: 0.95 },
  Vi: { weight: 0.85 },
  BSNL: { weight: 0.75 }
};

// ==========================
// TOWERS (SIMULATION GRID)
// ==========================
const towers = [
  { lat: 28.61, lng: 77.20, op: "Jio" },
  { lat: 19.07, lng: 72.87, op: "Airtel" },
  { lat: 13.08, lng: 80.27, op: "Vi" },
  { lat: 22.57, lng: 88.36, op: "BSNL" },
  { lat: 26.91, lng: 75.78, op: "Jio" }
];

// Render towers
towers.forEach(t => {
  L.circleMarker([t.lat, t.lng], {
    radius: 8,
    color: "#00ff88",
    fillOpacity: 0.7
  }).addTo(map).bindPopup(`📡 ${t.op} Tower`);
});

// ==========================
// SIGNAL MODEL (REALISTIC DISTANCE LOSS)
// ==========================
function calculateSignal(lat, lng, op) {

  let strength = 0;

  towers.forEach(t => {
    if (t.op !== op) return;

    const d = Math.hypot(lat - t.lat, lng - t.lng);
    strength += 1 / (d + 0.15);
  });

  const boost = operators[op].weight;

  return Math.min(strength * 70 * boost, 100);
}

// ==========================
// SIMPLE AI FALLBACK MODEL (WORKS ALWAYS)
// ==========================
function fallbackAI(speed, ping, signal) {

  let score =
    (speed * 0.4) +
    (signal * 0.4) -
    (ping * 0.3);

  let risk = 1 - (score / 100);

  return Math.min(Math.max(risk, 0), 1);
}

// ==========================
// OPTIONAL TF MODEL (SAFE WRAPPER)
// ==========================
let model = null;
let tfReady = false;

async function initAI() {

  try {

    model = tf.sequential();

    model.add(tf.layers.dense({
      units: 12,
      inputShape: [3],
      activation: "relu"
    }));

    model.add(tf.layers.dense({
      units: 1,
      activation: "sigmoid"
    }));

    model.compile({
      optimizer: "adam",
      loss: "binaryCrossentropy"
    });

    // warm training (safe dummy)
    const xs = tf.randomNormal([30, 3]);
    const ys = tf.randomUniform([30, 1]);

    await model.fit(xs, ys, { epochs: 2, verbose: 0 });

    tfReady = true;
    console.log("🧠 AI MODEL READY");

  } catch (e) {
    console.warn("⚠ TF failed, using fallback AI");
    tfReady = false;
  }
}

initAI();

// ==========================
// AI PREDICTION
// ==========================
function predictRisk(speed, ping, signal) {

  if (!tfReady || !model) {
    return fallbackAI(speed, ping, signal);
  }

  const input = tf.tensor2d([[speed / 100, ping / 100, signal / 100]]);
  const out = model.predict(input);

  let risk = out.dataSync()[0];

  return Math.min(Math.max(risk, 0), 1);
}

// ==========================
// UI SAFETY HELPERS
// ==========================
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}

// ==========================
// UI UPDATE
// ==========================
function updateUI() {
  setText("liveUsers", liveUsers);
  setText("testsToday", testsToday);
  setText("outages", outages);
}

// ==========================
// SIMULATION LOOP
// ==========================
setInterval(() => {
  liveUsers += Math.floor(Math.random() * 15);
  testsToday += Math.floor(Math.random() * 25);
  updateUI();
}, 3000);

// ==========================
// INCIDENT LOG
// ==========================
function incident(msg) {
  const el = document.getElementById("activityFeed");
  if (el) el.innerText = "⚠ " + msg;
}

// ==========================
// START TEST ENGINE
// ==========================
async function startTest() {

  navigator.geolocation.getCurrentPosition(async pos => {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const selectedOp =
      document.getElementById("operator")?.value || "Jio";

    // simulated metrics
    const speed = Math.random() * 100;
    const ping = Math.random() * 60;

    // signal
    const signal = calculateSignal(lat, lng, selectedOp);

    // AI risk
    const risk = predictRisk(speed, ping, signal);

    // history
    history.speed.push(speed);
    history.ping.push(ping);
    history.users.push(liveUsers);

    if (history.speed.length > 10) {
      history.speed.shift();
      history.ping.shift();
      history.users.shift();
    }

    // map marker
    L.circleMarker([lat, lng], {
      radius: 10,
      color: risk > 0.7 ? "red" : "#00ff88",
      fillOpacity: 0.9
    }).addTo(map);

    map.setView([lat, lng], 10);

    // outage logic
    if (risk > 0.7 || signal < 25) {
      outages++;

      L.circle([lat, lng], {
        radius: 50000,
        color: "red",
        fillOpacity: 0.1
      }).addTo(map);

      incident("Weak network / outage detected");
    }

    // UI updates
    updateUI();

    setText("status",
      `Speed ${speed.toFixed(1)} Mbps | Ping ${ping.toFixed(0)} ms | Signal ${signal.toFixed(1)}`
    );

    setText("ai",
      `AI Risk: ${(risk * 100).toFixed(1)}% (${tfReady ? "TF" : "Fallback"})`
    );

    console.log({
      speed: speed.toFixed(2),
      ping: ping.toFixed(2),
      signal: signal.toFixed(2),
      risk: risk.toFixed(2),
      operator: selectedOp
    });

  });

}

// ==========================
// INIT UI
// ==========================
updateUI();

console.log("🚀 NetScope AI Telecom v3 PRO Loaded");
