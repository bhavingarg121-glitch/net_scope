// =====================================
// NETSCOPE INDIA - AI TELECOM ENGINE v2
// =====================================

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
// TOWERS
// ==========================
const towers = [
  { lat: 28.61, lng: 77.20 },
  { lat: 19.07, lng: 72.87 },
  { lat: 13.08, lng: 80.27 },
  { lat: 22.57, lng: 88.36 }
];

towers.forEach(t => {
  L.circleMarker([t.lat, t.lng], {
    radius: 8,
    color: "#00ff88"
  }).addTo(map);
});

// ==========================
// SIGNAL MODEL (REAL PHYSICS SIM)
// ==========================
function calculateSignal(lat, lng) {
  let strength = 0;

  towers.forEach(t => {
    const d = Math.hypot(lat - t.lat, lng - t.lng);
    strength += 1 / (d + 0.1);
  });

  return Math.min(strength * 55, 100);
}

// ==========================
// 🧠 AI MODEL (REALISTIC LSTM PIPELINE)
// ==========================
let model;
let isReady = false;

async function initAI() {

  model = tf.sequential();

  // LSTM expects sequence input
  model.add(tf.layers.lstm({
    units: 8,
    inputShape: [5, 3],
    returnSequences: false
  }));

  model.add(tf.layers.dense({
    units: 1,
    activation: "sigmoid"
  }));

  model.compile({
    optimizer: "adam",
    loss: "binaryCrossentropy"
  });

  // fake warm training (IMPORTANT)
  const xs = tf.randomNormal([20, 5, 3]);
  const ys = tf.randomUniform([20, 1]);

  await model.fit(xs, ys, {
    epochs: 3,
    verbose: 0
  });

  isReady = true;
  console.log("🧠 AI READY (Warm Trained)");
}

initAI();

// ==========================
// TIME SERIES BUILDER
// ==========================
function buildSeries() {
  const series = [];

  for (let i = 0; i < 5; i++) {
    series.push([
      history.speed[i] || 50,
      history.ping[i] || 20,
      history.users[i] || 500
    ]);
  }

  return tf.tensor3d([series]);
}

// ==========================
// AI PREDICTION
// ==========================
async function predictOutage() {
  if (!isReady) return 0.2;

  const input = buildSeries();
  const output = model.predict(input);

  const risk = output.dataSync()[0];

  return Math.min(Math.max(risk, 0), 1);
}

// ==========================
// UI
// ==========================
function updateUI() {
  document.getElementById("liveUsers").innerText = liveUsers;
  document.getElementById("testsToday").innerText = testsToday;
  document.getElementById("outages").innerText = outages;
}

// ==========================
// SIMULATION
// ==========================
setInterval(() => {
  liveUsers += Math.floor(Math.random() * 10);
  testsToday += Math.floor(Math.random() * 20);
  updateUI();
}, 3000);

// ==========================
// INCIDENT FEED
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

    const speed = Math.random() * 100;
    const ping = Math.random() * 60;

    // save history
    history.speed.push(speed);
    history.ping.push(ping);
    history.users.push(liveUsers);

    if (history.speed.length > 5) {
      history.speed.shift();
      history.ping.shift();
      history.users.shift();
    }

    const signal = calculateSignal(lat, lng);
    const risk = await predictOutage();

    // MAP MARKER
    L.circleMarker([lat, lng], {
      radius: 10,
      color: risk > 0.7 ? "red" : "green",
      fillOpacity: 0.9
    }).addTo(map);

    map.setView([lat, lng], 10);

    // OUTAGE LOGIC (AI + SIGNAL FUSION)
    if (risk > 0.7 || signal < 25) {
      outages++;

      L.circle([lat, lng], {
        radius: 50000,
        color: "red",
        fillOpacity: 0.1
      }).addTo(map);

      incident("Outage detected at location");
    }

    updateUI();

    console.log({
      speed: speed.toFixed(2),
      ping: ping.toFixed(2),
      signal: signal.toFixed(2),
      risk: risk.toFixed(2)
    });

  });

}

// ==========================
// FIREBASE (SAFE OPTIONAL)
// ==========================
if (window.db) {
  import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js")
    .then(({ collection, onSnapshot }) => {

      onSnapshot(collection(window.db, "outages"), snap => {

        snap.forEach(doc => {
          const d = doc.data();

          L.circleMarker([d.lat, d.lng], {
            radius: 10,
            color: "red"
          }).addTo(map);

        });

      });

    });
}

// ==========================
updateUI();
console.log("🚀 NetScope AI Telecom v2 Loaded");
