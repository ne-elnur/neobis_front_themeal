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
                console.log(meals[0])
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
            <h2 className="h2">Find your Meal</h2>
            <form className="search-block" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Find your meal"
                />
                <button type="submit" disabled={isLoading}>
                    Search
                </button>
            </form>
            {isLoading ? (
                <p>Loading...</p>
            ) : recipes ? (
                <ul>
                    {recipes.map((recipe) => (
                        <li type="none" key={recipe.idMeal}>
                            <Link to={`/recipe/${recipe.idMeal}`}>
                            <div className="search-item">
                                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                    <div className="search-item_title">
                                        <h3>{recipe.strMeal}</h3>
                                        <p>{recipe.strCategory} | {recipe.strArea}</p>
                                    </div>
                            </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No meal's recipes found.</p>
            )}
        </div>
    );
};

export default SearchForm;
