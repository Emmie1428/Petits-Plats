import recipesTemplate from "/script/template/recipes.js";

let recipes = [];
export let searchInput = [];

//Récupération du nom d'un ingrédient car dans tableau
function ingredientName(ingredient) {
    if(!ingredient) return "";
    return(typeof ingredient === "string" ? ingredient.toLowerCase() : ingredient.ingredient.toLowerCase());
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Normalisation majuscule, accent, espace
export function normalize(str) {
    if (!str) return "";
    return String(str)
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, ' ').trim()
}

//Canonicalisation gestion pluriel et doublons
export function canonicalize(str) {
    if (!str) return "";
    let word = normalize(str);

    if (word.endsWith("eaux")) word = word.slice(0, -1);
    else if (word.endsWith("aux")) word = word.slice(0, -3) + "al";
    else if (word.endsWith("s") && !word.endsWith("ss")) word = word.slice(0, -1);
    else if (word.endsWith("x")) word = word.slice(0, -1);

    return word;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Fonction de recherche
export function search(recipes, searchInput) {
    if (!Array.isArray(searchInput)) searchInput = [searchInput];
    
    
    const searchValue = searchInput.map(input => canonicalize(input))
    if (searchValue.length === 0) return recipes;

    return recipes.filter(recipe => {
        const name = canonicalize(recipe.name);
        const description = canonicalize(recipe.description);  
        const ingredients = recipe.ingredients.map(ingredient => canonicalize(ingredientName(ingredient))).join(" ");
        const appliance = canonicalize(recipe.appliance);
        const ustensils = recipe.ustensils.map(ustensil => canonicalize(ustensil)).join(" ");

        return searchValue.every(searchInput => 
            name.includes(searchInput) ||
            description.includes(searchInput) ||    
            ingredients.includes(searchInput) ||
            appliance.includes(searchInput) ||
            ustensils.includes(searchInput)
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
export function tagsDisplay(recipes, searchValue = "", updatedSearch, type = "ingredient") {
    let listType;
    let rawValue = [];

    switch (type) {
        case "ingredient": 
            listType = ".ingredientsTags";
            rawValue = recipes.flatMap(recipe =>
                recipe.ingredients.map(ingredient =>
                    typeof ingredient === "string" ? ingredient : ingredient.ingredient));
            break;
        case "appareil":
            listType = ".appareilsTags";
            rawValue = recipes.map(recipe =>
                 recipe.appliance);
            break;
        case "ustensil":    
            listType = ".ustensilsTags";
            rawValue = recipes.flatMap(recipe =>
                 recipe.ustensils);
            break;
    }
    
    //Supprime les doublons
    const originalTag = new Map();
    rawValue.forEach (value => {
        const tag = canonicalize(value);
        if (!originalTag.has(tag)) originalTag.set(tag,value);
    });

    let tagsValues = Array.from(originalTag.values()).filter(tag =>
        canonicalize(tag).includes(canonicalize(searchValue))
    );

    //Ordre alphabétque
    tagsValues.sort((a, b) => a.localeCompare(b));

    const ul = document.querySelector(listType);
    ul.innerHTML = "";

    tagsValues.forEach(tag => {
        if (!tag) return;
        const li = document.createElement("li");
        li.textContent = tag;

        li.addEventListener("click", () => {
            if (!searchInput.some(tag => canonicalize(tag) === canonicalize(tag))) {
                createTag(tag, updatedSearch);
                searchInput.push(tag);
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
export function createTag(value, updatedSearch) {
    const tagContainer = document.querySelector(".tagContainer");

    //Empêche doublons
    if (searchInput.some(tag =>
        canonicalize(tag) === canonicalize(value))
    ) return; 

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
        const index = searchInput.findIndex(tag => canonicalize(tag) === canonicalize(value));
        if (index > -1) searchInput.splice(index, 1);

        if (updatedSearch) updatedSearch();
        tag.remove();
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

    console.log("Tag ajouté :", tagContainer.innerHTML);
}