import "../styles/DeviceControl.css";

function DeviceControl({

  title,

  subtitle,

  state,

  auto,

  onToggle,

  onAutoToggle

}) {

  return (

    <div className="device-control">

      <div>

        <h2>{title}</h2>

        <p>{subtitle}</p>

      </div>

      <div className="controls">

        <button
          className={
            state
              ? "toggle active"
              : "toggle"
          }
          onClick={onToggle}
        >

          <div className="circle"></div>

        </button>

        <button
          className={
            auto
              ? "auto-btn active-auto"
              : "auto-btn"
          }
          onClick={onAutoToggle}
        >

          {auto
            ? "AUTOMATIC"
            : "MANUAL"}
        </button>

      </div>

    </div>
  );
}

export default DeviceControl;