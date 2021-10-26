import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getRecipesName(name) {
    return async function (dispatch) {
        try {
            let recipes = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload: recipes.data
            })
        } catch (error) {
            console.log(alert('The recipe you are looking for was not found'));
        }
    }
}

export const getDiets = () => {
    return async (dispatch) => {
        try{
            const {data} = await axios.get('http://localhost:3001/types')
            console.log(data, "get diets")
            return dispatch({
                type : 'GET_DIETS',
                payload : data
            })
        }catch(err){
            console.error(err);
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        
        const response = await axios.post("http://localhost:3001/recipes", payload);
        return dispatch({type: 'POST_RECIPE', payload: response.data});
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try{
            const {data} = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: data
            })
        } catch (err) {
            alert('The ID you are looking for was not found');
        }
    }
}

export const removeDetail = (payload) => {
    return {
        type: 'REMOVE_DETAIL',
        payload
    }
}

export const filterByDiet = (payload) => {
    console.log(payload)
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}

export const filterSortByName = (payload) => {
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}

export const sortByScore = (payload) => {
    return {
        type: 'SORT_BY_SCORE',
        payload
    }
}