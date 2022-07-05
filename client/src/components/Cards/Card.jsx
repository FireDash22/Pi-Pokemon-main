import s from './Card.module.css'

export default function Card({name, img, types, attack, defense}) {
    return(
        <div className={s.Card}>
            <div className={s.Informacion}>
                <span className={s.attack}>Attack: {attack}</span>
                <span className={s.defense}>Defense: {defense}</span>
            </div>
            <div>
            <img src={img} alt="img-de-pokemon" width='200px' height='250px'/>
            </div>
            <div className={s.Text} >
                <hr />
            <p className={s.Text2}>Nombre: {name}</p>
            <p className={s.type}>Tipo: {types}</p>
            </div>
        </div>
    )
}