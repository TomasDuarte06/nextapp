import { FC } from "react";
import Image from "next/image";
import Link from "next/link"; // Importando o componente Link

const Start: FC = () => {
  return (
    <div>
      <main>
        <section>
          <div style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <ImageWithText
                src="/assets/rocket1.jpg"
                alt="Imagem 1"
                slogan="CREW-8 MISSION"
                link="/Launches" // Adicionando a propriedade de link para a página crew-8
                buttonText="Ver mais"
              />
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <ImageWithText
                src="/assets/rocket2.jpg"
                alt="Imagem 2"
                slogan="STARLINK MISSION"
                link="/Launches" // Adicionando a propriedade de link para a página starlink
                buttonText="Ver mais"
              />
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <ImageWithText
                src="/assets/rocket3.jpg"
                alt="Imagem 3"
                slogan="STARSHIP'S SECOND FLIGHT TEST"
                link="/Launches" // Adicionando a propriedade de link para a página starship
                buttonText="Ver mais"
              />
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

interface ImageWithTextProps {
  src: string;
  alt: string;
  slogan: string;
  link: string; // Adicionando a propriedade de link
  buttonText: string;
}

const ImageWithText: FC<ImageWithTextProps> = ({
  src,
  alt,
  slogan,
  link, // Recebendo o link como uma propriedade
  buttonText,
}) => {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  const textContainerStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "100px",
    left: "200px",
    textAlign: "left",
    color: "#ffffff",
  };

  const sloganStyle: React.CSSProperties = {
    fontSize: "3rem",
  };

  const buttonStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    padding: "10px 50px",
    backgroundColor: "transparent", // Cor de fundo transparente
    border: "2px solid white", // Borda branca com espessura de 5px
    color: "white", // Cor do texto branca
    marginTop: "70px",
    zIndex: "2",
  };

  return (
    <div style={containerStyle}>
      <Link href={link}>
        {" "}
        {/* Usando o componente Link para redirecionar para a página */}
        <div>
          <Image src={src} alt={alt} width={1920} height={1080} />
          <div style={textContainerStyle}>
            <h2 style={sloganStyle}>{slogan}</h2>
            <button style={buttonStyle}>{buttonText}</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Start;
