import { useEffect, FC } from "react";
import { request, gql } from "graphql-request";

export interface LaunchpadsProps {
  getlaunchpad: Function;
}

interface ApiResponse {
  launchpads: {
    id: string;
    name: string;
    details: string;
    location: {
      name: string;
      region: string;
      longitude: string;
      latitude: string;
    };
    vehicles_launched: {
      name: string;
    }[];
  }[];
}

const Getlaunchpads: FC<LaunchpadsProps> = ({ getlaunchpad }) => {
  const query = gql`
    {
      launchpads {
        id
        name
        details
        location {
          name
          region
          longitude
          latitude
        }
        vehicles_launched {
          name
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
        if (responseData && responseData.launchpads) {
          responseData.launchpads.forEach((launchpad) => {
            const { id, name, details, location, vehicles_launched } = launchpad;
            const { name: locationName,region,longitude,latitude} = location;
            const vehiclesLaunchedNames = vehicles_launched.map((vehicle) => vehicle.name);

            getlaunchpad({
              id,
              name,
              details,
              location: {
                name: locationName,
                region,
                longitude,
                latitude,
              },
              vehicles_launched: vehiclesLaunchedNames,
            });
          });
        } else {
          console.error("No launchpad data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [query]);

  return null;
};

export default Getlaunchpads;
