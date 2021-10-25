import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {getDetail, removeDetail} from '../actions/index.js';
import RecipeDetails from '../components/RecipeDetails';
import styles from "../styles/detail.module.css";


export default function Detail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(removeDetail())
        }
    }, [dispatch, id]);

    // useEffect(() => {
    //     dispatch(getDetail(props.match.params.id))
    // }, [props.match.params.id,dispatch])

    const detail = useSelector((state) => state.detail);


    // console.log(detail[0].diets)
    
    // console.log("Diets: ", detail.diets);

    function handle_button_home(e){
        e.preventDefault();
        dispatch(removeDetail());
        history.push('/home');
    }

    

    // const instructions = detail[0].pasoAPaso.map(instruction => {
    //     return instruction.steps.map(step => step.step)
    // }).flat()
    
    // console.log()
    return (
        <div className= {styles.mainContainer}>
            
            {
                Object.keys(detail).length > 0 ? 
                <div className= {styles.detailContainer}>
                    <div >
                        <img src={detail[0].image} alt={"imagen no encotrada"} className= {styles.img}  />
                    </div>
                    <div >
                        <li>
                        <RecipeDetails name="Id" data={detail[0].id}  />
                        </li>
                        <br></br>
                        <li><RecipeDetails name="Name" data={detail[0].name ? (detail[0].name) : detail[0].name} /></li>
                        <br></br>
                        <li><RecipeDetails name="Diets" data={ Array.isArray(detail[0].diets) ? detail[0].diets.map( d => d.name ? <li >{d.name}</li> : <li>{d} </li>) :  detail[0].diets} /></li>
                        <br></br>
                        <li><RecipeDetails name="Dish Types" data={detail[0].dishTypes ? detail[0].dishTypes.map( type => ((type) + ' - ')) : detail[0].dishTypes}/></li>
                        <br></br>
                        <li className={styles.summary}><RecipeDetails name="Summary" data={detail[0].summary} /></li>
                        <br></br>
                        <li><RecipeDetails name="Score" data={detail[0].puntuacion} /></li>
                        <br></br>
                        <li><RecipeDetails name="Health Score" data={detail[0].nivelDeComidaSaludable} /></li>
                        <br></br>
                        <li className={styles.summary}><RecipeDetails name="Instructions" data={detail[0].pasoAPaso} /></li>
                    </div>
                </div>
                : <p className={styles.loading}>Loading, please wait</p>
            }
        <button onClick={handle_button_home} className={styles.btn}>Home</button>
        <br></br>
        </div>
    )
}

