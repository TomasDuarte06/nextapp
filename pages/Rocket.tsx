import { useEffect, FC, useState } from "react";
import { request, gql } from "graphql-request";

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

  // Função para adicionar ou atualizar os dados do foguete no estado
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
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      > */}
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
                <strong>Height:</strong> {rocket.height.meters} meters
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default Getrocket;
