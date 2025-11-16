import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar'; // 1. Import SearchBar
import './App.css';

const Home = () => (
  <>
    <AddRecipeForm />
    <hr />
    <SearchBar /> {/* 2. Add SearchBar here */}
    <RecipeList />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Recipe Sharing Application</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;