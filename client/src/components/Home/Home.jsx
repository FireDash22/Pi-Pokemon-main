import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Card from "../Cards/Card";
import Search from "../Search/Search";
import Paginado from "../Paginado/Paginado.jsx";
import Filters from '../Filters/Filters.jsx'
import Loading from "../Loading/Loading.jsx";
import s from './Home.module.css'
import { getPokemons } from "../../redux/actions/action";


export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons) 
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(
      indexOfFirstPokemon,
      indexOfLastPokemon
    );

    const nextPage = () => {
      setCurrentPage(currentPage + 1)
    }

    const prePage = () => {
      setCurrentPage(currentPage - 1)
    }
  
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    useEffect(() => {
      dispatch(getPokemons());
    }, [dispatch]);
    
      if(allPokemons.length < 1){
        return (
          <Loading/>
        )
      } else {
        return( 
        <div>
            <div className={s.create}>
                <Link to='/create' className={s.CreatePokemon}>Crear Pokemon</Link>
                <Search/>
            </div>
            <div>
              <Filters/>
              <div className={s.pagination}>
                <button onClick={() => {prePage()}} disabled={currentPage === 1} className={s.button}>previous</button>
                <Paginado
                  pokemonsPerPage={pokemonsPerPage}
                  allPokemons={allPokemons.length}
                  paginado={paginado}
                />
                <button onClick={() => {nextPage()}} disabled={currentPage === 4} className={s.next}>next</button>
              </div>
            </div>
            
            
            
            <div className={s.cards} >   
                {
                    currentPokemons?.map((pokemon) => {
                        return(
                        <fragment>
                        <Link to={"/home/" + pokemon.id} className={s.Text2}>
                          <Card 
                          key={pokemon.id}
                          defense={pokemon.defense}
                          attack={pokemon.attack}
                          name={pokemon.name}
                          img={pokemon.img}
                          types={pokemon.types?.reduce((acumulador,element) => {return(acumulador + '  ' +element )},'')}
                          />
                        </Link>
                        </fragment>
                        )
                    })
                }
            </div>
        </div>
        )
      }
}