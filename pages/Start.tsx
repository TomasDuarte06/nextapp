import { FC } from "react";
import Image from "next/image";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "0px",
  fontSize: "2.5rem", // Tamanho maior do texto
  fontWeight: "bold", // Texto em negrito
  color: "#b9af2a", // Cor do texto
  background: "linear-gradient(to right, #cf2d2d, #3737c4)", // Gradiente de vermelho para azul
  padding: "30px",
  borderRadius: "5px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

const Start: FC = () => {
  return (
    <div>
      {/* <header style={headerStyle}>SpaceX News</header> */}
      <main>
        <section>
          <h2></h2>

          <Image
            src="/assets/espaco.jpg"
            alt="Imagem 1"
            width={1920}
            height={1080}
          />
          <Image
            src="/assets/expaco.jpg"
            alt="Imagem 2"
            width={1920}
            height={1080}
          />
          <Image
            src="/assets/espaco2.gif"
            alt="Imagem 3"
            width={1920}
            height={1080}
          />
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default Start;
