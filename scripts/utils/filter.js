// filter.js

export function applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes) {
    if (!allRecipes || !searchInput || !ingredientFilter || !applianceFilter || !ustensilFilter || !updateFilters || !displayRecipes) {
        console.error('One or more arguments are missing in applyFiltersAndSearch');
        return;
    }

    const searchQuery = searchInput.value.toLowerCase();
    const selectedIngredient = ingredientFilter.value.toLowerCase();
    const selectedAppliance = applianceFilter.value.toLowerCase();
    const selectedUstensil = ustensilFilter.value.toLowerCase();

    const filteredRecipes = allRecipes.filter(recipe => {
        const matchesSearch = searchQuery 
            ? recipe.name.toLowerCase().includes(searchQuery) || 
              recipe.description.toLowerCase().includes(searchQuery) || 
              recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchQuery))
            : true;

        const matchesIngredient = selectedIngredient 
            ? recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient)) 
            : true;

        const matchesAppliance = selectedAppliance 
            ? recipe.appliance.toLowerCase() === selectedAppliance 
            : true;

        const matchesUstensil = selectedUstensil 
            ? recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedUstensil)) 
            : true;

        return matchesSearch && matchesIngredient && matchesAppliance && matchesUstensil;
    });

    updateFilters(filteredRecipes, ingredientFilter, applianceFilter, ustensilFilter);
    displayRecipes(filteredRecipes);
}

export function updateFilters(filteredRecipes, ingredientFilter, applianceFilter, ustensilFilter) {
    if (!filteredRecipes || !ingredientFilter || !applianceFilter || !ustensilFilter) {
        console.error('One or more arguments are missing in updateFilters');
        return;
    }

    const ingredientSet = new Set();
    const applianceSet = new Set();
    const ustensilSet = new Set();

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientSet.add(ingredient.ingredient.toLowerCase()));
        applianceSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ustensil => ustensilSet.add(ustensil.toLowerCase()));
    });

    populateDropdown(ingredientFilter, Array.from(ingredientSet));
    populateDropdown(applianceFilter, Array.from(applianceSet));
    populateDropdown(ustensilFilter, Array.from(ustensilSet));
}

function populateDropdown(dropdown, options) {
    if (!dropdown) {
        console.error('Dropdown element is undefined');
        return;
    }

    const selectedValue = dropdown.value.toLowerCase();
    dropdown.innerHTML = '<option value="">Tous</option>';
    options.sort().forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option;
        optElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        if (option === selectedValue) {
            optElement.selected = true;
        }
        dropdown.appendChild(optElement);
    });
}
