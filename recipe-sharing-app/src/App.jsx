import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList'; // 1. Import
import RecommendationsList from './components/RecommendationsList'; // 2. Import
import './App.css';

const Home = () => (
  <>
    <AddRecipeForm />
    <hr />
    <SearchBar />
    <RecipeList />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* 3. Add a simple navigation bar */}
        <nav
          style={{
            padding: '10px',
            background: '#f4f4f4',
            marginBottom: '20px',
            borderRadius: '5px',
          }}
        >
          <Link to="/" style={{ marginRight: '15px' }}>
            Home
          </Link>
          <Link to="/favorites" style={{ marginRight: '15px' }}>
            My Favorites
          </Link>
          <Link to="/recommendations">Recommendations</Link>
        </nav>

        <h1>Recipe Sharing Application</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          {/* 4. Add new routes */}
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recommendations" element={<RecommendationsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;