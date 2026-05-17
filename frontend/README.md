# Smart Home IoT Dashboard

A modern Smart Home IoT Dashboard built using:

* React.js frontend
* ESP32 firmware using PlatformIO
* MQTT realtime communication
* HiveMQ Cloud MQTT broker
* Vercel deployment

This project allows realtime monitoring and control of smart home appliances globally from anywhere using MQTT.

---

# Features

## Realtime Sensor Monitoring

The dashboard displays live sensor values from the ESP32:

* Temperature Sensor (DHT11)
* LDR Light Sensor
* PIR Motion Sensor
* MQ2 Gas Sensor

All sensor values update in realtime using MQTT.

---

## Smart Appliance Control

The dashboard supports:

### Light Control

* ON/OFF manual control
* Automatic mode using:

  * LDR sensor
  * PIR motion sensor

### Fan Control

* ON/OFF manual control
* Automatic mode using:

  * Temperature sensor
  * Gas sensor
  * PIR motion sensor

---

## Global Access

The frontend is deployed on Vercel and communicates with the ESP32 globally using HiveMQ Cloud MQTT.

Users can:

* Access dashboard from mobile
* Control appliances remotely
* Monitor sensors from anywhere
* Receive realtime updates

---

## Offline Detection

The frontend automatically detects:

* ESP32 offline state
* MQTT disconnection
* Missing sensor heartbeat

When ESP32 is offline:

* Dashboard shows offline overlay
* Controls are disabled
* Connection indicator becomes red

---

# Technologies Used

## Frontend

* React.js
* MQTT.js
* React Icons
* CSS

## Firmware

* ESP32
* Arduino Framework
* PlatformIO
* PubSubClient

## Cloud

* HiveMQ Cloud MQTT Broker
* Vercel Hosting

---

# System Architecture

```text
React Frontend (Vercel)
          │
          │ MQTT
          ▼
HiveMQ Cloud Broker
          ▲
          │ MQTT
          │
ESP32 Device
```

---

# Folder Structure

```text
iot-aws/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SensorCard.js
│   │   │   └── DeviceControl.js
│   │   │
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── SensorCard.css
│   │   │   └── DeviceControl.css
│   │   │
│   │   ├── App.js
│   │   └── index.js
│   │
│   └── package.json
│
└── esp32/
    ├── src/
    │   └── main.cpp
    │
    ├── include/
    ├── lib/
    ├── platformio.ini
    └── .pio/
```

---

# Hardware Components

## ESP32

Main microcontroller handling:

* sensor reading
* MQTT communication
* relay control
* automation logic

---

## Sensors

### DHT11

Used for temperature monitoring.

### LDR Sensor

Used to detect light intensity.

### PIR Motion Sensor

Used for motion detection.

### MQ2 Gas Sensor

Used for gas leakage detection.

---

## Relays

Used to control:

* light
* fan

---

# MQTT Topics

| Topic        | Purpose       |
| ------------ | ------------- |
| home/light   | Light control |
| home/fan     | Fan control   |
| home/sensors | Sensor data   |

---

# Installation Guide

# Frontend Setup

## Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

## Open Frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Install MQTT

```bash
npm install mqtt
```

---

## Start Frontend

```bash
npm start
```

---

# ESP32 Setup

## Open Project

Open ESP32 folder using VS Code + PlatformIO.

---

## Install Libraries

Inside `platformio.ini`

```ini
lib_deps =
    adafruit/DHT sensor library
    knolleary/PubSubClient
```

---

## Configure WiFi

Inside `main.cpp`

```cpp
const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";
```

---

## Configure MQTT

```cpp
const char* mqtt_server =
"YOUR_HIVEMQ_CLUSTER";

const char* mqtt_user =
"YOUR_USERNAME";

const char* mqtt_password =
"YOUR_PASSWORD";
```

---

## Upload Firmware

```bash
pio run --target upload
```

---

## Open Serial Monitor

```bash
pio device monitor
```

---

# HiveMQ Cloud Setup

## Create Account

Create free account at:

[https://www.hivemq.com/mqtt-cloud-broker/](https://www.hivemq.com/mqtt-cloud-broker/)

---

## Create Cluster

Choose:

* Serverless Free Cluster

---

## Create Credentials

Inside:

* Access Management
* Credentials

Create:

* username
* password

---

## Copy Cluster URL

Example:

```text
abc123.s1.eu.hivemq.cloud
```

---

# Vercel Deployment

## Push Code To GitHub

```bash
git add .

git commit -m "deploy"

git push
```

---

## Deploy On Vercel

1. Open Vercel
2. Import GitHub repository
3. Deploy

Frontend becomes publicly accessible.

---

# Automation Logic

## Light Automation

Light turns ON when:

* room is dark
* motion is detected

Light turns OFF automatically after delay.

---

## Fan Automation

Fan turns ON when:

* temperature exceeds threshold
* gas level exceeds threshold
* motion detected with high temperature

Fan turns OFF automatically after delay.

---

# Connection Heartbeat Logic

Frontend monitors ESP32 heartbeat using MQTT sensor messages.

If no sensor message is received within 5 seconds:

* ESP32 marked offline
* Offline popup shown
* Controls disabled

---

# Future Improvements

Potential upgrades:

* Dark mode
* Historical charts
* Firebase notifications
* User authentication
* Camera integration
* Voice assistant support
* AI automation
* Mobile app
* Power monitoring
* Multi-room support
* Home scheduling

---

# Screenshots

Add screenshots here:

* Dashboard UI
* Offline overlay
* Sensor cards
* Appliance control
* MQTT monitor

---

# Author

Developed by Sanjoy Khoirom.

---

# License

This project is for educational and learning purposes.
