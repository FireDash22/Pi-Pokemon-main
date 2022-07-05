import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    filterByAttack,
    filterByDefense,
    filterPokemonsByType,
    filterCreated,
    Sort,
    } from '../../redux/actions/action';
import s from './Filter.module.css'
import t from './Types-filter.module.css'

export default function Filters(){
    const dispatch = useDispatch();

    const pokemonList = useSelector(state => state.pokemons)

    function handleFilterType(e) {
        dispatch(filterPokemonsByType(e.target.value));
      }
    
      function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
      }
    
      function handleFilterAttack(e) {
        dispatch(filterByAttack(e.target.value));
      }

      function handleFilterDefense(e) {
        dispatch(filterByDefense(e.target.value));
      }
    
      function handleSelectChange(e) {
        dispatch(Sort(e.target.value, pokemonList));
        return () => {
          dispatch(Sort(e.target.value, pokemonList))
        }
      }
      
    return(
        <div className={s.filters}>
          <div className={s.type}>
            <select name="selects" onChange={e => handleSelectChange(e)} className={t.types}>
            <option value="Filtro"> A-Z:</option>
            <option className={s.asendente} value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
            </select>
          </div>
        
          <div className={s.type}>
          <select
            name="selects"
            onChange={handleFilterAttack}
            className={t.types}
            >
            <option value="Fuerza"> Fuerza </option>
            <option value="Mayor fuerza">Mayor fuerza</option>
            <option value="Menor fuerza">Menor fuerza</option>
          </select>    
          </div>
          <div className={s.type}>
            <select
            name="selects"
            onChange={handleFilterDefense}
            className={t.types}
            >
              <option value="Defensa"> Defensa </option>
              <option value="Mayor defensa">Mayor defensa</option>
              <option value="Menor defensa">Menor defensa</option>
            </select>  
          </div>
          <div className={s.type}>
          <select onChange={handleFilterType} className={t.types}>
            <option value="type"> Tipo </option>
            <option value="normal"> Normal </option>
            <option value="flying"> Flying </option>
            <option value="poison"> Poison </option>
            <option value="ground"> Ground </option>
            <option value="rock"> Rock </option>
            <option value="bug"> Bug </option>
            <option value="ghost"> Ghost </option>
            <option value="steel"> Steel </option>
            <option value="fire"> Fire </option>
            <option value="water"> Water </option>
            <option value="grass"> Grass </option>
            <option value="electric"> Electric </option>
            <option value="psychic"> Psychic</option>
            <option value="ice"> Ice </option>
            <option value="dragon"> Dragon </option>
            <option value="dark"> Dark </option>
            <option value="fairy"> Fairy </option>
            <option value="unknown"> Unknown </option>
            <option value="shadow"> Shadow </option>
          </select>
          </div>
          <div className={s.type}>
          <select onChange={handleFilterCreated} className={t.types}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
          </div>
      
        </div>
        
    )
}