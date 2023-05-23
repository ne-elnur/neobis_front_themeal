import React from 'react';

const RecipeDetails = ({ recipe }) => {
    const { idMeal, strMeal, strCategory, strMealThumb } = recipe;
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
                <a href={"https://www.themealdb.com/meal/" + idMeal} target="_blank">Ingredients</a>
            </div>
        </div>
    )
};

export default RecipeDetails;