import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                const data = await res.json();
                const { meals } = data;
                if (meals && meals.length > 0) {
                    setRecipe(meals[0]);
                } else {
                    setRecipe(null);
                }
            } catch (error) {
                console.error('Error fetching recipe details: ', error);
                setRecipe(null);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipe) {
        return <p>Loading recipe details...</p>;
    }

    const { strMeal, strCategory, strMealThumb, strInstructions } = recipe;

    const ingredients = [];
    for (let i=1; i<=20; i++) {
        const ingredientKey = `strIngredient${i}`;
        if (recipe[ingredientKey]) {
            ingredients.push(recipe[ingredientKey]);
        } else {
            break;
        }
    }

    return (
        <div className="details">
            <img
                src={strMealThumb}
                alt={strMeal}
                className="meal-img"
            />
            <div className="details-body">
                <span className="category">{strCategory}</span>
                <h3>{strMeal}</h3>
                <p>Instructions: {strInstructions}</p>
                <p>Ingredients:</p>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecipeDetails;