import { FC } from "react";
import Image from "next/image";

// const headerStyle: React.CSSProperties = {
//   textAlign: "center",
//   marginTop: "0px",
//   fontSize: "2.5rem", // Tamanho maior do texto
//   fontWeight: "bold", // Texto em negrito
//   color: "#b9af2a", // Cor do texto
//   background: "linear-gradient(to right, #cf2d2d, #3737c4)", // Gradiente de vermelho para azul
//   padding: "30px",
//   borderRadius: "5px",
//   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
// };

const Start: FC = () => {
  return (
    <div>
      {/* <header style={headerStyle}>SpaceX News</header> */}
      <main>
        <section>
          <div style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <ImageWithText
                src="/assets/espaco.jpg"
                alt="Imagem 1"
                slogan="STARLINK MISSION"
                buttonText="Ver mais "
              />
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <ImageWithText
                src="/assets/espaco.jpg"
                alt="Imagem 2"
                slogan="TELKOMSAT MERAH PUTIH 2 MISSION"
                buttonText="Ver mais"
              />
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <ImageWithText
                src="/assets/espaco.jpg"
                alt="Imagem 3"
                slogan="INTUITIVE MACHINES IM-1 MISSION"
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
  buttonText: string;
}

const ImageWithText: FC<ImageWithTextProps> = ({
  src,
  alt,
  slogan,
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
  };

  return (
    <div style={containerStyle}>
      <Image src={src} alt={alt} width={1920} height={1080} />
      <div style={textContainerStyle}>
        <h2 style={sloganStyle}>{slogan}</h2>
        <button style={buttonStyle}>{buttonText}</button>
      </div>
    </div>
  );
};

export default Start;
