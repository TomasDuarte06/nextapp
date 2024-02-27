import React, { useEffect, FC, useState } from "react";
import { request, gql } from "graphql-request";
import Navbar from "./Navbar";

export interface LaunchesProps {
  getLaunch?: Function; // Make the property optional with the optional chaining operator
}

interface ApiResponse {
  launches: {
    launch_date_local: string;
    launch_year: string;
    mission_name: string;
    rocket: {
      rocket_name: string;
    };
    upcoming: boolean;
  }[];
}

const GetLaunches: FC<LaunchesProps> = ({ getLaunch }) => {
  const [launches, setLaunches] = useState<any[]>([]);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        {
          launches {
            launch_date_local
            launch_year
            mission_name
            rocket {
              rocket_name
            }
            upcoming
          }
        }
      `;
      try {
        const responseData: ApiResponse = await request(
          "https://spacex-production.up.railway.app/",
          query
        );

        if (responseData && responseData.launches) {
          // Update the state with launch data
          setLaunches(responseData.launches);
          // Call the provided function to pass launch data to the parent component
          if (getLaunch) {
            getLaunch(responseData.launches);
          }
        } else {
          console.error("No launch data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getLaunch]);

  const handleMissionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMission(event.target.value);
  };

  const filteredLaunches = selectedMission
    ? launches.filter((launch) => launch.mission_name === selectedMission)
    : launches;

  const containerStyle: React.CSSProperties = {
    backgroundImage: "url('/assets/espaco.jpg')", // Path to the background image
    // backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const launchListStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
    color: "#000000",
  };

  const launchItemStyle: React.CSSProperties = {
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

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <div>
          <h2
            style={{ color: "white", fontSize: "1.8rem", marginBottom: "10px" }}
          >
            Select Mission:
          </h2>
          <select
            onChange={handleMissionSelect}
            value={selectedMission || ""}
            style={selectStyle}
          >
            <option value="">All Missions</option>
            {launches.map((launch) => (
              <option key={launch.mission_name} value={launch.mission_name}>
                {launch.mission_name}
              </option>
            ))}
          </select>
        </div>
        <div style={launchListStyle}>
          {filteredLaunches.map((launch, index) => (
            <div key={index} style={launchItemStyle}>
              <p>
                <strong>Date:</strong> {launch.launch_date_local}
              </p>
              <p>
                <strong>Year:</strong> {launch.launch_year}
              </p>
              <p>
                <strong>Mission:</strong> {launch.mission_name}
              </p>
              <p>
                <strong>Rocket:</strong> {launch.rocket.rocket_name}
              </p>
              <p>
                <strong>Upcoming:</strong> {launch.upcoming ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetLaunches;
