import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );
            const data = await response.json();
            const { meals } = data;
            if (meals && meals.length > 0) {
                setRecipes(meals);
            } else {
                setRecipes([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    return (
        <div>
            <h3>Search for Recipes</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    Search
                </button>
            </form>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.idMeal}>
                            <Link to={`/recipe/${recipe.idMeal}`}>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                <div>
                                    <h4>{recipe.strMeal}</h4>
                                    <p>{recipe.strCategory}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchForm;
