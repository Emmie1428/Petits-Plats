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
    tagsDisplay(filteredRecipes, "", updatedRecipes, "ingredient");
    tagsDisplay(filteredRecipes, "", updatedRecipes, "appareil");
    tagsDisplay(filteredRecipes, "", updatedRecipes, "ustensil");
    
    document.querySelector(".mainSearch").addEventListener("input", (e) => {
        const mainValue = e.target.value.trim();
        const currentTags = searchInput.filter(tag => normalize(tag) !== normalize(searchInput[0]));
        searchInput.length = 0;

        if (mainValue.length >=3) searchInput.push(mainValue);
        searchInput.push(...currentTags);

        updatedRecipes();
    });
    
    //Recherche ingrédients
    document.querySelector(".searchInputIngredient").addEventListener("input", (e) => {
        tagsDisplay(filteredRecipes, e.target.value.trim(), updatedRecipes, "ingredient");
    });
  
    //Recherche appareils
    document.querySelector(".searchInputAppareil").addEventListener("input", (e) => {
        tagsDisplay(filteredRecipes, e.target.value.trim(), updatedRecipes, "appareil");
    });

    //Recherche ustensils
    document.querySelector(".searchInputUstensil").addEventListener("input", (e) => {
        tagsDisplay(filteredRecipes, e.target.value.trim(), updatedRecipes, "ustensil");
    });

    initTri();
}


//Rafraichis les recettes selon les tags
function updatedRecipes() {
    if (searchInput.length > 0) {
        filteredRecipes = search(recipes, searchInput); 
    } else {
        filteredRecipes = recipes;
    }
    recipeDisplay(filteredRecipes);

    tagsDisplay(filteredRecipes, "", updatedRecipes, "ingredient");
    tagsDisplay(filteredRecipes, "", updatedRecipes, "appareil");
    tagsDisplay(filteredRecipes, "", updatedRecipes, "ustensil");
}

init();

