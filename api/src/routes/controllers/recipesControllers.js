const axios = require("axios");
const { Recipe, Diets } = require("../../db.js");
require("dotenv").config();
const { API_KEY } = process.env;

const searchAPI = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const apiInfo = await apiUrl.data.results?.map((ele) => {
      return {
        id: ele.id,
        name: ele.title,
        summary: ele.summary,
        healthScore: ele.healthScore,
        image: ele.image,
        dishTypes: ele.dishTypes,
        diets: ele.diets?.map((element) => element),
        steps: ele.analyzedInstructions[0]?.steps
          .map((ele) => `${ele.number}) ${ele.step}`)
          .join(""),
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
//DATABASE
const searchDb = async () => {
  try {
    const buscarDB = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let obj = await buscarDB?.map((element) => {
      return {
        id: element.id,
        name: element.name,
        summary: element.summary,
        healthScore: element.healthScore,
        image: element.image,
        steps: element.steps,
        diets: element.diets?.map((diet) => diet.name),
      };
    });
    return obj;
  } catch (error) {
    console.error(error);
  }
};
const getAll = async () => {
  try {
    const objApi = await searchAPI();
    const objBase = await searchDb();
    const allApiDb = await objApi.concat(objBase);
    return allApiDb;
  } catch (error) {
    return error;
  }
};
const postRecipe = async (objRecipe) => {
  try {
    const { name, summary, healthScore, steps, image, diets } = objRecipe;
    const recipe = {
      name,
      summary,
      healthScore,
      steps,
      image,
    };

    const dietInfo = await Diets.findAll({
      where: {
        name: diets,
      },
    });
    const createRecipe = await Recipe.create(recipe);

    createRecipe.addDiets(dietInfo);

    return Recipe.findAll();
  } catch (error) {
    console.log(error);
  }
};
const rece = async (name) => {
  try {
    if (name) {
      const buscareceta = await getAll();
      const resultado = await buscareceta.filter(
        (ele) => ele.name.toLowerCase().includes(name.toLowerCase()) === true
      );
      if (resultado.length) return resultado;
    } else {
      const todas = await getAll();

      return todas;
    }

    throw "No tenemos datos sobre esta receta";
  } catch (error) {
    console.log(error);
  }
};
const getByID = async (idReceta) => {
  try {
    const buscareceta = await getAll();
    const receta = buscareceta.find((ele) => ele.id == idReceta);
    if (receta) {
      return receta;
    } else {
      throw "Ups, no tenemos una receta con ese id";
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { rece, getAll, getByID, postRecipe };
