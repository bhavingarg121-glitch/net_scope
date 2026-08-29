# NetScope India - Android Telecom & Network Intelligence Platform

<div align="center">

![Android](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Kotlin](https://img.shields.io/badge/Language-Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)
![Build](https://img.shields.io/badge/Gradle-8.9-02303A?style=for-the-badge&logo=gradle&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

**Next-Generation Network Telemetry, Live GPS Radar, 5G Spot Finder & Carrier Intelligence for India**

[Official Web Portal](https://net-scopeindia.vercel.app/) &bull; [TRAI QoS Benchmarks](https://net-scopeindia.vercel.app/) &bull; [Download Latest APK](../../releases)

</div>

---

## 📱 Features

- **Live GPS Telemetry & Radar**: Real-time high-accuracy location tracking, speed calculation ($\text{km/h}$), dynamic bearing, MSL altitude, and breadcrumb movement trail.
- **Hardware-Assisted Dynamic Compass**: Real-time hardware magnetometer & orientation sensor fusion ($0^\circ - 360^\circ$) with instant cardinal heading readouts.
- **Pan-India Carrier Intelligence**: Full coverage across **all 36 Indian States and Union Territories** with localized carrier QoS comparisons (Jio, Airtel, Vi, BSNL) and peak performance zones.
- **Nearby #1 Best 5G Spot Finder**: Proximity + bandwidth vector scoring across Indian 5G bands (n78 C-band vs n28 Sub-GHz) with live compass walking guidance.
- **Multi-Stage Speedometer Engine**: Real multi-pass chunked speed test measuring download, upload, ping, jitter, and packet loss.
- **AI Network Diagnostic Assistant**: Hardware telemetry-correlated assistant with multi-prompt diagnostic capability and step-by-step connection recovery.
- **Enterprise Diagnostic PDF Certificate**: Formatted telecom audit certificate ready for export and print.
- **100% Emoji-Free Clean UI**: Enterprise typography with FontAwesome vector icons and dark/light mode.

---

## 🏗️ Project Architecture

```
NetScopeApp/
├── app/
│   ├── src/main/
│   │   ├── java/com/example/netscope/
│   │   │   └── MainActivity.kt            # Android Native Activity, Sensors & Bridge
│   │   ├── assets/netscope/               # Offline-First Embedded Web Engine
│   │   │   ├── index.html                 # 19-Tab Unified Interface
│   │   │   ├── index.css                  # Enterprise Design System
│   │   │   └── js/
│   │   │       ├── app.js                 # App Controller & Navigation
│   │   │       ├── modules/               # Geolocation, 5G, Compass, AI Modules
│   │   │       └── components/            # Speedometer & Diagnostic Engines
│   │   ├── res/                           # Android App Icons, Themes & Manifest
│   │   └── AndroidManifest.xml            # Hardware & Network Permissions
│   └── build.gradle.kts                   # Module Dependencies & SDK Config
├── gradle/                                # Gradle Wrapper
├── gradlew & gradlew.bat                  # Gradle CLI Scripts
├── .github/workflows/build-apk.yml        # Automated Cloud CI/CD APK Builder
└── README.md
```

---

## 🚀 Building & Running

### Prerequisites
- **Android Studio** (Koala / Ladybug or newer)
- **JDK 17** (or Android Studio Embedded JBR)
- Android Device or Emulator running Android 7.0+ (API 24+)

### Build via Command Line
```powershell
# In PowerShell / Command Prompt:
.\gradlew.bat assembleDebug
```
The compiled APK will be generated at:
```
app/build/outputs/apk/debug/app-debug.apk
```

### Open in Android Studio
1. Launch Android Studio $\to$ Click **Open**.
2. Select the `NetScopeApp` folder.
3. Click the green **Run (▶)** button to install on your connected device or emulator.

---

## 🌐 Official Web Portal
A companion cloud web portal is live at:
[https://net-scopeindia.vercel.app/](https://net-scopeindia.vercel.app/)

---

## 📄 License
This project is proprietary and maintained for NetScope India Telecom Analytics.
