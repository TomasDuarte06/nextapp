"use client";
import React, { useState } from "react";
import Getrocket, { RocketsProps } from "../app/components/Rocket";

function App() {
  const [rockets, setRockets] = useState<any[]>([]);

  const addRocket = (rocketData: any) => {
    setRockets((prevRockets) => [...prevRockets, rocketData]);
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#615f5f",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(131, 131, 131, 0.1)",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  };

  const rocketListStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
    color: "#000000",
  };

  const rocketItemStyle: React.CSSProperties = {
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>SpaceX Rocket Information</h1>

      <Getrocket getrocket={addRocket} />

      <div>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>Rockets:</h2>
        <ul style={rocketListStyle}>
          {rockets.map((rocket, index) => (
            <li key={index} style={rocketItemStyle}>
              <p>
                <strong>ID:</strong> {rocket.id}
              </p>
              <p>
                <strong>Name:</strong> {rocket.name}
              </p>
              <p>
                <strong>Country:</strong> {rocket.country}
              </p>
              <p>
                <strong>Height:</strong> {rocket.height} meters
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
