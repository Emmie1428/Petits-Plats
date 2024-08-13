import { fetchData } from './utils/fetchData.js';
import { applyFiltersAndSearch, updateFilters } from './utils/filter.js';
import { updateTags } from './utils/tags.js';
import { displayRecipes } from './utils/display.js';

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'data/recipes.JSON';
    let allRecipes = [];
    let selectedTags = {
        ingredient: [],
        appliance: [],
        ustensil: []
    };

    // Sélectionner les éléments du DOM
    const ingredientFilter = document.querySelector('#ingredient-filter');
    const applianceFilter = document.querySelector('#appliance-filter');
    const ustensilFilter = document.querySelector('#ustensil-filter');
    const searchInput = document.querySelector('.search-input');
    const tagsContainer = document.querySelector('.tags-container');

    // Fonction pour mettre à jour l'interface utilisateur
    function updateUI() {
        applyFiltersAndSearch(allRecipes, searchInput, selectedTags, updateFilters, displayRecipes);
        updateTags(selectedTags, tagsContainer, updateUI);
    }

    // Fonction pour gérer les modifications des filtres
    function handleFilterChange(filterType, filterElement) {
        const value = filterElement.value.toLowerCase();
        if (value && !selectedTags[filterType].includes(value)) {
            selectedTags[filterType].push(value);
            filterElement.value = ''; // Réinitialiser le filtre après ajout
            updateUI();
        }
    }

    // Ajouter des écouteurs d'événements
    ingredientFilter.addEventListener('change', () => handleFilterChange('ingredient', ingredientFilter));
    applianceFilter.addEventListener('change', () => handleFilterChange('appliance', applianceFilter));
    ustensilFilter.addEventListener('change', () => handleFilterChange('ustensil', ustensilFilter));
    searchInput.addEventListener('input', updateUI);

    // Charger les données et initialiser l'interface utilisateur
    fetchData(apiUrl).then(recipes => {
        allRecipes = recipes;
        updateUI(); // Appel initial pour afficher les recettes et les tags
    });
});

// Fonction pour gérer l'ouverture et la fermeture du dropdown
function toggleDropdown(dropdown) {
    dropdown.classList.toggle('open');
}

// Fonction pour gérer la sélection des éléments dans le dropdown
function handleDropdownSelection(event, selectedTags, filterType, updateUI) {
    const item = event.target;
    if (item.classList.contains('dropdown-item')) {
        const value = item.dataset.value;
        if (!selectedTags[filterType].includes(value)) {
            selectedTags[filterType].push(value);
            updateUI(); // Met à jour l'interface utilisateur après la sélection
        }
    }
}

// Ajout des écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    const selectedTags = {
        ingredient: [],
        appliance: [],
        ustensil: []
    };

    const ingredientDropdown = document.querySelector('#ingredient-dropdown');
    const applianceDropdown = document.querySelector('#appliance-dropdown');
    const ustensilDropdown = document.querySelector('#ustensil-dropdown');

    // Gestion des clics sur les dropdowns
    document.addEventListener('click', event => {
        if (event.target.matches('.dropdown-toggle')) {
            const dropdown = event.target.closest('.dropdown');
            toggleDropdown(dropdown);
        } else if (event.target.matches('.dropdown-item')) {
            handleDropdownSelection(event, selectedTags, 'ingredient', updateUI);
        } else {
            document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.classList.remove('open'));
        }
    });

    // Fonction pour mettre à jour l'interface utilisateur
    function updateUI() {
        console.log("function updateUi used") // Logique pour mettre à jour les filtres et afficher les recettes
    }
});
