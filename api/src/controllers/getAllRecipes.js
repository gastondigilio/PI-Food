const {getApiInfo} = require('./getApiInfo');
const {getDbInfo} = require('./getDBInfo');


const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    
    let recipes = dbInfo.map(e => {
        let diet = e.diets.map(e => e.name);
        return {
            id: e.id,
            name: e.name,
            summary: e.summary,
            puntuacion: e.puntuacion,
            nivelDeComidaSaludable: e.nivelDeComidaSaludable,
            diets: diet,
            pasoAPaso: e.pasoAPaso,
            image: e.image
        }
    })

    // mapeamos la propiedad name del objeto y nos quedo un arreglo con strings ya que nos traia un arreeglo con objetos y nosotros queriamos que sea solamente un arreglo 


    const infoTotal = apiInfo.concat(recipes).sort((a, b) => {
        return a.name < b.name ? -1 : 1; 
    }); // con el sort ordeno el array alfabeticamente 
    return infoTotal;
}

module.exports = {
    getAllRecipes
}