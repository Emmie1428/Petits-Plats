export function applyFiltersAndSearch(allRecipes, searchInput, selectedTags, updateFilters, displayRecipes) {
    const searchQuery = searchInput.value.toLowerCase();
    
    let filteredRecipes = allRecipes;

    // Appliquer les filtres basés sur les tags
    filteredRecipes = filteredRecipes.filter(recipe => {
        const ingredientFilterActive = selectedTags.ingredient.length > 0;
        const applianceFilterActive = selectedTags.appliance.length > 0;
        const ustensilFilterActive = selectedTags.ustensil.length > 0;
    
        // Vérifier si la recette correspond aux ingrédients filtrés
        const ingredientMatch = !ingredientFilterActive || selectedTags.ingredient.every(tag => 
            recipe.ingredients.some(ingredient => 
                ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
            )
        );
    
        // Vérifier si la recette correspond aux appareils filtrés
        const applianceMatch = !applianceFilterActive || selectedTags.appliance.every(tag => 
            recipe.appliance.toLowerCase().includes(tag.toLowerCase())
        );
    
        // Vérifier si la recette correspond aux ustensiles filtrés
        const ustensilMatch = !ustensilFilterActive || selectedTags.ustensil.every(tag => 
            recipe.ustensils.some(ustensil => 
                ustensil.toLowerCase().includes(tag.toLowerCase())
            )
        );
    
        // La recette est gardée si elle passe tous les filtres activés
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

    // Mettre à jour les dropdowns personnalisés avec les nouvelles options
    loadDataInDropdowns(Array.from(ingredientSet), Array.from(applianceSet), Array.from(ustensilSet), selectedTags);
}

function loadDataInDropdowns(ingredientOptions, applianceOptions, ustensilOptions, selectedTags) {
    const ingredientDropdown = document.querySelector('#ingredient-dropdown .dropdown-menu');
    const applianceDropdown = document.querySelector('#appliance-dropdown .dropdown-menu');
    const ustensilDropdown = document.querySelector('#ustensil-dropdown .dropdown-menu');

    // Appeler la fonction pour mettre à jour chaque dropdown
    populateDropdownMenu(ingredientDropdown, ingredientOptions, selectedTags.ingredient);
    populateDropdownMenu(applianceDropdown, applianceOptions, selectedTags.appliance);
    populateDropdownMenu(ustensilDropdown, ustensilOptions, selectedTags.ustensil);
}
function populateDropdownMenu(dropdownMenu, options, selectedTags) {
    const selectedValues = new Set(selectedTags);
    dropdownMenu.innerHTML = '';  // Vider le contenu actuel

    // Créer un fragment pour les options
    const fragment = document.createDocumentFragment();

    // Créer et ajouter le conteneur de recherche
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('dropdown-filter-container', 'relative', 'mb-2', 'flex', 'items-center', 'border', 'rounded', 'border-gray-300', 'bg-white', 'p-1');
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('dropdown-filter-input', 'w-full', 'px-2', 'py-1', 'text-sm', 'outline-none');
    
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.innerHTML = '&times;';
    clearButton.classList.add('dropdown-remove-input', 'absolute', 'right-8', 'text-custom-gray', 'hover:text-black', 'focus:outline-none', 'cursor-pointer', 'hidden');
    
    const searchIcon = document.createElement('span');
    searchIcon.innerHTML = `
        <svg class="dropdown-search-icon text-custom-gray" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.4219" r="9.5" stroke="#7A7A7A" stroke-width="2"/>
            <line x1="18.3536" y1="19.0683" x2="27.3536" y2="28.0683" stroke="#7A7A7A" stroke-width="2"/>
        </svg>
    `;
    searchIcon.classList.add('absolute', 'right-2', 'text-gray-400');

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    searchContainer.appendChild(searchIcon);
    fragment.appendChild(searchContainer);

    // Ajouter les options
    options.sort().forEach(option => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.dataset.value = option;
        item.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        if (selectedValues.has(option)) {
            item.classList.add('selected');
        }
        fragment.appendChild(item);
    });

    dropdownMenu.appendChild(fragment);

    // Fonction pour filtrer les options et gérer la visibilité du bouton clear
    function filterOptions() {
        const filterValue = searchInput.value.toLowerCase();
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filterValue) ? '' : 'none';
        });

        // Gérer la visibilité du bouton clear
        clearButton.classList.toggle('hidden', filterValue.trim() === '');
    }

    // Ajouter un écouteur pour le bouton d'effacement
    clearButton.addEventListener('click', (event) => {
        event.stopPropagation();  // Empêche la propagation de l'événement de clic
        searchInput.value = '';
        filterOptions();
    });

    // Écouteur pour filtrer les éléments lorsque l'utilisateur tape
    searchInput.addEventListener('input', filterOptions);
}


