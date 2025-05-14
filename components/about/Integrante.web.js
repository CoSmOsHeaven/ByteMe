import "./Integrante.web.css";

function Integrante({ nombre, apellidos, descripcion, foto, correo }) {
    return(
        <div className="integrante_container">
            <img src={foto} alt={`${nombre} ${apellidos}`} className="integrante_imagen" />
            <div className="integrante_info">
                <h3 className="integrante_nombre">{nombre} {apellidos}</h3>
                <p className="integrante_descripcion">{descripcion}</p>
                <p className="integrante_correo"><span className={"correo_negrita"}>Correo: </span> {correo}</p>
            </div>
        </div>
    )
}

export default Integrante;