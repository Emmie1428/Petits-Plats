import { fetchData } from './utils/fetchData.js';
import { applyFiltersAndSearch } from './utils/filter.js';
import { updateTags } from './utils/tags.js';
import { setupDropdownListeners } from './utils/dropdown.js';
import { displayRecipes } from './utils/display.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipesData = './data/recipes.json';
    let allRecipes = [];
    let selectedTags = {
        ingredient: [],
        appliance: [],
        ustensil: []
    };

    const searchInput = document.querySelector('.search-input');
    const tagsContainer = document.querySelector('.tags-container');

    function updateUI() {
        const hasTags = selectedTags.ingredient.length > 0 || selectedTags.appliance.length > 0 || selectedTags.ustensil.length > 0;
        const filteredRecipes = applyFiltersAndSearch(allRecipes, searchInput, selectedTags);
        updateTags(selectedTags, tagsContainer, updateUI);
        displayRecipes(filteredRecipes, searchInput.value, hasTags);
    }

    function initialize() {
        fetchData(recipesData).then(recipes => {
            allRecipes = recipes;
            updateUI();
        });

        setupEventListeners();
    }

    function setupEventListeners() {
        searchInput.addEventListener('input', updateUI);
        setupDropdownListeners(selectedTags, updateUI);
        document.getElementById('search-button').addEventListener('click', function(event) {
            event.preventDefault();
        });
    }

    initialize();
});
