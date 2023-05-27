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
                <div className="random-meal" key={meal.idMeal}>
                    <div className="random-meal_title">
                        <h3>Meal of the day</h3>
                        <Link to={`/recipe/${meal.idMeal}`}>
                            <h4>{meal.strMeal}</h4>
                        </Link>
                        <p>{meal.strCategory}</p>
                    </div>

                    <img className="random-meal_image" src={meal.strMealThumb} alt={meal.strMeal} />
                </div>
            ) : (
                <p>No meal found.</p>
            )}
        </div>
    )
};

export default RandomMeal;
