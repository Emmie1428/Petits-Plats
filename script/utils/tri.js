import recipesTemplate from "/script/template/recipes.js";

let recipes = [];
let filteredRecipes = [];
let searchInput = [];


//Récupération du nom d'un ingrédient
function ingredientName(ingredient) {
    if(!ingredient) return "";
    return(typeof ingredient === "string" ? ingredient.toLowerCase() : ingredient.ingredient.toLowerCase());
}

//Fonction de recherche
export function search(recipes, searchInput) {
    const searchValue = normalize(searchInput);
        if (!searchValue || searchValue.length < 3) {
            return recipes;
        }
    return recipes.filter(recipe => {
        const name = normalize(recipe.name);
        const description = normalize(recipe.description);  
        const ingredients = recipe.ingredients.map(ingredient => ingredientName(ingredient)).join(" ");
 
        return name.includes(searchValue) || description.includes(searchValue) || ingredients.includes(searchValue);
    });
}

    filteredRecipes = search(recipes, searchInput);
    recipeDisplay(filteredRecipes);

//Normalisation
function normalize(str) {
    if (!str) return "";
    return String(str)
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
}


//Affichage des recettes
export function recipeDisplay(recipes) {
    const recipeContainer = document.querySelector(".recipe-container");
    if (!recipeContainer) return;
    recipeContainer.innerHTML = "";

    if (!recipes || recipes.length === 0) {
        recipeContainer.innerHTML = "<p>Aucune recette trouvée</p>";
        return;
    }

    recipes.forEach((recipe) => {
       const recipeModel = recipesTemplate(recipe);
       const recipeCardDOM = recipeModel.getRecipeCardDOM();    
       recipeContainer.appendChild(recipeCardDOM); 
    });
}


//Affichage des ingrédients
export function tagsDisplay(recipes) {
    const ul = document.querySelector(".ingredientsTags");
    ul.innerHTML = "";
    const ingredients = [...new Set(recipes.flatMap(recipe => 
        recipe.ingredients.map(ingredient => ingredientName(ingredient))
    ))];
    ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        li.addEventListener("click", () => {
            filteredRecipes = search(recipes, ingredient);
            recipeDisplay(filteredRecipes);
            tagsDisplay(filteredRecipes);
        });
        ul.appendChild(li);
    });
}

export function initTri() {
    const tagLists = document.querySelectorAll(".tagLists");

    tagLists.forEach(tagLists => {
        const currentOption = tagLists.querySelector("li");
        const otherOptions = tagLists.querySelectorAll("li:not(:first-child)");
        const menuDown = tagLists.querySelector(".menuDown");
        const menuUp = tagLists.querySelector(".menuUp");

    //Cache les autres options et affiche le menuDown
    menuDown.classList.remove("hidden");
    menuUp.classList.add("hidden");
    otherOptions.forEach((option) => option.classList.add("hidden"));

    //Gère l'ouverture et la fermeture du menu déroulant
    function toggleMenu() {
        const isOpen = !otherOptions[0].classList.contains("hidden");
        otherOptions.forEach(option => {
            option.classList.toggle("hidden", isOpen);
        });
        menuDown.classList.toggle("hidden", !isOpen);
        menuUp.classList.toggle("hidden", isOpen);
        currentOption.setAttribute("aria-expanded", String(!isOpen));
    }  

    //Ouverture et fermeture du menu déroulant au click
    currentOption.addEventListener("click", toggleMenu);

    //Ouverture et fermeture du menu déroulant avec enter
    currentOption.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); 
            toggleMenu();
        }
    });

    //Ferme le menu si perds le focus
    tagLists.addEventListener("focusout", () => {
        setTimeout(() => {
            if (!tagLists.contains(document.activeElement)) {
                otherOptions.forEach((option) => option.classList.add("hidden"));
                menuDown.classList.remove("hidden");
                menuUp.classList.add("hidden");
                currentOption.setAttribute("aria-expanded", "false");
            }
        }, 0);
    });
    });
};

