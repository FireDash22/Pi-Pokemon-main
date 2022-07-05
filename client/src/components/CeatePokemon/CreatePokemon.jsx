import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTypes, postPokemon } from '../../redux/actions/action.js'
import { Link } from 'react-router-dom'
import s from './CreatePokemon.module.css'
import t from './types.module.css'


export default function PokemonCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const types = useSelector((state) => state.types);
  
    const [errors,setErrors] = useState({});
  
    const [pokemon, setPokemon] = useState({
      name: "",
      img: "",
      life: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  
    useEffect(() => {
      dispatch(getTypes());
    }, []);
  
    function handleTypeDelete(e){
      setPokemon({
        ...pokemon,
        types: pokemon.types.filter((type) => type !== e),
      })
    }
    function handleSelect(e) {
      if(!pokemon.types.includes(e.target.value)){ 
      setPokemon({
        ...pokemon,
        types: [...pokemon.types, e.target.value],
      });
     }
    }
  
  function onInputChange(e) {
    e.preventDefault();
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...pokemon,
        [e.target.name]: e.target.value,
      })
    );
  }
  
  
  function onSubmit(e) {
    e.preventDefault();
    const newPokemon = {
      ...pokemon, 
      types: pokemon.types.map((e)=> types.find(type => type.name === e).id), 
      name: pokemon.name.toLocaleLowerCase()
    }
    dispatch(postPokemon(newPokemon));
    alert("Personaje creado con exito");
    setPokemon({
      name: "",
      img: "",
      life: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
    navigate('/home')
  }
  
    return (
      <form onSubmit={onSubmit} >
        <div className={s.title}>
             <h3 className={s.title_tex}><span className={s.boton}><Link to='/home' className={s.volver}>¡Volver!</Link></span> ¡Crea tu pokemon!</h3>
        </div>
        <div className={s.form}>
          <div className={s.Info}>
          <label className={s.name}>Nombre: </label>
          <input
            onChange={onInputChange}
            name="name"
            type="text"
            value={pokemon.name}
            placeholder='Name...'
            required
            className={s.input}
          />
          {errors.name && <p className={s.error}> {errors.name}</p>}
          <br /><br />
       
          <label className={s.name}>Imagen: </label>
          <input
            onChange={onInputChange}
            name="img"
            type="text"
            value={pokemon.img}
            placeholder='Url de imagen...'
            className={s.input}
          />
          {errors.img && <p className={s.error}> {errors.img}</p>}
          <br /><br />
       
        
          
          <label className={s.name}>Vida: </label>
          <input
            onChange={onInputChange}
            name="life"
            type="text"
            value={pokemon.life}
            className={s.input}
          />
           {errors.life && <p className={s.error}> {errors.life}</p>}
          <br /><br />
       
       
          <label className={s.name}>Fuerza: </label>
          <input
            onChange={onInputChange}
            name="attack"
            type="text"
            value={pokemon.attack}
            className={s.input}
          />
           {errors.attack && <p className={s.error}> {errors.attack}</p>}
          <br /><br />
       
       
          <label className={s.name}>Defensa: </label>
          <input
            onChange={onInputChange}
            name="defense"
            type="text"
            value={pokemon.defense}
            className={s.input}
          />
           {errors.defense && <p className={s.error}> {errors.defense}</p>}
          <br /><br />
       
       
          <label className={s.name}>Velocidad: </label>
          <input
            onChange={onInputChange}
            name="speed"
            type="text"
            value={pokemon.speed}
            className={s.input}
          />
           {errors.speed && <p className={s.error}> {errors.speed}</p>}
            <br /><br />
       
       
         
          <label className={s.name}>Altura: </label>
          <input
            onChange={onInputChange}
            name="height"
            type="text"
            value={pokemon.height}
            className={s.input}
          />
           {errors.height && <p className={s.error}> {errors.height}</p>}
          <br /><br />
       
       
          <label className={s.name}>Peso: </label>
          <input
            onChange={onInputChange}
            name="weight"
            type="text"
            value={pokemon.weight}
            className={s.input}
          />
           {errors.weight && <p className={s.error}> {errors.weight}</p>}
          <br /><br />
          </div>
          <div className={s.selecttype}>
          <select onChange={(e)=>handleSelect(e)} className={t.types}>
            {types?.map((type) => (
              <option key={type.id} name={type.name} className={t.type} value={type.name}>{type.name}</option>
            ))}
             {errors.types && <p className={s.error}> {errors.types}</p>}
          </select>
         
          <ul className={s.list}>
            {
            pokemon?.types.map((name, index) => {
              return(
                <li key={index} onClick={()=> handleTypeDelete(name)}  className={s.types}>{name} </li>
              )
            })}
          </ul>
          </div>
          <Link to="/home">
          <button type="submit" className={s.bottom}>Atrás</button></Link>
          <button type="submit" className={s.bottom}>Crear</button>
          </div>
      </form>
    );
  }


  function validate(pokemon){
    let patron = new RegExp('^[ñíóáéú a-zA-Z ]+$')
    let errors = {};

    if(!pokemon.name) {
        errors.name = 'Se require un nombre';
    } 
    else if(!patron.test(pokemon.name)){
      errors.name = 'El nombre debe contener solo letras';
    }
    if(!pokemon.img) {
      errors.img = 'Image is required';
    }
    else if(!(/(https?:\/\/)?\.(jpg|png|gif)$/i).test(pokemon.img)) {
      errors.img = 'La url ingresada no es acertada'
    }
    if(!pokemon.life) {
      errors.life = 'Life is required';
    } else if(isNaN(pokemon.life)) {
      errors.life = 'solo se debe ingresar numbers'
    } else if(!/^([0-9]|[1-9][0-9]|100)$/.test(pokemon.life)){
      errors.life = 'La vida debe estar entre 1 y 100';
    } 
    if(!pokemon.attack) {
      errors.attack = 'Attack is required';
    } else if(isNaN(pokemon.attack)) {
      errors.attack = 'solo se debe ingresar numbers'
    } else if(!/^([0-9]|[1-9][0-9]|100)$/.test(pokemon.attack)){
      errors.attack = 'El ataque debe estar entre 1 y 100'
    }
    if(!pokemon.defense) {
      errors.defense = 'Defense id required';
    }else if(isNaN(pokemon.defense)) {
      errors.defense = 'solo se debe ingresar numbers'
    } else if(!/^([0-9]|[1-9][0-9]|100)$/.test(pokemon.defense)){
      errors.defense = 'La defensa debe estar en 1 y 100';
    }
    if(!pokemon.speed) {
      errors.speed = 'Speed is required';
    } else if(isNaN(pokemon.speed)) {
      errors.speed = 'solo se debe ingresar numbers'
    } else if(!/^([0-9]|[1-9][0-9]|100)$/.test(pokemon.speed)){
      errors.speed = 'La velocidad debe estar en 1 y 100';
    }
    if(!pokemon.height) {
      errors.height = 'Heigth is required';
    }else if(isNaN(pokemon.height)) {
      errors.height = 'solo se debe ingresar numbers'
    } else if(!/^([0-9]|[1-9][0-9]|100)$/.test(pokemon.height)){
      errors.height = 'La altura debe estar en 1 y 100';
    }
    if(!pokemon.weight) {
      errors.weight = 'Weight is required';
    }else if(isNaN(pokemon.weight)) {
      errors.weight = 'solo se debe ingresar numbers'
    } else if(!/^([0-9]|[1-9][0-9]|100)$/.test(pokemon.weight)){
      errors.weight = 'El peso debe estar en 1 y 100';
    }
    if(!pokemon.types || pokemon.types === 'null') {
      errors.types = 'Type can not be null'
    }
    return errors
  }