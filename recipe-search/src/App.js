import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import RecipeDetails from './components/RecipeDetails';
import RandomMeal from "./components/RandomMeal";

function App() {
    return (
        <Router>
            <div>
                <h2>The Meal</h2>
                <Routes>
                    <Route path="/" element={<RandomMeal />} />
                    <Route path="/recipe/:id" element={<RecipeDetails />} />
                </Routes>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<SearchForm />} />
                    <Route path="/recipe/:id" element={null} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
