import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPokemonDetail, getDetail } from "../../redux/actions/action.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import Error404 from '../Error404/Error404.jsx'
import Loading from "../Loading/Loading.jsx";
import s from './Detail.module.css'

export default function Detail(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pokemonsDetail = useSelector((state) => state.details);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
    return() => {
      dispatch(clearPokemonDetail())
    }
  },[dispatch, id]);
  
              if(pokemonsDetail === null){
               return(
                <div>
                    <div className="volver">
                    <Link to="/home" className={s.home}> Volver </Link> 
                    </div>
                    <div>
                      <h2 className={s.sub_title}>ERROR: LOS DATOS Y EL POKEMON NO EXISTEN</h2>
                      <img src="https://pa1.narvii.com/6197/61282392eda6add231e0559037e207cbd3c299f7_hq.gif" alt="" />
                    </div>
                </div>
               )
              } else if(pokemonsDetail === undefined){
                return( 
                <Loading/>
                )
              } else { 
                return (
                  <div className={s.fondo}>
                    <div className="volver">
                    <Link to="/home" className={s.home}> Volver </Link> 
                    </div>
                    <div className={s.text}>
                        {
                            pokemonsDetail?.map((p) =>( 
                                  <div className={s.PokemonCard}>
                                      <div className={s.title}>
                                      <h1>Details of the Pokemon</h1>
                                      </div>
                                  <div className={s.Contenido}>
                                      <div className={s.img}>
                                          <h3 className={s.NameID}>ID: {p.id}</h3>
                                        <img src={p.img} alt="" width='250' height='250' />
                                        <h3 className={s.NameID}>Name: {p.name}</h3>
                                      </div>

                                      <div className={s.Details}> 
                                          <h4 className={s.Detail}>HP: {p.life}</h4>
                                          <h4 className={s.Detail}>Attack: {p.attack}</h4>
                                          <h4 className={s.Detail}>Defense: {p.defense}</h4>
                                          <h4 className={s.Detail}>Speed: {p.speed}</h4>
                                          <h4 className={s.Detail}>Heigth: {p.height}</h4>
                                          <h4 className={s.Detail}>Weight: {p.weight}</h4>
                                          <h4 className={s.Detail}>Types: {p.types?.reduce((acumulador,element) => {return(acumulador + '  ' +element )},'')}</h4>
                                       </div>  
                                      <div>
                                      </div>
                                  </div>
                                  </div>
                                
                            ))  
                        }
                    </div>
                  </div>
                )
         }
}