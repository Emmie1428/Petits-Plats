export function displayRecipes(recipes, searchQuery, hasTags) {
    const recipesContainer = document.querySelector('.recipes-container');
    clearRecipesContainer(recipesContainer);

    updateRecipeCount(recipes.length);

    if (recipes.length === 0) {
        displayNoResultsMessage(recipesContainer, searchQuery, hasTags);
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard);
    });
}

function clearRecipesContainer(container) {
    container.innerHTML = '';
}


function updateRecipeCount(recipeCount) {
    const recipeCountElement = document.querySelector('.recipe-count');
    recipeCountElement.textContent = `${recipeCount.toString().padStart(2, '0')} recette${recipeCount > 1 ? 's' : ''}`;
}

function displayNoResultsMessage(container, searchQuery, hasTags) {
    const noResultMessage = document.createElement('p');

    if (hasTags) {
        noResultMessage.textContent = `Aucune recette ne correspond aux tags sélectionnés et à la recherche « ${searchQuery} ». Essayez d'ajuster vos filtres ou votre recherche.`;
    } else {
        noResultMessage.textContent = `Aucune recette ne contient « ${searchQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    }

    noResultMessage.classList.add('text-center', 'text-gray-500', 'w-full', 'col-span-3');
    container.appendChild(noResultMessage);
}

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipe-card', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'bg-white');

    const recipeImageContainer = createRecipeImageContainer(recipe);
    const recipeContent = createRecipeContent(recipe);

    recipeCard.appendChild(recipeImageContainer);
    recipeCard.appendChild(recipeContent);

    return recipeCard;
}

function createRecipeImageContainer(recipe) {
    const recipeImageContainer = document.createElement('div');
    recipeImageContainer.classList.add('relative');

    const recipeImage = document.createElement('img');
    recipeImage.src = `assets/images/recettes/${recipe.image}`;
    recipeImage.alt = `Image de ${recipe.name}`;
    recipeImage.classList.add('w-full', 'h-48', 'object-cover');

    const recipeTimeBadge = document.createElement('div');
    recipeTimeBadge.textContent = `${recipe.time}min`;
    recipeTimeBadge.classList.add('recipe-time', 'absolute', 'top-2', 'right-2', 'text-xs', 'px-4', 'py-1', 'rounded-full');

    recipeImageContainer.appendChild(recipeImage);
    recipeImageContainer.appendChild(recipeTimeBadge);

    return recipeImageContainer;
}

function createRecipeContent(recipe) {
    const recipeContent = document.createElement('div');
    recipeContent.classList.add('p-4', 'recipe-content');

    const recipeName = document.createElement('h2');
    recipeName.textContent = recipe.name;
    recipeName.classList.add('text-xl', 'font-normal', 'mb-5');

    const recipeDescriptionLabel = createRecipeDescriptionLabel();
    const recipeDescription = createRecipeDescription(recipe);
    const ingredientsLabel = createIngredientsLabel();
    const ingredientsList = createIngredientsList(recipe);

    recipeContent.appendChild(recipeName);
    recipeContent.appendChild(recipeDescriptionLabel);
    recipeContent.appendChild(recipeDescription);
    recipeContent.appendChild(ingredientsLabel);
    recipeContent.appendChild(ingredientsList);

    return recipeContent;
}

function createRecipeDescriptionLabel() {
    const recipeDescriptionLabel = document.createElement('h3');
    recipeDescriptionLabel.textContent = 'Recette';
    recipeDescriptionLabel.classList.add('recipe-subtitle', 'text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5');
    return recipeDescriptionLabel;
}

function createRecipeDescription(recipe) {
    const recipeDescription = document.createElement('p');
    recipeDescription.textContent = recipe.description;
    recipeDescription.classList.add('recipe-description', 'text-sm', 'mb-4', 'line-clamp-4');
    return recipeDescription;
}

function createIngredientsLabel() {
    const ingredientsLabel = document.createElement('h3');
    ingredientsLabel.textContent = 'Ingrédients';
    ingredientsLabel.classList.add('recipe-subtitle', 'text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5');
    return ingredientsLabel;
}

function createIngredientsList(recipe) {
    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('text-sm', 'grid', 'grid-cols-2', 'gap-x-2');

    recipe.ingredients.forEach(ingredient => {
        const ingredientItem = createIngredientItem(ingredient);
        ingredientsList.appendChild(ingredientItem);
    });

    return ingredientsList;
}

function createIngredientItem(ingredient) {
    const ingredientItem = document.createElement('li');
    ingredientItem.classList.add('ingredient-item', 'mb-5');

    const ingredientName = document.createElement('span');
    ingredientName.textContent = ingredient.ingredient;
    ingredientName.classList.add('block', 'ingredient-item__name');

    const ingredientQuantity = document.createElement('span');
    ingredientQuantity.textContent = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`;
    ingredientQuantity.classList.add('block', 'ingredient-item__quantity');

    ingredientItem.appendChild(ingredientName);
    ingredientItem.appendChild(ingredientQuantity);

    return ingredientItem;
}