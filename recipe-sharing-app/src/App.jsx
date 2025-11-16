import { Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails'; // We will create this
import './App.css';

// 1. Create a "Home" layout component
const Home = () => (
  <>
    <AddRecipeForm />
    <hr />
    <RecipeList />
  </>
);

function App() {
  return (
    <div className="App">
      <h1>Recipe Sharing Application</h1>
      {/* 2. Define your routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;