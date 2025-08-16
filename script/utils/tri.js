import recipesTemplate from "/script/template/recipes.js";

//Récupération du nom d'un ingrédient
function ingredientName(ingredient) {
    if(!ingredient) return "";
    return(typeof ingredient === "string" ? ingredient.toLowerCase() : ingredient.ingredient.toLowerCase());
}

//Fonction de recherche
export function initSearch(inputSelector, data, filterLogic, searchDisplay) {
    const searchBox = document.querySelector(inputSelector);
    if (!searchBox) return;

    searchBox.addEventListener("input", (event) => {
        const searchValue = event.target.value.trim().toLowerCase();
        
        if (searchValue.length >= 3) {
            const filteredData = data.filter(item => filterLogic(item, searchValue));
            searchDisplay(filteredData.length > 0 ? filteredData : []);
        } else {
            searchDisplay(data);
        }
    });
} 

//Normalisation
function normalize(str) {
    return str
        ? str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
        : "";
}

//Recherche principale
export function mainSearchFilter(item, searchValue) {
    const search = normalize(searchValue);

    const ingredientsMatch = item.ingredients && item.ingredients.some(ingredient =>
         normalize(ingredient.ingredient).includes(search)
        );

        return normalize(item.name).includes(search) ||
               normalize(item.description).includes(search) ||
                ingredientsMatch;
            
}

//Recherche par ingrédient
export function ingredientFilter(item, searchValue) {
    const search = normalize(searchValue);
    return item.ingredients && item.ingredients.some(ingredient =>
        normalize(ingredientName(ingredient)).includes(search))
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
export function ingredientsDisplay(ingredients) {
    const ingredientList = document.querySelector(".ingredientList");
    if (!ingredientList) return;

    ingredientList.innerHTML = "";

    if (ingredients.length === 0) {
        ingredientList.innerHTML = "<p>Aucun résultat</p>";
        return;
    }

    ingredients.forEach((ingredient) => {
       const li = document.createElement("li");
       li.textContent = ingredient;
       ingredientList.appendChild(li); 
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
