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
            <h3>Meal of the day</h3>
            {isLoading ? (
                <p>Loading...</p>
            ) : meal ? (
                <div key={meal.idMeal}>
                    <Link to={`/recipe/${meal.idMeal}`}>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <h4>{meal.strMeal}</h4>
                    <p>{meal.strCategory}</p>
                    </Link>
                </div>
            ) : (
                <p>No meal found.</p>
            )}
        </div>
    )
};

export default RandomMeal;
