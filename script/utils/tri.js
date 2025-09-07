import recipesTemplate from "/script/template/recipes.js";

let recipes = [];

//Récupération du nom d'un ingrédient car dans tableau
function ingredientName(ingredient) {
    if(!ingredient) return "";
    return(typeof ingredient === "string" ? ingredient.toLowerCase() : ingredient.ingredient.toLowerCase());
}

//Normalisation majuscule, accent, espace
export function normalize(str) {
    if (!str) return "";
    return String(str)
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, ' ').trim()
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Fonction de recherche
export function search(recipes, searchInput) {
    if (!Array.isArray(searchInput)) searchInput = [searchInput];
    
    //Affiche toutes les recettes au départ
    const searchValue = searchInput.map((input) => normalize(input.value));
    if (searchValue.length === 0) return recipes;

    //Filre les recettes
    return recipes.filter((recipe) => {
        const name = normalize(recipe.name);
        const description = normalize(recipe.description);  
        const ingredients = recipe.ingredients.map(ingredient => ingredientName(ingredient)).join(" ");
        const appliance = normalize(recipe.appliance);
        const ustensils = recipe.ustensils.map(ustensil => normalize(ustensil)).join(" ");

        //Retourne les recettes correspondantes aux critères de recherche
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

    //Message si aucune recette ne correspond
    if (!recipes || recipes.length === 0) {
        recipeContainer.innerHTML = "<p>Aucune recette ne convient à votre recherche. Essayez «tarte aux pommes», «poisson», etc.</p>";
        return;
    }

    //Affichage des recettes
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
    let tagValue = [];

    //Récupération des valeurs selon le type recherche
    switch (type) {
        case "ingredient": 
            listType = ".ingredientsTags";
            tagValue = recipes.flatMap(recipe =>
                recipe.ingredients.map(ingredient =>
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
                recipe.ustensils.map(ustensil => 
                ustensil.charAt(0).toUpperCase() + ustensil.slice(1)));
            break;
    }

    //Récupère les tags actifs
    const currentTags= searchInput
        .filter(item => item.tag === true)
        .map(item => normalize(item.value));

    //Évite les valeurs vides, les doublons, normalize et exclus les tags actifs
    tagValue = tagValue
        .filter(tag => tag)
        .filter((tag, index, array) => {
            return array.findIndex(tagValue => normalize(tagValue) === normalize(tag)) === index;
        })
        .filter(tag => normalize(tag).includes(normalize(searchValue)))
        .filter(tag => !currentTags.includes(normalize(tag)));

    //Ordre alphabétque
    tagValue.sort((a, b) => a.localeCompare(b));

    const ul = document.querySelector(listType);
    ul.innerHTML = "";

    //Message erreur si aucune correspondance, sinon crée les li
    if (tagValue.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Aucune correspondance";
        li.classList.add("error-message");
        ul.appendChild(li);
    } else {
        tagValue.forEach(tag => {
            if (!tag) return;
            const li = document.createElement("li");
            li.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
            li.setAttribute("tabindex", "0");

            //Recherche lancé avec click
            li.addEventListener("click", () => {
                if (!searchInput.some((item) => normalize(item.value) === normalize(tag) && item.tag === true)) {
                    createTag(tag, updatedSearch, searchInput);
                    searchInput.push({value: tag, tag: true});
                    
                    if (updatedSearch) updatedSearch();
                }   
            });

            //Recherche lancé avec Enter
            li.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    if (!searchInput.some((item) => normalize(item.value) === normalize(tag) && item.tag === true)) {
                    createTag(tag, updatedSearch, searchInput);
                    searchInput.push({value: tag, tag: true});
                    
                    if (updatedSearch) updatedSearch();
                    } 
                }    
            });

        ul.appendChild(li);
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Mécanique liste déroulante
export function listDisplay() {
    const tagLists = document.querySelectorAll(".tagLists");

    tagLists.forEach(tagLists => {
        const currentOption = tagLists.querySelector("li");
        const otherOptions = tagLists.querySelectorAll("li:not(:first-child):not(.error-message)");
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
    const closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
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


