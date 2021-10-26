import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterByDiet, filterSortByName, sortByScore } from "../actions/index.js";
import { Link } from 'react-router-dom';
import Card from "./Card";
import NavBar from "./NavBar";
import styles from "../styles/home.module.css";


export default function Home() {
    const dispatch = useDispatch() //utilizar esta constante e ir despachando mis acciones
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]) // nos traemos del estado las recetas cuando el componente se monta

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])
    const allRecipes = useSelector((state) => state.recipes) // me declaro una const y le digo que con useSelector en esa const todo lo que esta en el estado de recipes, es para evitar utilizar mapStatesToProps y trabajar solo con esta const
    // console.log(allRecipes)
    const allDiets = useSelector((state) => state.diets);



    const [/*orden*/, setOrden] = useState('');
    console.log(allRecipes)

    const recipesPerPage = 9;


    const [currentPage, setCurrentPage] = useState(1);
    // const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLastRecipe = currentPage * recipesPerPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const recetasActuales = allRecipes.slice(indexFirstRecipe, indexLastRecipe);
    // console.log(recetasActuales)


    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(allRecipes.length /recipesPerPage);i++){
        pageNumbers.push(i);
    }
    console.log(pageNumbers, "buenass")



    function nextPage() {
        if(currentPage === pageNumbers.length){
            setCurrentPage(1)
            console.log("entro al console")
        }else{
            setCurrentPage(currentPage + 1)
        }
    }
    console.log(currentPage, "holasdasd")

    function previousPage() {
        if (currentPage > 0) {
            setCurrentPage(currentPage + 1)
        }
    }

    function handleClick(e) { //creo esta funcion para 
        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes()); //esta funcion me resetea cuando se me tilda y me que me mande todo devuelta 
    }

    function handleDiet(e) {
        dispatch(filterByDiet(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(filterSortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortByScore(e) {
        e.preventDefault();
        dispatch(sortByScore(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }


    return (
        <div className={styles.homeContainer}>
                <div className={styles.divNavBar}>
                    <ul className={styles.navBar}>
                        <li>
                            <button onClick={e => { handleClick(e) }} className={styles.allElements}>Home</button>
                        </li>
                        <li>
                            <Link to='/recipes'>
                                <button className={styles.allElements}>Create Recipe</button>
                            </Link>
                        </li>
                        <li className={styles.elements}>
                        <select on onChange={handleSortByName}>
                            <option value='default' className={styles.allElements} hidden>Sort recipes by name</option>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                             {/* siempre hay que ponerle un value porque me permite acceder y despues poder preguntar al select. si el value es ascendente hace esto, si es desc hace esto. por eso hay que pasarle si o si un value */}
                        </select>
                    </li>
                    <li className={styles.elements}>
                        <select onChange={handleSortByScore}>
                            <option value='default' className={styles.allElements} hidden>Sort recipes by value</option>
                            <option value='min'> Lower score</option>
                            <option value='max'> Higher score</option>
                        </select>
                    </li>
                    <li className={styles.elements}>
                        <select onChange={(e) => handleDiet(e)}>
                            <option value='all'>All recipes</option>
                            {
                            allDiets?.map(d => <option key={d.id} value={d.name}>{d.name}</option>)
                            }
                        </select>
                    </li>
                    <li>
                            <NavBar
                                setPage={setCurrentPage}
                            />
                    </li>
                    </ul>
                </div>
                <div className={styles.mainTitle}>
                <h1 className={styles.title}>Spoonacular</h1>
                </div>
                <div className={styles.btn}>
                <button onClick={previousPage} className={styles.previous}>Previous page</button>
                <button onClick={nextPage} className={styles.next}>Next page</button>
                </div>
                

               <div className={styles.container}>
                {recetasActuales?.map(el => {
                    return (
                        <div className={styles.cardHome}>
                            <Link to={'/detail/' + el.id} className={styles.cardText}>
                                <Card name={el.name} image={el.image} id={el.id} diets={el.diets} types={el.dishTypes} key={el.id} />
                            </Link>
                        </div>
                    )
                })
                }
                </div>

                <div className={styles.btn}>
                <button onClick={previousPage} className={styles.previous}>Previous page</button>
                <button onClick={nextPage} className={styles.next}>Next page</button>
                </div>
                <br></br>

                
                </div>
    )
}
