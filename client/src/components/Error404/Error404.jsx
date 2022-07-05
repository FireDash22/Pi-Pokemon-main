import React from "react";
import { Link } from 'react-router-dom';
import s from './error404.module.css'

export default function Error404(){
    return (
        <div className={s.error}>
            <h1>404</h1>
            <h2>UPS!!! El direccionamiento no es correcto.</h2>
            <p>
                La página que buscas no existe. Cómo llegaste aquí es un misterio. 
                Pero puedes hacer click en el botón de abajo para volver a la página de inicio.
            </p>
            <Link to="/home">
                <button className={s.home}>HOME</button>
            </Link>
            <p>ERR: Page Not Found</p>
        </div>
    )
}