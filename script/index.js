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
        
        //Fait apparaître le x s'il y a du texte dans input
        input.addEventListener("input", function() {
            if (input.value.length > 0) {
                eraseInput.classList.remove("hidden")
            } else {
                eraseInput.classList.add("hidden");
            }
        });
        
        //Efface avec click sur le x
        eraseInput.addEventListener("click", function() {
            input.value= "";
            eraseInput.classList.add("hidden");
            input.focus();

            input.dispatchEvent(new Event("input"));
        });

        //Efface avec enter sur le x
        eraseInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                input.value= "";
                eraseInput.classList.add("hidden");
                input.focus();

                input.dispatchEvent(new Event("input"));
            }
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

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Initialisation princiaple
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

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Rafraichis les recettes selon les types de recherches
function updatedRecipes() {
    //Récupère la valeur de la recherche princiaple
    const mainSearchInput = document.querySelector(".mainSearch");
    const mainSearchValue = mainSearchInput ? mainSearchInput.value.trim() : ""; 

    //Récupère les tags visibles
    const visibleTags = Array.from(document.querySelectorAll(".tag")).map(tagElement => {
        return tagElement.textContent.replace("X", "").trim();
    });

    searchInput = [];
    
    //Recherche principale à partir de 3 caractères
    if (mainSearchValue.length >= 3) {
        searchInput.push({value: mainSearchValue, tag: false});
    }

    //Ajout des tags visibles
    visibleTags.forEach(tagValue => {
        if (tagValue) {
            searchInput.push({value: tagValue, tag: true});
        }
    });
    
    //Filtrage des recettes
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

