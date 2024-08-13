export function applyFiltersAndSearch(allRecipes, searchInput, selectedTags, updateFilters, displayRecipes) {
    const searchQuery = searchInput.value.toLowerCase();
    
    let filteredRecipes = allRecipes;

    // Appliquer les filtres basés sur les tags
    filteredRecipes = filteredRecipes.filter(recipe => {
        const ingredientMatch = selectedTags.ingredient.length > 0 ? 
            selectedTags.ingredient.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag))) : true;
        const applianceMatch = selectedTags.appliance.length > 0 ? 
            selectedTags.appliance.every(tag => recipe.appliance.toLowerCase().includes(tag)) : true;
        const ustensilMatch = selectedTags.ustensil.length > 0 ? 
            selectedTags.ustensil.every(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))) : true;

        return ingredientMatch && applianceMatch && ustensilMatch;
    });

    // Appliquer le filtrage de la recherche si la longueur de la requête est >= 3
    if (searchQuery.length >= 3) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchQuery) || 
                   recipe.description.toLowerCase().includes(searchQuery) || 
                   recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchQuery));
        });
    }

    // Mettre à jour les filtres disponibles et afficher les recettes filtrées
    updateFilters(filteredRecipes, selectedTags);
    displayRecipes(filteredRecipes);
}

export function updateFilters(filteredRecipes, selectedTags) {
    const ingredientSet = new Set();
    const applianceSet = new Set();
    const ustensilSet = new Set();

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientSet.add(ingredient.ingredient.toLowerCase()));
        applianceSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ustensil => ustensilSet.add(ustensil.toLowerCase()));
    });

    const ingredientFilter = document.querySelector('#ingredient-filter');
    const applianceFilter = document.querySelector('#appliance-filter');
    const ustensilFilter = document.querySelector('#ustensil-filter');

    populateDropdown(ingredientFilter, Array.from(ingredientSet), selectedTags.ingredient);
    populateDropdown(applianceFilter, Array.from(applianceSet), selectedTags.appliance);
    populateDropdown(ustensilFilter, Array.from(ustensilSet), selectedTags.ustensil);
}

function populateDropdown(dropdown, options, selectedTags) {
    const selectedValues = new Set(selectedTags);

    dropdown.innerHTML = '<option value="">Tous</option>';
    
    options.sort().forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option;
        optElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        if (selectedValues.has(option)) {
            optElement.selected = true;
        }
        dropdown.appendChild(optElement);
    });
}
