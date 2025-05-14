import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lugar.css';

function Lugar({ name, type, dimension, residentes }) {
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [nombresResidentes, setNombresResidentes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const limiteInicial = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerNombres = async () => {
            try {
                const respuestas = await Promise.all(residentes.map(url => fetch(url)));
                const datos = await Promise.all(respuestas.map(res => res.json()));
                setNombresResidentes(datos.map(p => p.name));
            } catch (error) {
                console.error('Error al cargar los nombres de residentes:', error);
            } finally {
                setCargando(false);
            }
        };

        if (residentes.length > 0) {
            obtenerNombres();
        } else {
            setCargando(false);
        }
    }, [residentes]);

    const residentesMostrados = mostrarTodos
        ? nombresResidentes
        : nombresResidentes.slice(0, limiteInicial);

    const handleResidentsClick = () => {
        navigate(`/personajes?origin=${encodeURIComponent(name)}`);
    };

    return (
        <div className="lugar_main_container">
            <div className="nombre_lugar_container">
                <h3 className="nombre_lugar">
                    {name}
                </h3>
            </div>

            <div className="descripcion_lugar_container">
                <p className="tipo_lugar">
                    <span className="header_descripcion">Tipo: </span>{type}
                </p>
                <p className="tipo_lugar">
                    <span className="header_descripcion">Dimensión: </span>{dimension}
                </p>
            </div>

            <div className="residentes_container">
                <button
                    className="residentes_button"
                    onClick={handleResidentsClick}
                >
                    Residentes:
                </button>

                {cargando ? (
                    <p>Cargando residentes...</p>
                ) : (
                    <>
                        <ul className="residentes_lista">
                            {residentesMostrados.length > 0 ? (
                                residentesMostrados.map((nombre, idx) => (
                                    <li key={idx} className="residente_item">{nombre}</li>
                                ))
                            ) : (
                                <p>No hay residentes.</p>
                            )}
                        </ul>

                        {nombresResidentes.length > limiteInicial && (
                            <button
                                onClick={() => setMostrarTodos(!mostrarTodos)}
                                className="mostrar_mas_btn"
                            >
                                {mostrarTodos ? 'Mostrar menos' : 'Mostrar más'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Lugar;