"use client";
import React, { useState } from "react";
import Getrocket, { RocketsProps } from "../app/components/Rocket";
import Getlaunchpads from "../app/components/Launchpads";

function App() {
  const [rockets, setRockets] = useState<any[]>([]);

  const addRocket = (rocketData: any) => {
    // Verifica se o foguete já existe no estado
    const existingRocketIndex = rockets.findIndex(
      (rocket) => rocket.id === rocketData.id
    );

    // Se o foguete já existir, substitua-o pelo novo foguete no estado
    if (existingRocketIndex !== -1) {
      setRockets((prevRockets) => {
        const newRockets = [...prevRockets];
        newRockets[existingRocketIndex] = rocketData;
        return newRockets;
      });
    } else {
      // Se o foguete não existir, adicione-o ao estado
      setRockets((prevRockets) => [...prevRockets, rocketData]);
    }
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

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "0px",
    fontSize: "2.5rem", // Tamanho maior do texto
    fontWeight: "bold", // Texto em negrito
    color: "#b9af2a", // Cor do texto
    background: "linear-gradient(to right, #cf2d2d, #3737c4)", // Gradiente de vermelho para azul
    padding: "30px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div>
      {/* Footer */}
      <footer style={footerStyle}>SpaceX News</footer>

      {/* Restante do conteúdo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Lado esquerdo: Lista de foguetes */}
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

        {/* Lado direito: Outro conteúdo */}
        <div style={{ flex: 2 }}>
          {/* Aqui você pode adicionar qualquer outro conteúdo que desejar */}
        </div>

        {/* Componente para buscar os dados dos foguetes */}
        <Getrocket getrocket={addRocket} />
        {/* <Getlaunchpads getlaunchpads={addlaunchpad} /> */}
      </div>
    </div>
  );
}

export default App;
