import "./SobreNosotros.web.css";
import Integrante from "../components/about/Integrante.web.js";

function SobreNosotros() {
  const aitor = {
    nombre: "Aitor",
    apellidos: "Arraras Torres",
    descripcion:
      "Estudiante de Ingeniería Informática en la UPNA de 4to año. Apasionado de la ciberseguridad y el desarrollo.",
    foto: "/aitor.png",
    correo: "arraras.139286@e.unavarra.es"
  };
  const ruben = {
    nombre: "Rubén",
    apellidos: "Zubasti Aristu",
    descripcion:
      "Estudiante de Ingeniería Informática en la UPNA de 3er año. Apasionado por el software y el desarrollo web.",
    foto: "/ruben.jpeg",
    correo: "zubasti.153989@e.unavarra.es"
  };
  const aritz = {
    nombre: "Aritz",
    apellidos: "Huarte Urriza",
    descripcion: "En progreso...",
    foto: "/aritz.jpg",
    correo: "huarte.147017@e.unavarra.es"
  };
  const paula = {
    nombre: "Paula",
    apellidos: "Ruiz de Gopegui Rubio",
    descripcion:
      "Estudiante de Ingeniería Informática en la UPNA de 4to año. Apasionada por el desarrollo web y software.",
    foto: "/paula.jpg",
    correo: "ruizdegopegui.148800@e.unavarra.es",
  };
  return (
    <div className="screenSobreNosotros">
      <div className="container_sobre-nosotros">
        <div className="div_background-sobre-nosotros"></div>
        <div className="div_background-blur-sobre-nosotros"></div>
        <h1 className="title_about">Sobre Nosotros</h1>
        <div className={"info_equipo_container"}>
          <h2 className="subtitle_about">Nuestro Equipo - ByteMe</h2>
          <p className="text_about">
            Conoce al equipo detrás de{" "}
            <span className={"text_destacado"}>ByteMe</span>. Somos un grupo de 4
            estudiantes apasionados por la{" "}
            <span className={"text_destacado"}>tecnología</span>y la{" "}
            <span className={"text_destacado"}>programación</span>, cuyo objetivo
            es aprender lo máximo posible sobre las herramientas más actuales.
          </p>
          <p className="text_about">
            Empezamos en 2025 como un pequeño proyecto desde la UPNA.
          </p>
        </div>
        <div className="integrantes_container">
          <h2 className="subtitle_about">Nuestros integrantes</h2>
          <Integrante {...aitor}></Integrante>
          <Integrante {...ruben}></Integrante>
          <Integrante {...aritz}></Integrante>
          <Integrante {...paula}></Integrante>
        </div>
      </div>
    </div>
  );
}

export default SobreNosotros;
