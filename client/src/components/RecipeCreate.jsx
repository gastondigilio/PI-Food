import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getDiets, postRecipe, getRecipes } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/recipeCreate.module.css";


export function validate(input) {
    let error = {};

    if (!input.name) {
        error.name = 'The name of the recipe is required';
    } else if (!/[a-zA-Z]{4}/.test(input.name)) {
        error.name = 'The name must have only letters and at least 4 characters';
    }
    if (!input.summary) {
        error.summary = 'The summary of the recipe is required';
    } else if (input.summary.length < 10 || input.summary.length > 500) {
        error.summary = 'The summary must have between 10 and 500 characters';
    }
    if (!input.puntuacion) {
        error.puntuacion = 'The score of the recipe is required';
    } else if (isNaN(input.puntuacion) || input.puntuacion < 0 || input.puntuacion > 100) {
        error.puntuacion = 'Must be a number between 0 and 100';
    }

    if (!input.nivelDeComidaSaludable) {
        error.nivelDeComidaSaludable = 'The health score of the recipe is required';
    } else if (isNaN(input.nivelDeComidaSaludable) || input.nivelDeComidaSaludable < 0 || input.nivelDeComidaSaludable > 100) {
        error.nivelDeComidaSaludable = 'Must be a number between 0 and 100';
    }

    if (!input.pasoAPaso) {
        error.pasoAPaso = 'The instructions of the recipe is required';
    } else if (input.pasoAPaso.length < 10) {
        error.pasoAPaso = 'The instructions must have more than 10 characters';
    }
    if (input.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        error.image = "Image must be a URL";
    }

    return error;
}

export default function RecipeCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allDiets = useSelector((state) => state.diets);
    const allRecipes = useSelector((state) => state.recipes);



    // console.log(allDiets);

    const [error, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        summary: '',
        puntuacion: '',
        nivelDeComidaSaludable: '',
        image: '',
        pasoAPaso: '',
        diets: []
    });

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    useEffect(() => {
        if (allRecipes.length === 0) {
            dispatch(getRecipes())
        }
    }, [dispatch, allRecipes.length]);

    const recipesName = allRecipes.map(el => el.name)

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

        // console.log(input);
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            diets: input.diets.includes(e.target.value) ? input.diets : [...input.diets, e.target.value]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.diets.length === 0) {
            alert('Please select at least one diets')
        } else if (input.name.length > 0) {
            let nameInput = input.name.toLowerCase();
            let result = recipesName.includes(nameInput)
            if (result) {
                alert("That name is in use")
                setInput({
                    name: '',
                    summary: '',
                    puntuacion: '',
                    nivelDeComidaSaludable: '',
                    image: '',
                    pasoAPaso: '',
                    diets: []
                })
            } else {
                dispatch(postRecipe(input))
                history.push('/home');
                alert(
                    'Recipe created successfully'
                );
                setInput({
                    name: '',
                    summary: '',
                    puntuacion: '',
                    nivelDeComidaSaludable: '',
                    image: '',
                    pasoAPaso: '',
                    diets: []
                });
            }
        }
    }


    function handleButtonType(e) {
        e.preventDefault();
        console.log("handleButtonType tiene..", e.target.value)
        setInput({
            ...input,
            //le seteo los mimos tipos menos lo que tengo en even target value
            diets: input.diets.filter(type => type !== e.target.value)
        });
    }
    function handleButtonHome(e){
        e.preventDefault();
        history.push('/home');
    }

    return (
        <div className={styles.mainContainer}>
            <form onSubmit={(e) => 
                (e)} className={styles.mainForm}>
                <h1 className={styles.mainTitle}>Create a New Recipe</h1>
                <div className={styles.formLabel}>
                    <label><strong>Name: </strong></label>
                    <input onChange={handleChange} type="text" name="name" required value={input.name} />
                    {error.name && <span className={styles.error}>{error.name}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}>
                    <label><strong>Summary: </strong> </label>
                    <textarea onChange={handleChange} type="text" name="summary" required value={input.summary} />
                    {error.summary && <span className={styles.error}>{error.summary}</span>}
                    <br></br>
                </div>
                <div className={styles.formLabel}> 
                    <label> <strong>Score: </strong></label>
                    <input onChange={handleChange} type="number" name="puntuacion" value={input.puntuacion} />
                    {error.puntuacion && <span className={styles.error}>{error.puntuacion}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}> 
                    <label ><strong>Health Score: </strong></label>
                    <input onChange={handleChange} type="number" name="nivelDeComidaSaludable" value={input.nivelDeComidaSaludable} />
                    {error.nivelDeComidaSaludable && <span className={styles.error}>{error.nivelDeComidaSaludable}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}> 
                    <label ><strong>Instructions:</strong> </label>
                    <textarea onChange={handleChange} type="text" name="pasoAPaso" value={input.pasoAPaso} />
                    {error.pasoAPaso && <span className={styles.error}>{error.pasoAPaso}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}>
                    <label> <strong>Diets: </strong></label>
                    <select onChange={handleSelect} >
                        {
                            allDiets && allDiets.map(el => (
                                <option key={el.id} value={el.name}>{el.name}</option>
                            ))
                        }
                    </select>
                    <div>
                        {
                            input.diets.map(type => (
                                <button onClick={handleButtonType} value={type} key={type} className={styles.removeBtn}> Remover {type}  </button>
                            ))
                        }
                        <br></br>
                    </div>
                    {error.diets && <span className={styles.error}>{error.diets}</span>}
                </div>
                <div className={styles.formLabel}>
                    <label> <strong>Image:  </strong></label>
                    <input onChange={handleChange} type="url" placeholder='https://example.com (Optional)' name="image" value={input.image} />
                    {error.image && <span className={styles.error}>{error.image}</span>}
                    <br></br>
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit} className={styles.formBtn} ><strong>Create </strong></button>
                    
                    
                </div>
            </form>
            <div>
            <button onClick={handleButtonHome} className={styles.btn}>Home</button>
            </div>
            <br></br>
        </div>
    );
}