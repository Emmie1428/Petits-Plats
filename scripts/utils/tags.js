// tags.js
export function updateTags(ingredientFilter, applianceFilter, ustensilFilter, tagsContainer, applyFiltersAndSearch) {
    tagsContainer.innerHTML = '';

    const selectedIngredient = ingredientFilter.value;
    const selectedAppliance = applianceFilter.value;
    const selectedUstensil = ustensilFilter.value;

    if (selectedIngredient) {
        createTag(selectedIngredient, 'ingredient', tagsContainer, applyFiltersAndSearch);
    }
    if (selectedAppliance) {
        createTag(selectedAppliance, 'appliance', tagsContainer, applyFiltersAndSearch);
    }
    if (selectedUstensil) {
        createTag(selectedUstensil, 'ustensil', tagsContainer, applyFiltersAndSearch);
    }
}

function createTag(value, type, tagsContainer, applyFiltersAndSearch) {
    const tag = document.createElement('span');
    tag.textContent = value.charAt(0).toUpperCase() + value.slice(1);
    tag.classList.add('tag', 'bg-gray-200', 'rounded', 'p-2', 'text-sm', 'mr-2', 'mb-2', 'cursor-pointer');
    tag.dataset.type = type;
    tag.dataset.value = value;

    tag.addEventListener('click', () => {
        removeTag(tag, type, applyFiltersAndSearch);
    });

    tagsContainer.appendChild(tag);
}

function removeTag(tag, type, applyFiltersAndSearch) {
    if (type === 'ingredient') {
        ingredientFilter.value = '';
    } else if (type === 'appliance') {
        applianceFilter.value = '';
    } else if (type === 'ustensil') {
        ustensilFilter.value = '';
    }
    updateTags(ingredientFilter, applianceFilter, ustensilFilter, tagsContainer, applyFiltersAndSearch);
}
