import recipesTemplate from "/script/template/recipes.js";

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

//Affichage des recettes
async function displayRecipe(recipes) {
    const recipeSection = document.querySelector(".recipe_section");
    
    recipes.forEach((recipe) => {
       const recipeModel = recipesTemplate(recipe);
       const recipeCardDOM = recipeModel.getRecipeCardDOM();    
       recipeSection.appendChild(recipeCardDOM); 
    });
}

async function init() {
    const {recipes} = await getRecipe();
    displayRecipe(recipes);
}   

init(); 

export default displayRecipe