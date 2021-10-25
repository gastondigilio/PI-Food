import React from "react";
import { mayusculas } from './index.js'
import styles from "../styles/card.module.css";


export default function Card({ name, image, diets, id, types }) {



    return (
        <div className={styles.cardContainer}>
            <div className={styles.image}>
                <img src={image} alt={"no Se encontro la imagen"} />
            </div>
            <div className={styles.content}>
                <label className={styles.cardTitle}>{mayusculas(name)}</label>
                <div className={styles.infoCard}> 
                <h4 className={styles.diets}>Diet type</h4>
                <div className={styles.infoDiets}>
                {
                    Array.isArray(diets) ? diets.map(d => d.name ? <h5 >{d.name}</h5> : <h5>{d} </h5>) : ""
                }
                </div>

                <h4 className={styles.types}>Dish type</h4>
                <div className={styles.infoTypes}>
                {
                    Array.isArray(types) && (types.length > 1) ? types.map(d => d.name ? <label >{d.name}</label> : <label>{d} </label>) : <li className={styles.infoTypes2}>This recipe has not a dish type</li>
                }
                </div>
            </div>
            </div>
        </div>
    )
}
