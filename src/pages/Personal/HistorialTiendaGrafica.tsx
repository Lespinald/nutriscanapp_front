import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './MenuPerfil.module.css'
import { Historial } from "../../assets/models/historial";

interface HistorialTiendaGraficaProps{
    historial: Historial[];
    itemsPerPage?: number;
}

export const HistorialTiendaGrafica: React.FC<HistorialTiendaGraficaProps> = ({ historial, itemsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const handleClick = (ID_producto: number | string) => {
        console.log("🚀 ~ handleClick ~ ID_producto:", ID_producto)
        navigate(`/app/Busqueda/${ID_producto}`)
    };

    let paginatedHistorial = historial.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    useEffect(() => {
        paginatedHistorial = historial.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    }, [currentPage])
    

    const totalPages = Math.ceil(historial.length / itemsPerPage);

    return (
        <div className={style.historialGrafica}>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>ID Producto</th>
                <th>Redireccionado</th>
                <th>Fecha</th>
            </tr>
            </thead>
            <tbody>
            {paginatedHistorial.map((item) => (
                <tr key={item.ID_dia}>
                <td>{item.ID_dia}</td>
                <td>
                    <a href="#">
                    {item.ID_producto}
                    </a>
                </td>
                <td>{item.redireccion ? 'Sí' : 'No'}</td>
                <td>{item.fecha}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className={style.containPagination}>
            <div className={style.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => setCurrentPage(index)} className={index === currentPage ? 'active' : ''}>
                    {index + 1}
                </button>
                ))}
            </div>
        </div>
        {historial.length === 0 && <label>UPS! aún no tienes registros</label>}
        </div>
    );
};
