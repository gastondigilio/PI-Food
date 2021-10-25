const axios = require('axios');
const { API_KEY } = process.env;


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}&includeNutrition=true`);

    const recetas = apiUrl.data.results

    const instructionsmaps1 = recetas.map(e => {
        return {
            instructions: e.analyzedInstructions[0]
        }
    })

    const instructionsmaps2 = instructionsmaps1[0].instructions.steps.map(e => {
        return {
            passos: e.step
        }
    })

    var x = instructionsmaps2.map(e => {
        return {
            pasos: e.passos
        }

    })
    x = x.map(e => {
        return {
            x: Object.values(e)
        }
    })
    var xx = []

    var y = x.map(e => {
        xx.push(e.x)
    })

    const apiInfo = apiUrl.data.results.map(e => {
        return {
            id: e.id,
            name: e.title,
            image: e.image,
            summary: e.summary ? e.summary.replace(/<[^>]*>?/gm, '') : '',
            puntuacion: e.spoonacularScore,
            nivelDeComidaSaludable: e.healthScore,
            pasoAPaso: xx.flat().toString(),
            dishTypes: e.dishTypes,
            diets: e.diets
        }
    });
    return apiInfo;
}

module.exports = {
    getApiInfo,
}