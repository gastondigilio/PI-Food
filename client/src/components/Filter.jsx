import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDiets, filterByDiet} from '../actions/index.js';
import {mayusculas} from './index.js';

// import styles from './filter.module.css';

function Filter({set_page}) {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getDiets())
    }, [dispatch]);

    const allDiets = useSelector((state) => state.diets);

    console.log(allDiets)

    function handle_filter_type(e){
        e.preventDefault();
        dispatch(filterByDiet(e.target.value));
        set_page(1);
    }

    return (
        <div >
            <div>
                <label >Filtrar por Tipo </label>
                <select onChange={handle_filter_type}>
                    <option value="All">All</option>
                        {
                            allDiets.map( type => (
                                <option value={type} key={type}>type</option>
                            ))
                        }
                </select>
            </div>
        </div>
    )
}

export default Filter;