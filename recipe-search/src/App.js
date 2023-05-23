import { useState, useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import RecipeDetails from './components/RecipeDetails';

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    //function for searching meals
    const searchRecipes = async () => {
        setIsLoading(true);
        const url = apiUrl + query;
        const res = await fetch(url);
        const data = await  res.json();
        console.log(data);
        setRecipes(data.meals);
        setIsLoading(false);
    };

    useEffect(()=> {
        searchRecipes();
    }, []);

    return (
        <div className="container">
            <h2>The Meal</h2>
            <div className="recipes">
                {recipes ? recipes.map(recipe => (
                    <RecipeDetails
                        key={recipe.idMeal}
                        recipe={recipe}
                    />
                )): "No recipes! :("}
            </div>
        </div>
    );
}

export default App;