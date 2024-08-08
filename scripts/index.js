// main.js
import { fetchData } from './utils/fetchData.js';
import { applyFiltersAndSearch, updateFilters } from './utils/filter.js';
import { updateTags } from './utils/tags.js';
import { displayRecipes } from './utils/display.js';

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'data/recipes.JSON';
    let allRecipes = [];

    fetchData(apiUrl).then(recipes => {
        allRecipes = recipes;
        applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes);
    });

    // Event listeners for filters and search
    const ingredientFilter = document.querySelector('#ingredient-filter');
    const applianceFilter = document.querySelector('#appliance-filter');
    const ustensilFilter = document.querySelector('#ustensil-filter');
    const searchInput = document.querySelector('.search-input');
    const tagsContainer = document.querySelector('.tags-container');

    ingredientFilter.addEventListener('change', () => {
        applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes);
        updateTags(ingredientFilter, applianceFilter, ustensilFilter, tagsContainer, () => applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes));
    });
    applianceFilter.addEventListener('change', () => {
        applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes);
        updateTags(ingredientFilter, applianceFilter, ustensilFilter, tagsContainer, () => applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes));
    });
    ustensilFilter.addEventListener('change', () => {
        applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes);
        updateTags(ingredientFilter, applianceFilter, ustensilFilter, tagsContainer, () => applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes));
    });
    searchInput.addEventListener('input', () => {
        applyFiltersAndSearch(allRecipes, searchInput, ingredientFilter, applianceFilter, ustensilFilter, updateFilters, displayRecipes);
    });
});
