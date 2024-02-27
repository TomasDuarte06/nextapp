import { useEffect, FC, useState } from "react";
import { request, gql } from "graphql-request";
import Navbar from "./Navbar";

export interface RocketsProps {
  getrocket?: Function; // Torna a propriedade opcional com o operador de aspas
}
interface ApiResponse {
  rockets: {
    id: number;
    name: string;
    country: string;
    height: {
      meters: string;
    };
  }[];
}

const Getrocket: FC<RocketsProps> = ({ getrocket }) => {
  const [rockets, setRockets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        {
          rockets {
            id
            name
            country
            height {
              meters
            }
          }
        }
      `;
      try {
        const responseData: ApiResponse = await request(
          "https://spacex-production.up.railway.app/",
          query
        );

        if (responseData && responseData.rockets) {
          // Atualiza o estado com os dados dos foguetes
          setRockets(responseData.rockets);
          // Chama a função fornecida para passar os dados dos foguetes para o componente pai
          if (getrocket) {
            getrocket(responseData.rockets);
          }
        } else {
          console.error("No rocket data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getrocket]);

  const containerStyle: React.CSSProperties = {
    backgroundImage: "url('/assets/espaco.jpg')", // Caminho para a imagem de fundo
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    <div>
      <Navbar />
      <div style={containerStyle}>
        <h2
          style={{ color: "white", fontSize: "1.8rem", marginBottom: "10px" }}
        >
          Rockets:
        </h2>
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
                <strong>Height:</strong> {rocket.height.meters} meters
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Getrocket;
