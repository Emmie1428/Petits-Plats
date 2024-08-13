export function updateTags(selectedTags, tagsContainer, applyFiltersAndSearch) {
    tagsContainer.innerHTML = '';

    Object.keys(selectedTags).forEach(type => {
        selectedTags[type].forEach(value => {
            createTag(value, type, tagsContainer, selectedTags, applyFiltersAndSearch);
        });
    });
}

function createTag(value, type, tagsContainer, selectedTags, applyFiltersAndSearch) {
    const tag = document.createElement('span');
    tag.classList.add('tag-label', 'flex', 'items-center', 'rounded', 'p-2', 'text-sm', 'mr-2', 'mb-2');

    const tagText = document.createElement('span');
    tagText.textContent = value.charAt(0).toUpperCase() + value.slice(1);
    tagText.classList.add('mr-2');

    const removeIcon = document.createElement('span');
    removeIcon.textContent = 'x';
    removeIcon.classList.add('ml-2', 'cursor-pointer', 'remove-tag');
    
    // Ajoute l'écouteur pour le clic sur l'icône "x"
    removeIcon.addEventListener('click', () => {
        removeTag(type, value, selectedTags, tagsContainer, applyFiltersAndSearch);
    });

    tag.appendChild(tagText);
    tag.appendChild(removeIcon);
    tag.dataset.type = type;
    tag.dataset.value = value;

    tagsContainer.appendChild(tag);
}

function removeTag(type, value, selectedTags, tagsContainer, applyFiltersAndSearch) {
    // Suppression du tag
    selectedTags[type] = selectedTags[type].filter(tag => tag !== value);
    
    // Réinitialiser le filtre correspondant s'il n'y a plus de tags pour ce type
    if (selectedTags[type].length === 0) {
        const filterElement = document.querySelector(`#${type}-filter`);
        filterElement.value = '';
    }
    
    // Mise à jour des tags
    updateTags(selectedTags, tagsContainer, applyFiltersAndSearch);

    // Appliquer les filtres et mettre à jour l'affichage des recettes
    applyFiltersAndSearch();
}
