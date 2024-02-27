import React, { useEffect, FC, useState } from "react";
import { request, gql } from "graphql-request";
import Navbar from "./Navbar";
import Image from "next/image";
import nextConfig from "../next.config.mjs";

console.log(nextConfig);

export interface ShipsProps {
  getShips?: Function; // Make the property optional with the optional chaining operator
}

interface ApiResponse {
  ships: {
    abs: string;
    image: string;
    model: string;
    name: string;
    weight_kg: string;
    status: string;
    id: string;
  }[];
}

const GetShips: FC<ShipsProps> = ({ getShips }) => {
  const [ships, setShips] = useState<any[]>([]);
  const [selectedShip, setSelectedShip] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        {
          ships {
            abs
            image
            model
            name
            weight_kg
            status
            id
          }
        }
      `;
      try {
        const responseData: ApiResponse = await request(
          "https://spacex-production.up.railway.app/",
          query
        );

        if (responseData && responseData.ships) {
          // Update the state with ships data
          setShips(responseData.ships);
          // Call the provided function to pass ships data to the parent component
          if (getShips) {
            getShips(responseData.ships);
          }
        } else {
          console.error("No ship data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getShips]);

  const containerStyle: React.CSSProperties = {
    backgroundImage: "url('/assets/espaco.jpg')", 
    // backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const shipListStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
    color: "#000000",
  };

  const shipItemStyle: React.CSSProperties = {
    marginBottom: "20px",
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const selectStyle: React.CSSProperties = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#555",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    width: "200px",
    marginBottom: "20px",
  };

  const handleMissionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShip(event.target.value);
  };

  const filteredLaunches = selectedShip
    ? ships.filter((ship) => ship.name === selectedShip)
    : ships;

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <div style={shipListStyle}>
          <h2
            style={{ color: "white", fontSize: "1.8rem", marginBottom: "10px" }}
          >
            Select Ship:
          </h2>
          <select
            onChange={handleMissionSelect}
            value={selectedShip || ""}
            style={selectStyle}
          >
            <option value="">All Missions</option>
            {ships.map((ship) => (
              <option key={ship.name} value={ship.name}>
                {ship.name}
              </option>
            ))}
          </select>
          {filteredLaunches.map((ship, index) => (
            <div key={index} style={shipItemStyle}>
              <p>
                <strong>ID:</strong> {ship.id}
              </p>
              <p>
                <strong>Name:</strong> {ship.name}
              </p>
              <p>
                <strong>Model:</strong> {ship.model}
              </p>
              <p>
                <strong>Status:</strong> {ship.status}
              </p>
              <p>
                <strong>Weight:</strong> {ship.weight_kg} kg
              </p>
              {ship.image ? (
                <Image
                  src={ship.image}
                  alt={ship.name}
                  width={500} // Set the desired width
                  height={300} // Set the desired height
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetShips;
