import { useEffect, FC, useState } from "react";
import { request, gql } from "graphql-request";
import Navbar from "./Navbar";

export interface CompanyProps {
  getCompany?: Function; // Make the property optional with the optional chaining operator
}

const containerStyle: React.CSSProperties = {
  backgroundImage: "url('/assets/espaco.jpg')", // Path to the background image
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const companyInfoStyle: React.CSSProperties = {
  color: "white",
  fontSize: "1.8rem",
  marginBottom: "10px",
};

interface ApiResponse {
  company: {
    ceo: string;
    coo: string;
    cto: string;
    founder: string;
    headquarters: {
      city: string;
    };
    name: string;
    employees: number;
  };
}

const GetCompany: FC<CompanyProps> = ({ getCompany }) => {
  const [companyInfo, setCompanyInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        query Company {
          company {
            ceo
            coo
            cto
            founder
            headquarters {
              city
            }
            name
            employees
          }
        }
      `;
      try {
        const responseData: ApiResponse = await request(
          "https://spacex-production.up.railway.app/",
          query
        );

        if (responseData && responseData.company) {
          // Update the state with company data
          setCompanyInfo(responseData.company);
          // Call the provided function to pass company data to the parent component
          if (getCompany) {
            getCompany(responseData.company);
          }
        } else {
          console.error("No company data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getCompany]);

  const compListStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
    color: "#000000",
  };

  const compItemStyle: React.CSSProperties = {
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
        <h2 style={companyInfoStyle}>Company Information:</h2>
        {companyInfo && (
          <ul style={compListStyle}>
            <li style={compItemStyle}>
              <p>
                <strong>Name:</strong> {companyInfo.name}
              </p>
              <p>
                <strong>CEO:</strong> {companyInfo.ceo}
              </p>
              <p>
                <strong>COO:</strong> {companyInfo.coo}
              </p>
              <p>
                <strong>CTO:</strong> {companyInfo.cto}
              </p>
              <p>
                <strong>Founder:</strong> {companyInfo.founder}
              </p>
              <p>
                <strong>Headquarters:</strong> {companyInfo.headquarters.city}
              </p>
              <p>
                <strong>Employees:</strong> {companyInfo.employees}
              </p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default GetCompany;
