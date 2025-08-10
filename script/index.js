import {
    initSearch,
    mainSearchFilter,
    recipeDisplay,
    ingredientsDisplay,
    initTri
    } from "./utils/tri.js";

let data = [];


//Récupération des recettes
async function getRecipe() {
    try {
        const response = await fetch("/recipes.json");
        const data = await response.json();
        return {recipes: data.recipes};
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
        return {recipes: [] };
    }
}



async function init() {
    const {recipes} = await getRecipe();
    recipeDisplay(recipes);

    data = {recipes};

    initSearch(".mainSearch", data.recipes, mainSearchFilter, recipeDisplay);
    initSearch(".ingredientsFilter .searchInput", data.recipes, ingredientFilter, ingredientsDisplay);

    initTri();
}   

init();

