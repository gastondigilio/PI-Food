const {getApiInfo} = require('./getApiInfo');
const {getDbInfo} = require('./getDBInfo');


const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo).sort((a, b) => {
        return a.name < b.name ? -1 : 1; 
    }); // con el sort ordeno el array alfabeticamente 
    return infoTotal;
}

module.exports = {
    getAllRecipes
}