import {
    initSearch,
    mainSearchFilter,
    ingredientFilter,
    recipeDisplay,
    ingredientsDisplay,
    initTri
    } from "./utils/tri.js";

//Récupération des recettes
async function getRecipe() {
    try {
        const response = await fetch("/recipes.json");
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
        return [] ;
    }
}


async function init() {
    const recipes = await getRecipe();
    recipeDisplay(recipes);

    const data = recipes;

    initSearch(".mainSearch", data, mainSearchFilter, recipeDisplay);
    initSearch(".ingredientsFilter .searchInput", data, ingredientFilter, ingredientsDisplay);

    initTri();
}   

init();

