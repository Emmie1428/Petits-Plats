//Récupération des recettes
async function getRecipes() {
    try {
        const response = await fetch("./data/recipes.json");
        const data = await response.json();
        console.log("Données récupérées:", data);
        return { recipes: data.recipes };
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
        return { recipes: [] };
    }
}

//Affichage des recettes
async function displayRecipes(recipes) {
    const recipesSection = document.querySelector(".recipes_section");

    recipes.forEach((recipe) => {
        const recipeModel = recipesTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

async function init() {
    const { recipes } = await getRecipes();
    displayRecipes(recipes);
}   

init(); 