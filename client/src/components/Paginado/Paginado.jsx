import React from "react";
import s from './Paginado.module.css'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={s.paginado} >
        {pageNumbers &&
          pageNumbers.map((number, index) => {
             return <li className={s.numbers} key ={index}>
           <button className={s.btn} onClick={() => paginado(number)}>
             {number}
              </button>
            </li>
          })}
      </ul>
    </nav>
  );
}

