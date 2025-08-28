import recipesTemplate from "/script/template/recipes.js";

let recipes = [];

//Récupération du nom d'un ingrédient car dans tableau
function ingredientName(ingredient) {
    if(!ingredient) return "";
    return(typeof ingredient === "string" ? ingredient.toLowerCase() : ingredient.ingredient.toLowerCase());
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
//Fonction de recherche
export function search(recipes, searchInput) {
    if (!Array.isArray(searchInput)) searchInput = [searchInput];
    
    
    const searchValue = searchInput.map((input) => normalize(input.value));
    if (searchValue.length === 0) return recipes;

    return recipes.filter((recipe) => {
        const name = normalize(recipe.name);
        const description = normalize(recipe.description);  
        const ingredients = recipe.ingredients.map(ingredient => ingredientName(ingredient)).join(" ");
        const appliance = normalize(recipe.appliance);
        const ustensils = recipe.ustensils.map(ustensil => normalize(ustensil)).join(" ");

        return searchValue.every(inputValue => 
            name.includes(inputValue) ||
            description.includes(inputValue) ||    
            ingredients.includes(inputValue) ||
            appliance.includes(inputValue) ||
            ustensils.includes(inputValue)
            );
    });
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////////////////////////////////////////////////////
//Affichage des ingrédients, appareils et ustensiles
export function tagsDisplay(recipes, searchValue = "", updatedSearch, type = "ingredient", searchInput) {
    let listType;
    let rawValue = [];

    switch (type) {
        case "ingredient": 
            listType = ".ingredientsTags";
            tagValue = recipes.flatMap(recipe =>
                recipe.ingredients.map(ingredient =>
                    typeof ingredient === "string" ? ingredient : ingredient.ingredient));
                    typeof ingredient === "string" ? ingredient : ingredient.ingredient));
            break;
        case "appareil":
            listType = ".appareilsTags";
            tagValue = recipes.map(recipe =>
                 recipe.appliance);
            break;
        case "ustensil":    
            listType = ".ustensilsTags";
            tagValue = recipes.flatMap(recipe =>
                 recipe.ustensils);
            break;
    }

    tagValue = tagValue
        .filter(tag => tag)
        .filter((tag, index, array) => {
            return array.findIndex(tagValue => normalize(tagValue) === normalize(tag)) === index;
        })
        .filter(tag => normalize(tag).includes(normalize(searchValue)));

    //Ordre alphabétque
    tagsValues.sort((a, b) => a.localeCompare(b));

    const ul = document.querySelector(listType);
    ul.innerHTML = "";

    tagsValues.forEach(tag => {
        if (!tag) return;
        const li = document.createElement("li");
        li.textContent = tag;

        li.addEventListener("click", () => {
            if (!searchInput.some((item) => normalize(item.value) === normalize(tag) && item.tag === true)) {
                createTag(tag, updatedSearch, searchInput);
                searchInput.push({value: tag, tag: true});
                
                if (updatedSearch) updatedSearch();
            }   
        });
        ul.appendChild(li);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Initialisation liste déroulante
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


/////////////////////////////////////////////////////////////////////////////////////////////////////
//Création du tag
export function createTag(value, updatedSearch, searchInput) {
    const tagContainer = document.querySelector(".tagContainer");
    if (!tagContainer) return;

    //Empêche doublons
    if (searchInput.some((item) => normalize(item.value) === normalize(value) && item.tag === true)) {
       return; 
    }

    //Création tag
    const tag = document.createElement("div");
    tag.textContent = value;
    tag.classList.add("tag");

    //Ajout icone fermeture
    const closeIcon = document.createElement("span");
    closeIcon.innerHTML = "X";
    closeIcon.classList.add("closeIcon");
    closeIcon.setAttribute("role", "button");
    closeIcon.setAttribute("tabindex", "0");
    closeIcon.setAttribute("aria-label", "Supprimer le filtre");

    //Fonction pour supprimer le tag
    function removeTag() {
        tag.remove();

        if (updatedSearch) {
            updatedSearch();
        }
}

    //Gestion fermeture tag clic et clavier
    closeIcon.addEventListener("click", removeTag);
    closeIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            removeTag();
        }
    });
    
    tag.appendChild(closeIcon);
    tagContainer.appendChild(tag);
}