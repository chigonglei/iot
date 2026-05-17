import {

  useEffect,

  useState

} from "react";

import axios from "axios";

import "./App.css";

import SensorCard
from "./components/SensorCard";

import DeviceControl
from "./components/DeviceControl";

import {

  FaTemperatureHigh,

  FaLightbulb,

  FaRunning,

  FaWind

} from "react-icons/fa";

function App() {

  const ESP32 =
    "http://192.168.137.212";

  const [data, setData] =
    useState(null);

//   const [data, setData] =
//   useState({

//     temperature: 28.6,

//     ldr: 420,

//     motion: 1,

//     gas: 120,

//     light: "ON",

//     fan: "OFF"
// });

  const fetchData = async () => {

    try {

      const res =
        await axios.get(
          `${ESP32}/api/status`
        );

      setData(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(fetchData, 2000);

    return () =>
      clearInterval(interval);

  }, []);

  const toggleLight = async () => {

  if (data.light === "ON") {

    await axios.get(
      `${ESP32}/api/light/off`
    );

  } else {

    await axios.get(
      `${ESP32}/api/light/on`
    );
  }

  fetchData();
};

  const toggleFan =
    async () => {

      if (data.fan === "ON") {

        await axios.get(
          `${ESP32}/api/fan/off`
        );

      } else {

        await axios.get(
          `${ESP32}/api/fan/on`
        );
      }

      fetchData();
    };

    const toggleLightAuto = async () => {

  await axios.get(
    `${ESP32}/api/light/auto`
  );

  fetchData();
};

const toggleFanAuto = async () => {

  await axios.get(
    `${ESP32}/api/fan/auto`
  );

  fetchData();
};

  if (!data) {

    return <h1>Loading...</h1>;
  }

  return (

    <div className="app">

      <div className="top-bar">

        <div>

          <h1>
            Smart Home Dashboard
          </h1>

          <p>
            All systems running smoothly
          </p>

        </div>

      </div>

      <h2 className="section-title">
        SENSOR READINGS
      </h2>

      <div className="sensor-grid">

        <SensorCard
          title="Temperature"
          value={`${data.temperature}°C`}
          status="NORMAL"
          color="#7c3aed"
          icon={<FaTemperatureHigh />}
        />

        <SensorCard
          title="Light Intensity"
          value={data.ldr}
          status={
            data.ldr > 2000
              ? "DARK"
              : "BRIGHT"
          }
          color="#facc15"
          icon={<FaLightbulb />}
        />

        <SensorCard
          title="Motion Status"
          value={
            data.motion
              ? "Detected"
              : "No Motion"
          }
          status="ACTIVE"
          color="#22c55e"
          icon={<FaRunning />}
        />

        <SensorCard
          title="Gas Level"
          value={data.gas}
          status={
            data.gas > 2500
              ? "DANGER"
              : "SAFE"
          }
          color="#ef4444"
          icon={<FaWind />}
        />

      </div>

      <h2 className="section-title">
        APPLIANCE CONTROL
      </h2>

      <DeviceControl
  title="Light"
  subtitle="Living Room"
  state={data.light === "ON"}
  auto={data.lightAuto}
  onToggle={toggleLight}
  onAutoToggle={toggleLightAuto}
/>

      <DeviceControl
  title="Fan"
  subtitle="Living Room"
  state={data.fan === "ON"}
  auto={data.fanAuto}
  onToggle={toggleFan}
  onAutoToggle={toggleFanAuto}
/>

    </div>
  );
}

export default App;