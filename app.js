// ==========================
// NETSCOPE INDIA ULTRA PRO v3
// AI + FIREBASE + REALTIME ENGINE
// ==========================
import { collection, onSnapshot } from "firebase/firestore";

onSnapshot(collection(window.db, "outages"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {

        if (change.type === "added") {
            const data = change.doc.data();

            showOutageAlert(data);
            updateOutageUI(data);
        }

    });
});
// ==========================
// MAP INIT
// ==========================
const map = L.map("map").setView([22.9734, 78.6569], 5);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    { attribution: "© OpenStreetMap © CARTO" }
).addTo(map);

// ==========================
// FIREBASE OUTAGE LAYER
// ==========================
const outageLayer = L.layerGroup().addTo(map);

// ==========================
// COVERAGE LAYERS
// ==========================
const jioLayer = L.layerGroup();
const airtelLayer = L.layerGroup();
const viLayer = L.layerGroup();
const bsnlLayer = L.layerGroup();

// ==========================
// TOWERS
// ==========================
const towers = [
    { lat: 28.61, lng: 77.20, provider: "Jio" },
    { lat: 19.07, lng: 72.87, provider: "Airtel" },
    { lat: 13.08, lng: 80.27, provider: "Vi" },
    { lat: 22.57, lng: 88.36, provider: "BSNL" },
    { lat: 26.91, lng: 75.78, provider: "Jio" },
    { lat: 23.02, lng: 72.57, provider: "Airtel" },
];

// ==========================
// TOWER ICON
// ==========================
const towerIcon = L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:50%;
    background:#00ff88;box-shadow:0 0 15px #00ff88;"></div>`
});

// ==========================
// ADD TOWERS
// ==========================
towers.forEach(t => {
    L.marker([t.lat, t.lng], { icon: towerIcon })
        .bindPopup(`📡 ${t.provider} Tower`)
        .addTo(map);
});

// ==========================
// HEATMAP (India telecom density)
// ==========================
const heatLayer = L.heatLayer([
    [28.61, 77.20, 0.9],
    [19.07, 72.87, 0.8],
    [13.08, 80.27, 0.7],
    [22.57, 88.36, 0.6],
    [26.91, 75.78, 0.5]
], { radius: 35 }).addTo(map);

// ==========================
// LIVE METRICS
// ==========================
let liveUsers = 500;
let testsToday = 2000;
let outages = 0;

// ==========================
// AI MODEL (TensorFlow.js)
// ==========================
let model;

async function initAI() {
    model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [3],
        units: 8,
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

    console.log("🤖 AI Engine Ready");
}

initAI();

// ==========================
// AI PREDICTION
// ==========================
function predictOutage(speed, ping, users) {
    if (!model) return 0;

    const input = tf.tensor2d([[speed / 100, ping / 100, users / 1000]]);
    const output = model.predict(input);

    return output.dataSync()[0];
}

// ==========================
// UI UPDATE
// ==========================
function updateUI() {
    document.getElementById("liveUsers").innerText = liveUsers;
    document.getElementById("testsToday").innerText = testsToday;
    document.getElementById("outages").innerText = outages;
}

updateUI();

// ==========================
// LIVE SIMULATION
// ==========================
setInterval(() => {
    liveUsers += Math.floor(Math.random() * 20);
    testsToday += Math.floor(Math.random() * 30);
    updateUI();
}, 3000);

// ==========================
// REAL NETWORK TEST
// ==========================
function calculateQuality(speed, ping) {
    return Math.round(speed * 0.7 + (100 - ping) * 0.3);
}

// ==========================
// START TEST
// ==========================
function startTest() {

    const network = document.getElementById("network").value;

    navigator.geolocation.getCurrentPosition(pos => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const speed = Math.floor(Math.random() * 100);
        const ping = Math.floor(Math.random() * 60);
        const quality = calculateQuality(speed, ping);

        const risk = predictOutage(speed, ping, liveUsers);

        // AI OUTPUT
        document.getElementById("aiInsight").innerText =
            risk > 0.7 ? "🔴 HIGH OUTAGE RISK" :
            risk > 0.4 ? "🟠 MODERATE RISK" :
            "🟢 NETWORK STABLE";

        // USER MARKER
        L.circleMarker([lat, lng], {
            radius: 10,
            color: risk > 0.7 ? "red" : "green",
            fillOpacity: 0.8
        }).addTo(map);

        map.setView([lat, lng], 10);

        // OUTAGE SIMULATION
        if (risk > 0.7) {
            outages++;

            const alert = L.circleMarker([lat, lng], {
                radius: 25,
                color: "red",
                fillOpacity: 0.2
            }).addTo(outageLayer);

            setTimeout(() => map.removeLayer(alert), 5000);
        }

        updateUI();

    });

}

// ==========================
// FIREBASE REALTIME OUTAGE LISTENER
// ==========================
function listenOutages() {

    if (!window.db) return;

    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js")
        .then(({ collection, onSnapshot }) => {

            onSnapshot(collection(window.db, "outages"), (snap) => {

                snap.forEach(doc => {

                    const data = doc.data();

                    L.circleMarker([data.lat, data.lng], {
                        radius: 12,
                        color: "red"
                    }).addTo(outageLayer);

                });

            });

        });

}

listenOutages();

// ==========================
// LIVE USER MOVEMENT
// ==========================
setInterval(() => {

    const lat = 20 + Math.random() * 10;
    const lng = 72 + Math.random() * 15;

    const dot = L.circleMarker([lat, lng], {
        radius: 4,
        color: "#00ff88"
    }).addTo(map);

    setTimeout(() => map.removeLayer(dot), 4000);

}, 1500);

// ==========================
// STATE HEAT SIMULATION (TRUE TELECOM MAP)
// ==========================
const stateHeat = L.heatLayer([
    [28.6, 77.2, 1],
    [19.0, 72.8, 0.9],
    [13.0, 80.2, 0.8],
    [22.5, 88.3, 0.6],
    [26.9, 75.7, 0.7]
], { radius: 40 }).addTo(map);

// ==========================
// END ENGINE
// ==========================
console.log("🚀 NetScope AI Ultra v3 Loaded");
