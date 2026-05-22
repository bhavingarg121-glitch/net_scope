// ==========================
// NETSCOPE INDIA PRO
// app.js
// ==========================

// ==========================
// MAP
// ==========================

const map = L.map("map").setView([22.9734, 78.6569], 5);

// DARK MAP TILE
L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
        attribution: "© OpenStreetMap © CARTO"
    }
).addTo(map);

// ==========================
// COVERAGE LAYERS
// ==========================

const jioLayer = L.layerGroup();
const airtelLayer = L.layerGroup();
const viLayer = L.layerGroup();
const bsnlLayer = L.layerGroup();

// JIO COVERAGE
L.circle([28.61,77.20],{

    radius:50000,

    color:"#00c6ff",

    fillOpacity:0.2

}).addTo(jioLayer);

// AIRTEL COVERAGE
L.circle([19.07,72.87],{

    radius:45000,

    color:"#ff4d4d",

    fillOpacity:0.2

}).addTo(airtelLayer);

// VI COVERAGE
L.circle([13.08,80.27],{

    radius:40000,

    color:"#b84dff",

    fillOpacity:0.2

}).addTo(viLayer);

// BSNL COVERAGE
L.circle([22.57,88.36],{

    radius:35000,

    color:"#00ff88",

    fillOpacity:0.2

}).addTo(bsnlLayer);

// LAYER CONTROL
L.control.layers({

    "Jio Coverage":jioLayer,

    "Airtel Coverage":airtelLayer,

    "Vi Coverage":viLayer,

    "BSNL Coverage":bsnlLayer

}).addTo(map);

// DEFAULT LAYER
jioLayer.addTo(map);

// ==========================
// TELECOM TOWERS
// ==========================

const towers = [

    {
        lat:28.61,
        lng:77.20,
        provider:"Jio"
    },

    {
        lat:19.07,
        lng:72.87,
        provider:"Airtel"
    },

    {
        lat:13.08,
        lng:80.27,
        provider:"Vi"
    },

    {
        lat:22.57,
        lng:88.36,
        provider:"BSNL"
    }

];

// ADD TOWERS
towers.forEach((tower)=>{

    L.circleMarker(

        [tower.lat,tower.lng],

        {

            radius:10,

            fillColor:"#00ff88",

            color:"#ffffff",

            weight:2,

            fillOpacity:0.9

        }

    )

    .addTo(map)

    .bindPopup(`

        <b>📡 ${tower.provider} Tower</b>

    `);

});

// ==========================
// ISP DATA
// ==========================

const ispData = {

    Jio:{
        speed:82,
        ping:14
    },

    Airtel:{
        speed:74,
        ping:18
    },

    Vi:{
        speed:45,
        ping:28
    },

    BSNL:{
        speed:28,
        ping:50
    }

};

// ==========================
// STATS
// ==========================

let totalTests = 0;

let totalSpeed = 0;

let totalPing = 0;

// ==========================
// CHART
// ==========================

const labels = [];

const speedData = [];

const chart = new Chart(

    document.getElementById("speedChart"),

    {

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Download Speed",

                data:speedData,

                borderWidth:3,

                tension:0.4

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    labels:{
                        color:"white"
                    }

                }

            },

            scales:{

                x:{

                    ticks:{
                        color:"white"
                    }

                },

                y:{

                    ticks:{
                        color:"white"
                    }

                }

            }

        }

    }

);

// ==========================
// QUALITY SCORE
// ==========================

function calculateQuality(speed,ping){

    let score = 0;

    score += speed * 0.7;

    score += (100 - ping) * 0.3;

    return Math.round(score);

}

// ==========================
// START TEST
// ==========================

function startTest(){

    const status =
    document.getElementById("status");

    const network =
    document.getElementById("network").value;

    status.innerHTML =
    "📍 Detecting location...";

    // GEOLOCATION
    navigator.geolocation.getCurrentPosition(

        // SUCCESS
        (position)=>{

            const lat =
            position.coords.latitude;

            const lng =
            position.coords.longitude;

            status.innerHTML =
            "⚡ Running network test...";

            // NETWORK INFO API
            const connection =

                navigator.connection ||

                navigator.mozConnection ||

                navigator.webkitConnection;

            let download;

            if(connection){

                download =
                connection.downlink || 10;

            }else{

                download =
                Math.floor(Math.random()*100)+1;

            }

            // DEMO VALUES
            const upload =
            Math.floor(Math.random()*50)+1;

            const ping =
            Math.floor(Math.random()*60)+5;

            // QUALITY
            const quality =
            calculateQuality(download,ping);

            // QUALITY COLOR
            let color = "#ff4d4d";

            if(quality > 80){

                color = "#00ff88";

            }
            else if(quality > 50){

                color = "#ffd000";

            }

            // USER MARKER
            const marker =
            L.circleMarker(

                [lat,lng],

                {

                    radius:12,

                    fillColor:color,

                    color:"#ffffff",

                    weight:2,

                    fillOpacity:0.9

                }

            ).addTo(map);

            // POPUP
            marker.bindPopup(`

                <div style="font-family:Arial">

                    <h3>
                        📡 ${network}
                    </h3>

                    <b>Download:</b>
                    ${download} Mbps
                    <br>

                    <b>Upload:</b>
                    ${upload} Mbps
                    <br>

                    <b>Ping:</b>
                    ${ping} ms
                    <br>

                    <b>Quality:</b>
                    ${quality}/100

                </div>

            `);

            marker.openPopup();

            // MAP MOVE
            map.setView([lat,lng],13);

            // STATUS
            status.innerHTML = `

                ✅ ${network} Connected
                <br>

                ⚡ Download:
                ${download} Mbps
                <br>

                📡 Ping:
                ${ping} ms
                <br>

                ⭐ Quality:
                ${quality}/100

            `;

            // UPDATE STATS
            totalTests++;

            totalSpeed += download;

            totalPing += ping;

            document.getElementById("tests")
            .innerText = totalTests;

            document.getElementById("avgSpeed")
            .innerText =
            Math.round(totalSpeed/totalTests)
            + " Mbps";

            document.getElementById("avgPing")
            .innerText =
            Math.round(totalPing/totalTests)
            + " ms";

            // UPDATE CHART
            labels.push(
                "Test "+totalTests
            );

            speedData.push(download);

            chart.update();

            // CONNECTION LINE
            L.polyline(

                [
                    [22.9734,78.6569],
                    [lat,lng]
                ],

                {

                    color:"#00c6ff",

                    weight:3

                }

            ).addTo(map);

            // RESULT OBJECT
            const result = {

                network,

                download,

                upload,

                ping,

                quality,

                latitude:lat,

                longitude:lng,

                time:new Date()
                .toLocaleString()

            };

            console.log(
                "Test Result:",
                result
            );

            // ==========================
            // BACKEND API
            // ==========================

            fetch(
                "http://localhost:3000/save-test",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(result)

                }

            )

            .then(res=>res.json())

            .then(data=>{

                console.log(
                    "Saved:",
                    data
                );

            })

            .catch(err=>{

                console.log(err);

            });

        },

        // ERROR
        ()=>{

            status.innerHTML =
            "❌ Location permission denied.";

        }

    );

}

// ==========================
// ISP COMPARE
// ==========================

function compareISP(){

    const a =
    document.getElementById("compare1").value;

    const b =
    document.getElementById("compare2").value;

    const result = `

        ⚡ <b>${a}</b>
        :
        ${ispData[a].speed} Mbps
        <br>

        📡 Ping:
        ${ispData[a].ping} ms

        <hr style="margin:10px 0">

        ⚡ <b>${b}</b>
        :
        ${ispData[b].speed} Mbps
        <br>

        📡 Ping:
        ${ispData[b].ping} ms

    `;

    document.getElementById(
        "compareResult"
    ).innerHTML = result;

}
