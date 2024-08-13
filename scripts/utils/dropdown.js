// FICHIER NON UTILISE - IL FAUDRA REIMPORTEr LES FUNCTIONS A PARTIR D'INDEX.JS


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
        // Logique pour mettre à jour les filtres et afficher les recettes
    }
});
