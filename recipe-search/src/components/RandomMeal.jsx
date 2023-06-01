import React, { useState, useEffect } from 'react';
import "./components.css"
import {Link} from "react-router-dom";

const RandomMeal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [meal, setMeal] = useState(null);

    const getRandomMeal = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/random.php`
            );
            const data = await response.json();
            const { meals } = data;
            if (meals && meals.length > 0) {
                setMeal(meals[0]);
            } else {
                setMeal(null);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getRandomMeal();
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : meal ? (
                <div className="meal" key={meal.idMeal}>
                    <div className="meal_title">
                        <h2 className="h2">Meal of the Day</h2>
                        <Link to={`/recipe/${meal.idMeal}`} className="meal_name">{meal.strMeal}</Link>
                        <p>{meal.strCategory} | {meal.strArea}</p>
                    </div>
                    <div className="meal_image-frame">
                        <img className="meal_image" src={meal.strMealThumb} alt={meal.strMeal} />
                    </div>
                </div>
            ) : (
                <p>No meal found.</p>
            )}
        </div>
    )
};

export default RandomMeal;
