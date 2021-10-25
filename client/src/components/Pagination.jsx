import React from "react";
import styles from "../styles/pagination.module.css"

export default function Pagination ({recetasPorPagina, allRecipes, pagedNumber}){
    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(allRecipes/recetasPorPagina);i++){
        pageNumbers.push(i);
    }


    // console.log(allRecipes)
    return <div className={styles.paginationContainer}> 
        
            {pageNumbers && pageNumbers.map(number => (
                <div>
                    {/* <button key={number} onClick={() => pagedNumber(number)}>{number}</button> */}
                </div>
            ))}
        
    </div>
}




