const { Router } = require('express');
const { Recipe, Diet } = require('../db.js');
const axios = require('axios')
const {
  API_KEY
} = process.env

const { getAllRecipes } = require('../controllers/getAllRecipes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res) => {
  const { name } = req.query;
  let recipesTotal = await getAllRecipes();
  if (name) {
    let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())); // siempre buscar en minuscula para tener todos los datos iguales 
    recipeName.length ? // si encontraste algo aca
      res.status(200).send(recipeName) :
      res.status(404).send('The recipe was not found');
    // console.log(name)
  } else {
    res.status(200).send(recipesTotal);
  }

})

router.get('/recipes/:id', async (req, res) => {
  // const id = req.params.id;
  const {id} = req.params;
  const allRecipes = await getAllRecipes();
  if (id) {
    let recipesById = await allRecipes.filter(e => e.id == id);
    recipesById.length ?
      res.status(200).send(recipesById) :
      res.status(404).send('The ID you are looking for was not found.')

  }
})

router.get('/types', async (req, res) => {


  const allDiet = await Diet.findAll();
  if (allDiet.length === 0) {
    const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const diet = dietApi.data.results.map((el) => el.diets);
    const dietFlat = diet.flat();

    const dietsFiltered = dietFlat.filter((d, index) => {
      return dietFlat.indexOf(d) === index
    })

    await dietsFiltered.forEach((d) =>
      Diet.findOrCreate({
        where: { name: d },
      })
    );

    res.send(dietsFiltered);
  } else {
    res.json(allDiet);
  }
});

router.post('/recipes', async (req, res) => {
  let {
    // id,
    name,
    image,
    summary,
    puntuacion,
    nivelDeComidaSaludable,
    pasoAPaso,
    // createdInDb,
    diets
  } = req.body;

  if (name && summary) {
    let recipeCreated = await Recipe.create({
      // id,
      name: name,
      image: image,
      summary: summary,
      puntuacion: puntuacion,
      nivelDeComidaSaludable: nivelDeComidaSaludable,
      pasoAPaso: pasoAPaso
      // createdInDb: createdInDb
    })

    const dietDb = await Diet.findAll({
      where: { name: diets }
    })


    console.log(dietDb, "asdasdasd")
    recipeCreated.addDiet(dietDb)
    res.status(200).send('Receta creada con éxitos')
  } else {
    res.status(404).send("error")
  }
})

module.exports = router;



// query se pasa por URL
// body es lo que yo le voy a pasar para completar un post con info, en el front el body llega por un formulario 