export function applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes) {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedIngredient = ingredientFilter.value.toLowerCase();
    const selectedAppliance = applianceFilter.value.toLowerCase();
    const selectedUstensil = ustensilFilter.value.toLowerCase();

    let filteredRecipes = allRecipes;

    if (searchQuery.length >= 3) {
        filteredRecipes = allRecipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchQuery) || 
                recipe.description.toLowerCase().includes(searchQuery) || 
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchQuery));

            let matchesIngredient;
            if (selectedIngredient) {
                matchesIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient));
            } else {
                matchesIngredient = true;
            }

            let matchesAppliance;
            if (selectedAppliance) {
                matchesAppliance = recipe.appliance.toLowerCase() === selectedAppliance;
            } else {
                matchesAppliance = true;
            }

            let matchesUstensil;
            if (selectedUstensil) {
                matchesUstensil = recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedUstensil));
            } else {
                matchesUstensil = true;
            }

            return matchesSearch && matchesIngredient && matchesAppliance && matchesUstensil;
        });
    }

    updateFilters(filteredRecipes, ingredientFilter, applianceFilter, ustensilFilter);
    displayRecipes(filteredRecipes);
}


export function updateFilters(filteredRecipes, ingredientFilter, applianceFilter, ustensilFilter) {
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
