import axios from 'axios';
import {
  GET_POKEMONS, 
  SEARCH_NAME, 
  FILTER_CREATED,
  GET_DETAILS,
  FILTER_BY_ATTACK,
  FILTER_BY_DEFENSE,
  FILTER_BY_TYPE,
  GET_TYPE,
  SORT,
} from './index.js'


export const getPokemons = () => {
    return async function (dispatch){
    try {
        const pokemons = await axios('http://localhost:3001/api/pokemons')
        dispatch({ 
            type: GET_POKEMONS, 
            payload: pokemons.data
        })
    } catch (error) {
        console.error('Error la acciones de getPokemons', error.message);
    }
    }
} 

export const searchPokemons = (name) => { 
        return async  function (dispatch){
        try {
            const pokemons = await axios('http://localhost:3001/api/pokemons?name=' + name)
            dispatch({ 
                type: SEARCH_NAME, 
                payload: pokemons.data
            })
        } catch (error) {
            return alert('No se encontro el Pokemon');
        }
      };
}

export function postPokemon(payload){
  return async function () {
    const response = await axios.post('http://localhost:3001/api/pokemons' , payload)
    return response;
  }
  }

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload,
    }
}

export const clearPokemonDetail = () => {
    return {
        type: GET_DETAILS, 
        payload: undefined
    }
}

export function getDetail(id){
     return async (dispatch) => { 
       try {
        const res = await axios.get(`http://localhost:3001/api/pokemons/${id}`)
        return dispatch({
            type: GET_DETAILS,
            payload: res.data
        })
       } catch (error) {
        dispatch({type: GET_DETAILS , payload: null})
       }
    } 
}

export const getTypes = () => async (dispatch) => {
    try{
        const typePokemons = await axios.get('http://localhost:3001/api/types');
        dispatch({
            type: GET_TYPE,
            payload: typePokemons.data
        })
    } catch(error){
        console.log(error)
    }
}

export function filterPokemonsByType(payload){
  return {
    type: FILTER_BY_TYPE,
    payload,
  }
} 

export function Sort(order){
  return {
    type: SORT,
    payload: order
  }
}

export function filterByAttack(payload){
  return{
    type: FILTER_BY_ATTACK,
    payload,
  }
}

export function filterByDefense(payload){
  return{
    type: FILTER_BY_DEFENSE,
    payload,
  }
}

