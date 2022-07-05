import React from "react";
import s from'./loading.module.css'

export default function Loading() {
        return (
            <div className='loading'>
                <div className={s.loading}>
                     <h1>LOADING ...</h1>
                </div>
                <img src='https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif' alt='pokemon img'/>
            </div>
            )
}