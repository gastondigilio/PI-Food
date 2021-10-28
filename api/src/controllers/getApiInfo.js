const axios = require('axios');
const { API_KEY } = process.env;


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=82&addRecipeInformation=true&apiKey=${API_KEY}&includeNutrition=true`);

    const recetas = apiUrl.data.results

    // console.log(recetas, "recetas") // me trae un array con un objeto
    // console.log(recetas.analyzedInstructions[0].steps, "recetas") //en la posicion 0 de array hay un objeto que tiene la propiedad name y steps
    // steps es un array que contiene en sus diferentes posiciones un obejto con la propiedad step la cual es un string con un, dependiendo la cantidad de pasos el array puede tener mas de una posicion 

    const instructionsmaps1 = recetas.map(e => {
        return {
            instructions: e.analyzedInstructions[0]
        }
    })
    // console.log(instructionsmaps1, "instructions")
    // mapea en la posicion 0 del array los objetos, es decir que instructionsmaps1 va a contener un array con un objeto con la propiedad intructions con las propiedades name y steps
    //[{instructions{name:"", steps: []}}]
     

    const instructionsmaps2 = instructionsmaps1[0].instructions.steps.map(e => {
        return {
            paso: e.step
        }
    })

    // console.log(instructionsmaps2, "instructionsmaps2")

    // creamos un nuevo array que va a contener un objeto con la propiedad paso que este va a contener todos los arrays que haya en la propiedad steps
    //[{paso: ""}{paso: ""}{paso: ""}]


    // console.log(x, "asdasd")
     var x = instructionsmaps2.map(e => {
        return {
            x: Object.values(e)
        }
    })
    // console.log(x, "asjdkasd")
    var xx = []

    x.map(e => {
        xx.push(e.x)
    })

    // la variable xx es un arreglo que va a contener cada valor de los objetos con la propiedad x los cuales son strings

    var instrucciones = xx.flat().toString()

    // con el metodo flat convertimos el arreglo de arreglo a un solo arreglo con strings y con el toString lo convertimos el arreglo entero a string
    
    // console.log(instrucciones, "instrucciones")

    // console.log(xx, "asdasd")
    
    // la variable y va a contener un array con arrays de strings
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