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

    const { strMeal, strCategory, strMealThumb, strInstructions, strArea, strYoutube } = recipe;

    const ingredients = [];
    for (let i=1; i<=20; i++) {
        const ingredientKey = `strIngredient${i}`;
        if (recipe[ingredientKey]) {
            ingredients.push(recipe[ingredientKey]);
        } else {
            break;
        }
    }

    const measures = [];
    for (let i=1; i<=20; i++) {
        const measureKey = `strMeasure${i}`;
        if (recipe[measureKey]) {
            measures.push(recipe[measureKey]);
        } else {
            break;
        }
    }

    return (
        <div className="meal_details">

            <div className="meal">
                <div  className="meal_title">
                    <h3 className="meal_name">{strMeal}</h3>
                    <p>{strCategory} | {strArea}</p>
                    <ul className="meal_ingredients">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="meal_ingredient-item">
                                {ingredient}
                                {measures[index] && <span className="meal_measure-item"> {measures[index]}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="meal_image-frame">
                    <img className="meal_image" src={strMealThumb} alt={strMeal}/>
                </div>
            </div>
            <h2 className="h2">Instructions</h2>
            <pre>{strInstructions}</pre>
            <a className="meal_youtube" href={strYoutube}>Watch on YouTube</a>
        </div>
    );
};

export default RecipeDetails;