document.addEventListener('DOMContentLoaded', () => {
    fetch('data/recipes.JSON')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayRecipes(data.recipes);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});

function displayRecipes(recipes) {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'p-6');
    
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
        recipeContent.classList.add('p-4');

        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
        recipeName.classList.add('text-xl', 'font-normal', 'mb-5');

        const recipeDescriptionLabel = document.createElement('h3');
        recipeDescriptionLabel.textContent = 'Recette';
        recipeDescriptionLabel.classList.add('text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5');

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.description;
        recipeDescription.classList.add('text-sm', 'mb-4','line-clamp-4');

        const ingredientsLabel = document.createElement('h3');
        ingredientsLabel.textContent = 'Ingrédients';
        ingredientsLabel.classList.add('text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5');

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('text-sm', 'grid', 'grid-cols-2', 'gap-x-2');

        recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = `${ingredient.ingredient} ${ingredient.quantity ? '- ' + ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`;
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
