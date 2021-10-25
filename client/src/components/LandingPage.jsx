import React from "react";
import {Link} from 'react-router-dom';
import styles from "../styles/landingPage.module.css";
// import logo from "../images/cooking.png";

export default function LandingPage(){
    return(
        <div className={styles.container}>
            <div className={styles.btnLanding}>
            <h1>Welcome to Spoonacular</h1>
            {/* <img src={logo} alt="logo" /> */}
            <Link to ='/home'>
                <button className={styles.btn}>Enter site web</button>
            </Link>
            </div>
        </div>
    )
}

