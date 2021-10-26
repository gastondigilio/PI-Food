const {getApiInfo} = require('./getApiInfo');
const {getDbInfo} = require('./getDBInfo');


const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    
    let recipes = dbInfo.map(e => {

        return {
            id: e.id,
            name: e.name,
            summary: e.summary,
            puntuacion: e.puntuacion,
            nivelDeComidaSaludable: e.nivelDeComidaSaludable,
            diets: e.diets.map(e => e.name),
            pasoAPaso: e.pasoAPaso,
            image: e.image
        }
    })


    const infoTotal = apiInfo.concat(recipes).sort((a, b) => {
        return a.name < b.name ? -1 : 1; 
    }); // con el sort ordeno el array alfabeticamente 
    return infoTotal;
}

module.exports = {
    getAllRecipes
}