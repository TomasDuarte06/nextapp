import React, { useEffect, FC, useState } from "react";
import { request, gql } from "graphql-request";
import Navbar from "./Navbar";

export interface DragonsProps {
  getDragons?: Function; // Make the property optional with the optional chaining operator
}

interface ApiResponse {
  dragons: {
    crew_capacity: number;
    description: string;
    diameter: {
      meters: number;
    };
    dry_mass_kg: number;
    first_flight: string;
    name: string;
    orbit_duration_yr: number;
    trunk: {
      trunk_volume: {
        cubic_meters: number;
      };
    };
    type: string;
  }[];
}

const GetDragons: FC<DragonsProps> = ({ getDragons }) => {
  const [dragons, setDragons] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        query Query {
          dragons {
            crew_capacity
            description
            diameter {
              meters
            }
            dry_mass_kg
            first_flight
            name
            orbit_duration_yr
            trunk {
              trunk_volume {
                cubic_meters
              }
            }
            type
          }
        }
      `;
      try {
        const responseData: ApiResponse = await request(
          "https://spacex-production.up.railway.app/",
          query
        );

        if (responseData && responseData.dragons) {
          // Update the state with dragon data
          setDragons(responseData.dragons);
          // Call the provided function to pass dragon data to the parent component
          if (getDragons) {
            getDragons(responseData.dragons);
          }
        } else {
          console.error("No dragon data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getDragons]);

  const containerStyle: React.CSSProperties = {
    backgroundImage: "url('/assets/espaco.jpg')", // Path to the background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const dragonListStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
    color: "#000000",
  };

  const dragonItemStyle: React.CSSProperties = {
    marginBottom: "20px",
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <h2
          style={{ color: "white", fontSize: "1.8rem", marginBottom: "10px" }}
        >
          Dragons:
        </h2>
        <ul style={dragonListStyle}>
          {dragons.map((dragon, index) => (
            <li key={index} style={dragonItemStyle}>
              <p>
                <strong>Name:</strong> {dragon.name}
              </p>
              <p>
                <strong>Description:</strong> {dragon.description}
              </p>
              <p>
                <strong>Type:</strong> {dragon.type}
              </p>
              <p>
                <strong>Crew Capacity:</strong> {dragon.crew_capacity}
              </p>
              <p>
                <strong>Diameter:</strong> {dragon.diameter.meters} meters
              </p>
              <p>
                <strong>Dry Mass:</strong> {dragon.dry_mass_kg} kg
              </p>
              <p>
                <strong>First Flight:</strong> {dragon.first_flight}
              </p>
              <p>
                <strong>Orbit Duration:</strong> {dragon.orbit_duration_yr}{" "}
                years
              </p>
              <p>
                <strong>Trunk Volume:</strong>{" "}
                {dragon.trunk.trunk_volume.cubic_meters} cubic meters
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetDragons;
