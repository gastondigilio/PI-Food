import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDetail, removeDetail } from '../actions/index.js';
import RecipeDetails from '../components/RecipeDetails';
import styles from "../styles/detail.module.css";


export default function Detail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const detail = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]);
    
    function handleButtonHome(e) {
        e.preventDefault();
        dispatch(removeDetail());
        history.push('/home');
    }

    return (
        <div className={styles.mainContainer}>

            {
                Object.keys(detail).length > 0 ?
                    <div className={styles.detailContainer}>
                        <div >
                            <img src={detail[0].image} alt={"imagen no encotrada"} className={styles.img} />
                        </div>
                        <div >
                            <RecipeDetails name="Id" data={detail[0].id} />

                            <br></br>
                            <RecipeDetails name="Name" data={detail[0].name ? (detail[0].name) : detail[0].name} />
                            <br></br>
                            <RecipeDetails name="Diets" data={Array.isArray(detail[0].diets) ? detail[0].diets.map(d => d.name ? <li >{d.name}</li> : <li key={d}>{d} </li>) : detail[0].diets} />
                            <br></br>
                            <RecipeDetails name="Dish Types" data={detail[0].dishTypes ? detail[0].dishTypes.map(type => ((type) + ' - ')) : detail[0].dishTypes} />
                            <br></br>
                            <RecipeDetails name="Summary" data={detail[0].summary} />
                            <br></br>
                            <RecipeDetails name="Score" data={detail[0].puntuacion} />
                            <br></br>
                            <RecipeDetails name="Health Score" data={detail[0].nivelDeComidaSaludable} />
                            <br></br>
                            <RecipeDetails name="Instructions" data={detail[0].pasoAPaso} />

                        </div>
                    </div>
                    : <p className={styles.loading}>Loading, please wait</p>
            }
            <button onClick={handleButtonHome} className={styles.btn}>Home</button>
            <br></br>
        </div>
    )
}

