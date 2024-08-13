export function applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes) {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedIngredient = ingredientFilter.value.toLowerCase();
    const selectedAppliance = applianceFilter.value.toLowerCase();
    const selectedUstensil = ustensilFilter.value.toLowerCase();

    let filteredRecipes = allRecipes;

    // Appliquer les filtres basés sur les tags
    if (selectedIngredient || selectedAppliance || selectedUstensil) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            const ingredientMatch = selectedIngredient ? recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient)) : true;
            const applianceMatch = selectedAppliance ? recipe.appliance.toLowerCase() === selectedAppliance : true;
            const ustensilMatch = selectedUstensil ? recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedUstensil)) : true;

            return ingredientMatch && applianceMatch && ustensilMatch;
        });
    }

    // Appliquer le filtrage de la recherche si la longueur de la requête est >= 3
    if (searchQuery.length >= 3) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchQuery) || 
                   recipe.description.toLowerCase().includes(searchQuery) || 
                   recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchQuery));
        });
    }

    // Mettre à jour les filtres disponibles et afficher les recettes filtrées
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
