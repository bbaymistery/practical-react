import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert }) => {
  // console.log(alert);

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  });
  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          backgroundColor: `${alert.type === "green" ? "green" : "red"}`,
          padding: "5px",
          marginBottom: "15px",
        }}
      >
        {alert.msg}
      </h2>
    </div>
  );
};

export default Alert;
