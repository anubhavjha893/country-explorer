import React from "react";
import "./Loader.css"; // small CSS file provided earlier

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader" />
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default Loader;
