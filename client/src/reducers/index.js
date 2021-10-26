const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload, //aca le digo que me mande todo lo que tiene la accion de recipes
                allRecipes: action.payload,

            }

        case 'GET_RECIPES_NAME':
            return {
                ...state,
                recipes: action.payload
            }

        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload
            }

        case "POST_RECIPE":
            return {
                ...state
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'REMOVE_DETAIL':
            return {
                ...state,
                detail: {}
            }

        case 'FILTER_BY_DIETS':
            let filDiets = state.allRecipes;
            console.log(filDiets, "antes")
            filDiets = filDiets.filter((d) => d.diets.includes(action.payload));
            console.log(filDiets, "whole30")
            return {
                ...state,
                recipes: action.payload === "all" ? state.allRecipes : filDiets,
            };


            

        // case 'FILTER_BY_DIETS':

        //     const filDiets = state.allRecipes;
        //     const dietsFiltered = action.payload === 'all' ? filDiets : filDiets.filter(e => {
        //         if(typeof(e.diets) === 'string') return e.diets.includes(action.payload);
        //         if(Array.isArray(e.diets)){
        //             let temps = e.diets.map(e => e.name);
        //             return temps.includes(action.payload);
        //         }
        //     // console.log(allRecipes, 'all recipes reducers')
        //         return true;
        //     });
        //     return{
        //         ...state,
        //         recipes: dietsFiltered
        //     }


        case 'SORT_BY_NAME':
            const sortedName = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedName
            }


        case "SORT_BY_SCORE":

            const filterScore = action.payload === 'min' ? state.recipes.sort((a, b) => {
                return a.puntuacion - b.puntuacion
            }) : state.recipes.sort((a, b) => {
                return b.puntuacion - a.puntuacion
            })
            return {
                ...state,
                recipes: action.payload === 'default' ? state.recipes : filterScore
            }
        default:
            return state;

    }


}

export default rootReducer;