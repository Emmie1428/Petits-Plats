import {
    search,
    recipeDisplay,
    initTri,
    tagsDisplay,
    normalize,
    createTag
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
        return [] ;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Gestion du x pour effacer le contenu des inputs de recherche
function eraseSearch () {
    const allSearchInputs = document.querySelectorAll(".search");
    
    allSearchInputs.forEach(function (input) {
        const eraseInput = input.parentElement.querySelector(".fa-xmark")
        
        input.addEventListener("input", function() {
            if (input.value.length > 0) {
                eraseInput.classList.remove("hidden")
            } else {
                eraseInput.classList.add("hidden");
            }
        });
    
        eraseInput.addEventListener("click", function() {
            input.value= "";
            eraseInput.classList.add("hidden");

            input.dispatchEvent(new Event("input"));
        });

    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Compteur de recettes
function recipeCounter(recipes) {
    const countDisplay = document.querySelector(".recipeCount");
    const recipeNumber = recipes.length;

    if (recipeNumber ===  0) {
        countDisplay.innerHTML = "0 recette";
    } else if (recipeNumber === 1) {
        countDisplay.innerHTML = "1 recette";
    } else {
        countDisplay.textContent = `${recipeNumber} recettes`;    
    }
}


async function init() {
    recipes = await getRecipe();
    filteredRecipes = recipes;
    recipeDisplay(filteredRecipes);
    tagsDisplay(filteredRecipes, "", updatedRecipes, "ingredient", searchInput);
    tagsDisplay(filteredRecipes, "", updatedRecipes, "appareil", searchInput);
    tagsDisplay(filteredRecipes, "", updatedRecipes, "ustensil", searchInput);
    
    eraseSearch (); 
    recipeCounter(filteredRecipes); 

    //Recherche principale
    document.querySelector(".mainSearch").addEventListener("input", (e) => {
        updatedRecipes();
    });
    
    //Recherche ingrédients
    document.querySelector(".searchInputIngredient").addEventListener("input", (e) => {
        tagsDisplay(filteredRecipes, e.target.value.trim(), updatedRecipes, "ingredient", searchInput);
    });
  
    //Recherche appareils
    document.querySelector(".searchInputAppareil").addEventListener("input", (e) => {
        tagsDisplay(filteredRecipes, e.target.value.trim(), updatedRecipes, "appareil", searchInput);
    });

    //Recherche ustensils
    document.querySelector(".searchInputUstensil").addEventListener("input", (e) => {
        tagsDisplay(filteredRecipes, e.target.value.trim(), updatedRecipes, "ustensil", searchInput);
    });

    initTri();
}


//Rafraichis les recettes selon les types de recherches
function updatedRecipes() {
    const mainSearchInput = document.querySelector(".mainSearch");
    const mainSearchValue = mainSearchInput ? mainSearchInput.value.trim() : ""; 

    const visibleTags = Array.from(document.querySelectorAll(".tag")).map(tagElement => {
        return tagElement.textContent.replace("X", "").trim();
    });

    searchInput = [];
    
    if (mainSearchValue.length >= 3) {
        searchInput.push({value: mainSearchValue, tag: false});
    }

    visibleTags.forEach(tagValue => {
        if (tagValue) {
            searchInput.push({value: tagValue, tag: true});
        }
    });
    
    if (searchInput.length > 0) {
        filteredRecipes = search(recipes, searchInput); 
    } else {
        filteredRecipes = recipes;
    }
    
    recipeDisplay(filteredRecipes);

    tagsDisplay(filteredRecipes, "", updatedRecipes, "ingredient", searchInput);
    tagsDisplay(filteredRecipes, "", updatedRecipes, "appareil", searchInput);
    tagsDisplay(filteredRecipes, "", updatedRecipes, "ustensil", searchInput);

    recipeCounter(filteredRecipes); 

}

init();

