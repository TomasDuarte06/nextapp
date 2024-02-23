import { useEffect, FC } from "react";
import { request, gql } from "graphql-request";

export interface RocketsProps {
  getrocket: Function;
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

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData: ApiResponse = await request(
          "https://spacex-production.up.railway.app/",
          query
        );

        if (responseData && responseData.rockets) {
          responseData.rockets.forEach((rocket) => {
            const { id, name, country, height } = rocket;
            const { meters } = height;

            getrocket({
              id,
              name,
              country,
              height: meters,
            });
          });
        } else {
          console.error("No rocket data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return null;
};

export default Getrocket;
