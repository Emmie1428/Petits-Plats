export function updateTags(ingredientFilter, applianceFilter, ustensilFilter, tagsContainer, applyFiltersAndSearch) {
    tagsContainer.innerHTML = '';

    const selectedIngredient = ingredientFilter.value;
    const selectedAppliance = applianceFilter.value;
    const selectedUstensil = ustensilFilter.value;

    if (selectedIngredient) {
        createTag(selectedIngredient, 'ingredient', tagsContainer, ingredientFilter, applianceFilter, ustensilFilter, applyFiltersAndSearch);
    }
    if (selectedAppliance) {
        createTag(selectedAppliance, 'appliance', tagsContainer, ingredientFilter, applianceFilter, ustensilFilter, applyFiltersAndSearch);
    }
    if (selectedUstensil) {
        createTag(selectedUstensil, 'ustensil', tagsContainer, ingredientFilter, applianceFilter, ustensilFilter, applyFiltersAndSearch);
    }
}

function createTag(value, type, tagsContainer, ingredientFilter, applianceFilter, ustensilFilter, applyFiltersAndSearch) {
    const tag = document.createElement('span');
    tag.classList.add('tag-label', 'flex', 'items-center', 'rounded', 'p-2', 'text-sm', 'mr-2', 'mb-2');

    const tagText = document.createElement('span');
    tagText.textContent = value.charAt(0).toUpperCase() + value.slice(1);
    tagText.classList.add('mr-2');

    const removeIcon = document.createElement('span');
    removeIcon.textContent = 'x';
    removeIcon.classList.add('ml-2', 'cursor-pointer', 'remove-tag');
    
    // Ajoute l'écouteur pour le clic sur l'icône "x"
    removeIcon.addEventListener('click', () => {
        removeTag(tag, type, tagsContainer, ingredientFilter, applianceFilter, ustensilFilter, applyFiltersAndSearch);
    });

    tag.appendChild(tagText);
    tag.appendChild(removeIcon);
    tag.dataset.type = type;
    tag.dataset.value = value;

    tagsContainer.appendChild(tag);
}

function removeTag(tag, type, tagsContainer, ingredientFilter, applianceFilter, ustensilFilter, applyFiltersAndSearch) {
    // Suppression du tag
    tagsContainer.removeChild(tag);

    // Mise à jour du filtre correspondant
    if (type === 'ingredient') {
        ingredientFilter.value = '';
    } else if (type === 'appliance') {
        applianceFilter.value = '';
    } else if (type === 'ustensil') {
        ustensilFilter.value = '';
    }

    // Mise à jour des tags
    updateTags(ingredientFilter, applianceFilter, ustensilFilter, tagsContainer, applyFiltersAndSearch);

    // Appliquer les filtres et mettre à jour l'affichage des recettes
    applyFiltersAndSearch();  // <- Appel de la fonction pour mettre à jour les résultats
}
