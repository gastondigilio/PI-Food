import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {getRecipesName} from '../actions/index.js';
import styles from "../styles/navBar.module.css";


export default function NavBar({setPage}){
    const [input, setInput] = useState('');
    const dispatch = useDispatch();


    function handleOnChange(e){
        e.preventDefault();  
        setInput(e.target.value);
        console.log(input)
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getRecipesName(input))
        setInput('');
        setPage(1);
    }

    return(
        <div>
         <form onSubmit={handleOnSubmit}>
        <input type="text" 
        placeholder="Search Recipe" 
        value={input} 
        className={styles.navBar}
        onChange={handleOnChange} />
        <button type='submit' className={styles.searchButton}>Search</button>
    </form>
    </div>
    )
}

