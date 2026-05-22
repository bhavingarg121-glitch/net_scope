// =====================================
// NETSCOPE INDIA - AI TELECOM ENGINE
// app.js (FINAL CLEAN VERSION)
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
// GLOBAL STATE
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
    { lat: 28.61, lng: 77.20, provider: "Jio" },
    { lat: 19.07, lng: 72.87, provider: "Airtel" },
    { lat: 13.08, lng: 80.27, provider: "Vi" },
    { lat: 22.57, lng: 88.36, provider: "BSNL" },
];

// ==========================
// TOWER LAYER
// ==========================
const towerLayer = L.layerGroup().addTo(map);

towers.forEach(t => {
    L.circleMarker([t.lat, t.lng], {
        radius: 8,
        color: "#00ff88"
    }).bindPopup(`📡 ${t.provider} Tower`).addTo(towerLayer);
});

// ==========================
// SATELLITE LAYER
// ==========================
function addSatelliteLayer(){
    for(let i=0;i<6;i++){
        const lat = 20 + Math.random()*10;
        const lng = 70 + Math.random()*20;

        L.circle([lat,lng],{
            radius:200000,
            color:"#00c6ff",
            fillOpacity:0.05,
            weight:1
        }).addTo(map);
    }
}
addSatelliteLayer();

// ==========================
// RF SIGNAL MODEL
// ==========================
function calculateSignal(lat, lng){

    let strength = 0;

    towers.forEach(t => {
        const d = Math.sqrt(
            Math.pow(lat - t.lat, 2) +
            Math.pow(lng - t.lng, 2)
        );

        strength += 1 / (d + 0.1);
    });

    return Math.min(strength * 60, 100);
}

// ==========================
// TENSORFLOW LSTM MODEL
// ==========================
let model;

async function initAI(){

    model = tf.sequential();

    model.add(tf.layers.lstm({
        units: 16,
        returnSequences:false,
        inputShape:[10,3]
    }));

    model.add(tf.layers.dense({
        units: 1,
        activation: "sigmoid"
    }));

    model.compile({
        optimizer: "adam",
        loss: "binaryCrossentropy"
    });

    console.log("🧠 LSTM AI READY");
}

initAI();

// ==========================
// TIME SERIES BUILDER
// ==========================
function buildSeries(){

    let series = [];

    for(let i=0;i<10;i++){
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
async function predictOutage(){

    if(!model) return 0;

    const input = buildSeries();

    const out = model.predict(input);

    return out.dataSync()[0];
}

// ==========================
// CONTROL CENTER UI UPDATE
// ==========================
function updateControlCenter(speed, ping, risk){

    document.getElementById("avgSpeed").innerText = Math.round(speed);
    document.getElementById("avgPing").innerText = Math.round(ping);

    const level =
        risk > 0.7 ? "HIGH 🔴" :
        risk > 0.4 ? "MEDIUM 🟠" :
        "LOW 🟢";

    document.getElementById("riskLevel")?.innerText = level;
}

// ==========================
// UI UPDATE
// ==========================
function updateUI(){
    document.getElementById("liveUsers").innerText = liveUsers;
    document.getElementById("testsToday").innerText = testsToday;
    document.getElementById("outages").innerText = outages;
}

// ==========================
// LIVE SIMULATION
// ==========================
setInterval(() => {

    liveUsers += Math.floor(Math.random()*15);
    testsToday += Math.floor(Math.random()*25);

    updateUI();

}, 3000);

// ==========================
// INCIDENT FEED
// ==========================
function addIncident(msg){
    const feed = document.getElementById("activityFeed");
    if(feed) feed.innerText = "⚠ " + msg;
}

// ==========================
// START TEST (MAIN ENGINE)
// ==========================
async function startTest(){

    navigator.geolocation.getCurrentPosition(async pos => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // fake but realistic telecom values
        const speed = Math.random()*100;
        const ping = Math.random()*60;

        // store history
        history.speed.push(speed);
        history.ping.push(ping);
        history.users.push(liveUsers);

        if(history.speed.length > 10){
            history.speed.shift();
            history.ping.shift();
            history.users.shift();
        }

        // RF signal
        const signal = calculateSignal(lat, lng);

        // AI prediction
        const risk = await predictOutage();

        // marker
        L.circleMarker([lat,lng],{
            radius:10,
            color: risk > 0.7 ? "red" : "green",
            fillOpacity:0.8
        }).addTo(map);

        map.setView([lat,lng],10);

        // OUTAGE SIMULATION
        if(risk > 0.7 || signal < 20){
            outages++;

            L.circle([lat,lng],{
                radius:50000,
                color:"red",
                fillOpacity:0.1
            }).addTo(map);

            addIncident("Outage detected at user location");
        }

        updateUI();
        updateControlCenter(speed, ping, risk);

        console.log({
            speed,
            ping,
            signal,
            risk
        });

    });

}

// ==========================
// FIREBASE OUTAGE LISTENER (SAFE)
// ==========================
if(window.db){

    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js")
    .then(({collection,onSnapshot})=>{

        onSnapshot(collection(window.db,"outages"),snap=>{

            snap.forEach(doc=>{

                const d = doc.data();

                L.circleMarker([d.lat,d.lng],{
                    radius:10,
                    color:"red"
                }).addTo(map);

            });

        });

    });

}

// ==========================
// INITIAL UI
// ==========================
updateUI();

console.log("🚀 NetScope AI Telecom System Loaded");
