import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../public/assets/logoimage.png";

const Navbar: FC = () => {
  return (
    <nav style={navbarStyle}>
      <Link href="/">
        <div className="logo-container">
          <Image src={logoImage} alt="My Logo" width={150} height={40} />
        </div>
      </Link>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link href="/Company">COMPANY</Link>
        </li>
        <li style={liStyle}>
          <Link href="/Rocket">ROCKETS</Link>
        </li>
        <li style={liStyle}>
          <Link href="/Dragons">DRAGONS</Link>
        </li>
        <li style={liStyle}>
          <Link href="/Launches">LAUNCHES</Link>
        </li>
        <li style={liStyle}>
          <Link href="/Ships">SHIPS</Link>
        </li>
      </ul>
      <style jsx>{`
        nav {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px;
        }
        .logo-container {
          width: 150px;
          height: 40px;
        }
      `}</style>
    </nav>
  );
};

const navbarStyle: React.CSSProperties = {
  background: "black",
  color: "#ffffff",
  padding: "35px",
};

const ulStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  justifyContent: "flex-end",
};

const liStyle: React.CSSProperties = {
  fontSize: "20px",
  marginRight: "20px",
  marginTop: "10px",
  color: "#ffffff",
};

export default Navbar;
