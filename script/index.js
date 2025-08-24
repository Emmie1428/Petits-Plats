import {
    search,
    recipeDisplay,
    initTri
    } from "./utils/tri.js";

    let recipes = [];
    let filteredRecipes = [];

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
    recipes = await getRecipe();
    filteredRecipes = recipes;
    recipeDisplay(filteredRecipes);

   const searchInput = document.querySelector(".mainSearch");
   searchInput.addEventListener("input", (e) => {
       const searchValue = e.target.value.trim();
        filteredRecipes = search(recipes, searchValue);
        recipeDisplay(filteredRecipes);
   });

    initTri();
}   

init();

