import React from "react";

const loaderStyle = {
  width: "48px",
  height: "48px",
  border: "6px solid #3498db",
  borderTop: "6px solid transparent",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "auto",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
};

const Loader = () => {
  return (
    <div style={containerStyle}>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
