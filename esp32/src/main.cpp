#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

// =====================================================
//                    WIFI SETTINGS
// =====================================================

// const char* ssid = "DEEPOOPC";
// const char* password = "deepoo@123";

const char* ssid = "SANJOY0974";
const char* password = "9862622104";

WebServer server(80);

// =====================================================
//                     PIN SETUP
// =====================================================

#define LIGHT_RELAY_PIN   22
#define FAN_RELAY_PIN     23

#define PIR_PIN           18

#define LDR_PIN           34
#define MQ2_PIN           35

#define DHT_PIN           4
#define DHT_TYPE          DHT11

// =====================================================
//                    DHT SENSOR
// =====================================================

DHT dht(DHT_PIN, DHT_TYPE);

// =====================================================
//                  THRESHOLDS
// =====================================================

#define DARK_THRESHOLD    2200
#define LIGHT_THRESHOLD   1800

#define TEMP_THRESHOLD    29
#define GAS_THRESHOLD     2500

// =====================================================
//                     TIMER
// =====================================================

const unsigned long fanDelay = 10000;

unsigned long lastFanMotionTime = 0;

const unsigned long lightDelay = 10000;

unsigned long lastLightMotionTime = 0;

// =====================================================
//                     STATES
// =====================================================

bool darkState = false;

bool lightState = false;
bool fanState = false;

bool gasDetected = false;

// =====================================================
//               MANUAL CONTROL STATES
// =====================================================

bool manualLight = false;
bool manualFan = false;

// =====================================================
//                  STABLE LDR READ
// =====================================================

int readLDR() {

    long total = 0;

    for (int i = 0; i < 10; i++) {

        total += analogRead(LDR_PIN);

        delay(2);
    }

    return total / 10;
}

// =====================================================
//                  JSON SENSOR DATA
// =====================================================

String getSensorData() {

    float temperature =
        dht.readTemperature();

    int ldrValue =
        readLDR();

    int gasValue =
        analogRead(MQ2_PIN);

    int motion =
        digitalRead(PIR_PIN);

    String json = "{";

    json += "\"temperature\":";
    json += String(temperature);
    json += ",";

    json += "\"ldr\":";
    json += String(ldrValue);
    json += ",";

    json += "\"motion\":";
    json += String(motion);
    json += ",";

    json += "\"gas\":";
    json += String(gasValue);
    json += ",";

    json += "\"light\":\"";
    json += lightState ? "ON" : "OFF";
    json += "\",";

    json += "\"fan\":\"";
    json += fanState ? "ON" : "OFF";
    json += "\"";

    json += ",\"lightAuto\":";
    json += manualLight ? "false" : "true";

    json += ",\"fanAuto\":";
    json += manualFan ? "false" : "true";

    json += "}";

    return json;
}

// =====================================================
//                    API HANDLERS
// =====================================================

void handleStatus() {

    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.send(
        200,
        "application/json",
        getSensorData()
    );
}

// =====================================================
//                    LIGHT APIs
// =====================================================

void handleLightOn() {

    manualLight = true;

    lightState = true;

    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.send(
        200,
        "application/json",
        "{\"message\":\"Light ON\"}"
    );
}

void handleLightOff() {

    manualLight = true;

    lightState = false;

    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.send(
        200,
        "application/json",
        "{\"message\":\"Light OFF\"}"
    );
}

void handleLightAuto() {

    manualLight = false;

    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.send(
        200,
        "application/json",
        "{\"message\":\"Light AUTO\"}"
    );
}

// =====================================================
//                     FAN APIs
// =====================================================

void handleFanOn() {

    manualFan = true;

    fanState = true;

    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.send(
        200,
        "application/json",
        "{\"message\":\"Fan ON\"}"
    );
}

void handleFanOff() {

    manualFan = true;

    fanState = false;

    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.send(
        200,
        "application/json",
        "{\"message\":\"Fan OFF\"}"
    );
}

void handleFanAuto() {

    manualFan = false;

    server.sendHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    server.send(
        200,
        "application/json",
        "{\"message\":\"Fan AUTO\"}"
    );
}

// =====================================================
//                        SETUP
// =====================================================

void setup() {

    Serial.begin(115200);

    dht.begin();

    pinMode(LIGHT_RELAY_PIN, OUTPUT);

    pinMode(FAN_RELAY_PIN, OUTPUT);

    pinMode(PIR_PIN, INPUT);

    pinMode(MQ2_PIN, INPUT);

    // Light relay active LOW
    digitalWrite(LIGHT_RELAY_PIN, HIGH);

    // Fan relay active HIGH
    digitalWrite(FAN_RELAY_PIN, LOW);

    // =================================================
    //                  WIFI CONNECT
    // =================================================

    WiFi.begin(ssid, password);

    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED) {

        delay(500);

        Serial.print(".");
    }

    Serial.println();

    Serial.println("WiFi Connected");

    Serial.print("IP Address: ");

    Serial.println(WiFi.localIP());

    // =================================================
    //                   API ROUTES
    // =================================================

    server.on("/api/status", handleStatus);

    // Light
    server.on("/api/light/on", handleLightOn);

    server.on("/api/light/off", handleLightOff);

    server.on("/api/light/auto", handleLightAuto);

    // Fan
    server.on("/api/fan/on", handleFanOn);

    server.on("/api/fan/off", handleFanOff);

    server.on("/api/fan/auto", handleFanAuto);

    server.begin();

    Serial.println("API Server Started");
}

// =====================================================
//                         LOOP
// =====================================================

void loop() {

    server.handleClient();

    int motion = digitalRead(PIR_PIN);

    int ldrValue = readLDR();

    int gasValue = analogRead(MQ2_PIN);

    float temperature = dht.readTemperature();

    // =================================================
    //                DARK/BRIGHT STABILITY
    // =====================================================

    if (!darkState && ldrValue > DARK_THRESHOLD) {

        darkState = true;
    }

    if (darkState && ldrValue < LIGHT_THRESHOLD) {

        darkState = false;
    }

    // =================================================
    //                  LIGHT AUTO
    // =====================================================

    if (!manualLight) {

        if (darkState && motion == HIGH) {

            lastLightMotionTime = millis();
        }

        if (!darkState) {

            lightState = false;
        }

        else {

            lightState =
                (millis() - lastLightMotionTime <= lightDelay);
        }
    }

    // =================================================
    //                  FAN AUTO
    // =====================================================

    gasDetected = (gasValue > GAS_THRESHOLD);

    if (!manualFan) {

        if (motion == HIGH &&
            temperature >= TEMP_THRESHOLD) {

            lastFanMotionTime = millis();
        }

        fanState =
            gasDetected ||
            (
                temperature >= TEMP_THRESHOLD &&
                (millis() - lastFanMotionTime <= fanDelay)
            );
    }

    // =================================================
    //                 RELAY CONTROL
    // =====================================================

    // Light relay active LOW
    digitalWrite(
        LIGHT_RELAY_PIN,
        lightState ? LOW : HIGH
    );

    // Fan relay active HIGH
    digitalWrite(
        FAN_RELAY_PIN,
        fanState ? HIGH : LOW
    );

    delay(100);
}