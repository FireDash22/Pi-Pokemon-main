import { useState} from "react";
import { useDispatch } from "react-redux";
import { searchPokemons } from "../../redux/actions/action";
import s from './Search.module.css'

export default function Search() {
    const [search, setSearch] = useState('');
    const dispatch =  useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchPokemons(search))
    }
    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }
    return (
        <form className={s.form}>
            <input type="text" className={s.buscador} onChange={onInputChange} value={search} placeholder='Buscar Pokemon...'/>
            <button type='submit' className={s.buton} onClick={(e) => handleSubmit(e)}> Buscar </button>
        </form>
    )
}