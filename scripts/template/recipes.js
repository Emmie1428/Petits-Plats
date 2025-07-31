//Création cards recettes
function recipesTemplate (data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

    function getRecipeCardDOM() {
        const article = document.createElement("article");

        // Création image
        const imgRecipe = document.createElement("img");
        imgRecipe.setAttribute("src", `assets/recipes/${data.image}`);
        imgRecipe.setAttribute("alt", `Image de la recette ${name}`);
        imgRecipe.classList.add("imgRecipe");

        // Création du temps de préparation
        const recipeTime = document.createElement("p");
        recipeTime.textContent = `${time} min`;
        recipeTime.classList.add("recipeTime");

        // Création titre
        const recipeName = document.createElement("h2");
        recipeName.textContent = name;
        recipeName.classList.add("recipeName");
        
        //Création titre description
        const descriptionTitle = document.createElement("h3");
        descriptionTitle.textContent = "Recette";
        descriptionTitle.classList.add("recipeSubTitle");

        // Création description
        const recipeDescription = document.createElement("p");
        recipeDescription.textContent = description;
        recipeDescription.classList.add("recipeDescription");

        //Création titre liste des ingrédients
        const ingredientsTitle = document.createElement("h3");
        descriptionTitle.textContent = "Ingrédients";
        descriptionTitle.classList.add("recipeSubTitle");

        // Création liste des ingrédients
        const ingredientsList = document.createElement("ul");
        ingredients.forEach(ingredient => {
            const signleIngredient = document.createElement("li");
            signleIngredient.textContent = `${ingredient}: ${ingredient.quantity || ""} ${ingredient.unit || ""}`;
            ingredientsList.appendChild(li);
            signleIngredient.classList.add("singeIngredient");
            ingredientsList.classList.add("ingredientsList");
        });


        // Liaison éléments à l'article
        article.appendChild(imgRecipe);
        article.appendChild(recipeTime);
        article.appendChild(recipeName);
        article.appendChild(descriptionTitle);
        article.appendChild(recipeDescription);
        article.appendChild(ingredientsTitle);
        article.appendChild(ingredientsList);
        

        return article;
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM };
}

