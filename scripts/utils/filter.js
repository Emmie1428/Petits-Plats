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

    dropdownMenu.innerHTML = '';

    // Conteneur pour le champ de recherche
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('dropdown-filter-container', 'relative', 'mb-2', 'flex', 'items-center', 'border', 'rounded', 'border-gray-300', 'bg-white', 'p-1');

    // Créer et ajouter l'input de recherche
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('dropdown-filter-input', 'w-full', 'px-2', 'py-1', 'text-sm', 'outline-none');

    // Bouton pour effacer le texte du filtre
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.innerHTML = '&times;';
    clearButton.classList.add('dropdown-remove-input', 'absolute', 'right-8', 'text-custom-gray', 'hover:text-black', 'focus:outline-none', 'cursor-pointer', 'hidden'); // Par défaut caché
    
    // Icône de recherche
    const searchIcon = document.createElement('span');
    searchIcon.innerHTML = `
        <svg class="dropdown-search-icon text-custom-gray" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.4219" r="9.5" stroke="#7A7A7A" stroke-width="2"/>
            <line x1="18.3536" y1="19.0683" x2="27.3536" y2="28.0683" stroke="#7A7A7A" stroke-width="2"/>
        </svg>
    `;
    searchIcon.classList.add('absolute', 'right-2', 'text-gray-400');

    // Ajouter les éléments dans le conteneur
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    searchContainer.appendChild(searchIcon);
    dropdownMenu.appendChild(searchContainer);

    // Fonction pour filtrer les options et gérer la visibilité du bouton clear
    function filterOptions() {
        const filterValue = searchInput.value.toLowerCase();
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filterValue)) {
                item.style.display = '';  // Afficher l'élément
            } else {
                item.style.display = 'none';  // Masquer l'élément
            }
        });

        // Gérer la visibilité du bouton clear
        if (filterValue.trim() === '') {
            clearButton.classList.add('hidden');
        } else {
            clearButton.classList.remove('hidden');
        }
    }

    // Ajouter un écouteur pour le bouton d'effacement
    clearButton.addEventListener('click', (event) => {
        event.stopPropagation();  // Empêche la propagation de l'événement de clic
        searchInput.value = '';
        filterOptions();
    });

    // Écouteur pour filtrer les éléments lorsque l'utilisateur tape
    searchInput.addEventListener('input', filterOptions);

    // Ajouter les options dans le dropdown
    options.sort().forEach(option => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.dataset.value = option;
        item.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        if (selectedValues.has(option)) {
            item.classList.add('selected');
        }
        dropdownMenu.appendChild(item);
    });
}

