export function displayRecipes(recipes) {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = ''; // Clear previous results
    recipesContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'p-6');

    const recipeCountElement = document.querySelector('.recipe-count');
    recipeCountElement.textContent = `${recipes.length.toString().padStart(2, '0')} recette${recipes.length > 1 ? 's' : ''}`;

    if (recipes.length === 0) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'Aucune recette trouvée';
        noResultMessage.classList.add('text-center', 'text-gray-500', 'w-full', 'col-span-3');
        recipesContainer.appendChild(noResultMessage);
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'bg-white');

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

        const recipeContent = document.createElement('div');
        recipeContent.classList.add('p-4','recipe-content');

        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
        recipeName.classList.add('text-xl', 'font-normal', 'mb-5');

        const recipeDescriptionLabel = document.createElement('h3');
        recipeDescriptionLabel.textContent = 'Recette';
        recipeDescriptionLabel.classList.add('recipe-subtitle','text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5');

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.description;
        recipeDescription.classList.add('recipe-description', 'text-sm', 'mb-4', 'line-clamp-4');

        const ingredientsLabel = document.createElement('h3');
        ingredientsLabel.textContent = 'Ingrédients';
        ingredientsLabel.classList.add('recipe-subtitle','text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5');

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('text-sm', 'grid', 'grid-cols-2', 'gap-x-2');

        recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.classList.add('ingredient-item', 'mb-5');

            const ingredientName = document.createElement('span');
            ingredientName.textContent = ingredient.ingredient;
            ingredientName.classList.add('block','ingredient-item__name');

            const ingredientQuantity = document.createElement('span');
            ingredientQuantity.textContent = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`;
            ingredientQuantity.classList.add('block','ingredient-item__quantity');

            ingredientItem.appendChild(ingredientName);
            ingredientItem.appendChild(ingredientQuantity);
            ingredientsList.appendChild(ingredientItem);
        });

        recipeContent.appendChild(recipeName);
        recipeContent.appendChild(recipeDescriptionLabel);
        recipeContent.appendChild(recipeDescription);
        recipeContent.appendChild(ingredientsLabel);
        recipeContent.appendChild(ingredientsList);

        recipeCard.appendChild(recipeImageContainer);
        recipeCard.appendChild(recipeContent);

        recipesContainer.appendChild(recipeCard);
    });
}

