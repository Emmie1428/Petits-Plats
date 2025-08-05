//Liaison entre les données de recipes.json et le DOM
function recipesTemplate (data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

    function getRecipeCardDOM() {
        const card = document.querySelector(".recipeCard").cloneNode(true);
        card.classList.remove("hidden");

        // Affichage image
        const imgRecipe = card.querySelector(".imgRecipe");
        imgRecipe.setAttribute("src", `assets/${data.image}`);
        imgRecipe.setAttribute("alt", `Recette de ${name}`);

        // Affichage du temps de préparation
        const recipeTime = card.querySelector(".recipeTime");
        recipeTime.textContent = `${time} min`;

        // Affichage titre
        const recipeName = card.querySelector(".recipeName");
        recipeName.textContent = name;

        // Affichage description
        const recipeDescription = card.querySelector(".recipeDescription");
        recipeDescription.textContent = description;

        // Affichage liste des ingrédients
        const ingredientsList = card.querySelector(".ingredientsList");
        ingredients.forEach(ingredients => {
            const signleIngredient = document.createElement("li");
            signleIngredient.classList.add("singleIngredient");

            // Création span pour le nom de l'ingrédient  
            const ingredientName = document.createElement("span");
            ingredientName.classList.add("ingredientName");
            ingredientName.textContent = ingredients.ingredient;

            //Création du span pour la quantité et l'unité de l'ingrédient
            const quantityAndUnit = document.createElement("span");
            quantityAndUnit.classList.add("quantityAndUnit");

            // Quantité et if unité
            if (ingredients.quantity) {
                quantityAndUnit.textContent = `${ingredients.quantity}`;
                if (ingredients.unit) {
                    quantityAndUnit.textContent += `${ingredients.unit}`;
                }
            }

            signleIngredient.appendChild(ingredientName);
            signleIngredient.appendChild(quantityAndUnit);

            ingredientsList.appendChild(signleIngredient);

        });

        return card;
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM };
}

export default recipesTemplate;