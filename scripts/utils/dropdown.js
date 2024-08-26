export function setupDropdownListeners(selectedTags, updateUI) {
    // Gestion des clics sur les dropdowns
    document.addEventListener('click', event => {
        const dropdownToggle = event.target.closest('.dropdown-toggle');
        const dropdown = event.target.closest('.dropdown');
        const filterInput = event.target.closest('.dropdown-filter-input');

        if (dropdownToggle) {
            // Ouvrir/Fermer le dropdown si le bouton toggle est cliqué
            toggleDropdown(dropdown);
        } else if (event.target.matches('.dropdown-item')) {
            // Logique pour gérer la sélection des éléments dans le dropdown
            const filterType = dropdown.id.split('-')[0];
            handleDropdownSelection(event, selectedTags, filterType, updateUI);
            closeAllDropdowns();
        } else if (!dropdown || !filterInput) {
            // Fermer tous les dropdowns si le clic est à l'extérieur et pas sur le champ de filtrage
            closeAllDropdowns();
        }
    });
}

// Fonction pour gérer l'ouverture et la fermeture du dropdown
export function toggleDropdown(dropdown) {
    dropdown.classList.toggle('open');

    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const chevronDown = dropdownToggle.querySelector('.fa-chevron-down');
    const chevronUp = dropdownToggle.querySelector('.fa-chevron-up');

    if (dropdown.classList.contains('open')) {
        dropdownToggle.classList.remove('rounded-lg');
        dropdownToggle.classList.remove('mb-4');
        dropdownToggle.classList.add('rounded-t-lg');

        chevronDown.classList.add('hidden');
        chevronUp.classList.remove('hidden');

        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.scrollTop = 0;
        }
    } else {
        dropdownToggle.classList.remove('rounded-t-lg');
        dropdownToggle.classList.add('rounded-lg');
        dropdownToggle.classList.add('mb-4');

        chevronDown.classList.remove('hidden');
        chevronUp.classList.add('hidden');
    }
}

// Fonction pour gérer la sélection d'éléments dans le dropdown
export function handleDropdownSelection(event, selectedTags, filterType, updateUI) {
    const item = event.target;

    if (item.classList.contains('dropdown-item')) {
        const value = item.dataset.value;

        if (!selectedTags[filterType].includes(value)) {
            selectedTags[filterType].push(value);
            updateUI(); // Met à jour l'interface utilisateur après la sélection
        }
    }
}

// Fonction pour fermer tous les dropdowns
export function closeAllDropdowns() {
    // Fermer tous les dropdowns en retirant la classe 'open'
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
    });
    
    // Sélectionner tous les boutons de dropdown
    document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
        dropdownToggle.classList.add('mb-4', 'rounded-lg');
    });
}

