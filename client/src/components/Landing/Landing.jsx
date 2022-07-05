import React from "react";
import { Link } from "react-router-dom";
import s from './Landing.module.css'

export default function Landing(){
    return(
        <div>
            <div className={s.Title}>
            <h1 className={s.Text}>Bienvenido a la Wiki de Pokemons</h1>
            </div>
            <div>
            <Link to='/home'>
                <button className={s.Boton}>Ingresar</button>
            </Link>
            </div>
        </div>
    )
}