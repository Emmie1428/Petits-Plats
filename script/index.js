import {
    search,
    recipeDisplay,
    initTri,
    tagsDisplay,
    normalize,
    searchInput
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
    tagsDisplay(filteredRecipes, "", updatedRecipes);
    
    document.querySelector(".mainSearch").addEventListener("input", (e) => {
        const mainValue = e.target.value.trim();
        const currentTags = searchInput.filter(tag => normalize(tag) !== normalize(searchInput[0]));
        searchInput.length = 0;

        if (mainValue.length >=3) searchInput.push(mainValue);
        searchInput.push(...currentTags);

        updatedRecipes();
    });
    
    //Recherche ingrédients
   const ingredientSearchInput = document.querySelector(".searchInput");
    ingredientSearchInput.addEventListener("input", (e) => {
        const ingredientSearch = e.target.value.trim();
        tagsDisplay(filteredRecipes, ingredientSearch, updatedRecipes);
    });

    initTri();
}

function updatedRecipes() {
    if (searchInput.length > 0) {
        filteredRecipes = search(recipes, searchInput); 
    } else {
        filteredRecipes = recipes;
    }
    recipeDisplay(filteredRecipes);
    tagsDisplay(filteredRecipes, "", updatedRecipes);
}

init();

