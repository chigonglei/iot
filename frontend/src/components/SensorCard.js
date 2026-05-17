import "../styles/SensorCard.css";

function SensorCard({

  title,

  value,

  status,

  color,

  icon

}) {

  return (

    <div className="sensor-card">

      <div
        className="sensor-icon"
        style={{
          background: color
        }}
      >
        {icon}
      </div>

      <h2>{title}</h2>

      <h1>{value}</h1>

      <p>{status}</p>

    </div>
  );
}

export default SensorCard;