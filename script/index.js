import {
    search,
    recipeDisplay,
    initTri,
    tagsDisplay,
    normalize
    } from "./utils/tri.js";

    let recipes = [];
    let filteredRecipes = [];
    let searchInput = [];   

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
    tagsDisplay(filteredRecipes);
    
    document.querySelector(".mainSearch").addEventListener("input", (e) => {
        const mainValue = e.target.value.trim();
        const currentTags = searchInput.filter(tag => normalize(tag) !== normalize(searchInput[0]));
        searchInput.length = 0;
        if (mainValue) searchInput.push(mainValue);
        searchInput.push(...currentTags);

        filteredRecipes = search(recipes, searchInput);
        recipeDisplay(filteredRecipes);
        tagsDisplay(filteredRecipes);
    });

   const ingredientSearchInput = document.querySelector(".searchInput");
    ingredientSearchInput.addEventListener("input", (e) => {
        const ingredientSearch = e.target.value.trim();
        filteredRecipes = search(recipes, searchInput);
        tagsDisplay(filteredRecipes, ingredientSearch);
    });

    initTri();
}

init();

