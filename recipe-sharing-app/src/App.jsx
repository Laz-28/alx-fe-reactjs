// 1. Import BrowserRouter, Routes, and Route
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

const Home = () => (
  <>
    <AddRecipeForm />
    <hr />
    <RecipeList />
  </>
);

function App() {
  return (
    // 2. Wrap your entire app content in <BrowserRouter>
    <BrowserRouter>
      <div className="App">
        <h1>Recipe Sharing Application</h1>
        {/* 3. The <Routes> component now lives inside BrowserRouter */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;