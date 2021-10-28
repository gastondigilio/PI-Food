import React from "react";
import {Link} from 'react-router-dom';
import styles from "../styles/landingPage.module.css";

export default function LandingPage(){
    return(
        <div className={styles.container}>
            <div className={styles.btnLanding}>
            <h1>Welcome to Spoonacular</h1>
            <Link to ='/home'>
                <button className={styles.btn}>Enter site web</button>
            </Link>
            </div>
        </div>
    )
}

