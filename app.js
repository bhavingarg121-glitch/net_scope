// =======================
// NETSCOPE INDIA
// app.js
// =======================

// CREATE MAP
const map = L.map("map").setView([22.9734, 78.6569], 5);

// MAP TILES
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

// START TEST FUNCTION
function startTest() {

    const status = document.getElementById("status");
    const network = document.getElementById("network").value;

    // STATUS UPDATE
    status.innerHTML = "📍 Detecting location...";

    // CHECK GEOLOCATION
    if (!navigator.geolocation) {

        status.innerHTML = "❌ Geolocation not supported.";
        return;

    }

    // GET USER LOCATION
    navigator.geolocation.getCurrentPosition(

        // SUCCESS
        (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            status.innerHTML = "⚡ Running network test...";

            // DEMO SPEED VALUES
            // (Later replace with real API)
            const download = Math.floor(Math.random() * 100) + 1;
            const upload = Math.floor(Math.random() * 50) + 1;
            const ping = Math.floor(Math.random() * 80) + 5;

            // DECIDE COLOR
            let color = "red";

            if (download > 60) {

                color = "green";

            } else if (download > 30) {

                color = "yellow";

            }

            // CREATE MARKER
            const marker = L.circleMarker([lat, lng], {

                radius: 12,

                fillColor: color,

                color: "#ffffff",

                weight: 2,

                opacity: 1,

                fillOpacity: 0.8

            }).addTo(map);

            // POPUP CONTENT
            marker.bindPopup(`

                <div style="font-family:Arial">

                    <h3 style="margin-bottom:8px;">
                        📡 ${network}
                    </h3>

                    <b>Download:</b> ${download} Mbps<br>

                    <b>Upload:</b> ${upload} Mbps<br>

                    <b>Ping:</b> ${ping} ms

                </div>

            `);

            // OPEN POPUP
            marker.openPopup();

            // MOVE MAP
            map.setView([lat, lng], 13);

            // STATUS
            status.innerHTML = `

                ✅ ${network} Test Complete<br>

                Download: ${download} Mbps

            `;

            // DATA OBJECT
            const result = {

                network: network,

                download: download,

                upload: upload,

                ping: ping,

                latitude: lat,

                longitude: lng,

                time: new Date().toLocaleString()

            };

            // SHOW IN CONSOLE
            console.log("Test Result:", result);

            // LATER:
            // saveToFirebase(result);

        },

        // ERROR
        (error) => {

            console.log(error);

            status.innerHTML = "❌ Location permission denied.";

        }

    );

}
