//Liaison entre les données de recipes.json et le DOM
function recipesTemplate (data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

    function getRecipeCardDOM() {
        const card = document.querySelector(".recipeCard").cloneNode(true);

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
            // Création du texte de l'ingrédient
            let text = ingredients.ingredient;
            if (ingredients.quantity) {
                text += `: ${ingredients.quantity}`;
                if (ingredients.unit) {
                    text += ` ${ingredients.unit}`;
                }
            }
            signleIngredient.textContent = text;
            ingredientsList.appendChild(signleIngredient);
        });

        return card;
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM };
}

export default recipesTemplate;