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
