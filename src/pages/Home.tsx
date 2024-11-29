import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard'; 
import { getRecipes } from '../services/recipeService';  
import SearchBar from '../components/SearchBar';  
import Pagination from '../components/Pagination'; 

const ITEMS_PER_PAGE = 8;

const Home: React.FC = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<any[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const allRecipes = await getRecipes();
        const recipesWithIngredients = allRecipes.map(recipe => ({
          ...recipe,
          ingredients: recipe.ingredients || [], 
        }));
  
        setFilteredRecipes(recipesWithIngredients);
      } catch (err) {
        setError('Deu pau na hora de carregar as receitas. Tente novamente oumais tarde.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRecipes();
  }, []);  

  const handleSearch = async (query: string) => {
    console.log('Buscando por:', query); 

    setIsLoading(true);
    setError('');
    try {
      const recipesData = await getRecipes(query); 
      console.log('Receitas recebidas:', recipesData);  
      setFilteredRecipes(recipesData);  
    } catch (err) {
      setError('Deu pau na hora de pegar as receitas');
      console.error('Deu pau na hora de pegar as receitas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = (recipe: any) => {

    const favoriteExists = favorites.find((fav) => fav.id === recipe.id);

    if(favoriteExists){
      alert("Não pode colocar a mesma Receita");
    }else{
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
    }
  };

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Receitas</h1>
      
      <SearchBar onSearch={handleSearch} />

      {isLoading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedRecipes.length === 0 && !isLoading ? (
          <p className="col-span-full text-center text-xl text-gray-400">Não há receitas correspondentes à sua pesquisa.</p>
        ) : (
          paginatedRecipes.map((recipe: any) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              sourceUrl={recipe.sourceUrl}
              id={recipe.id}
              onFavorite={() => handleFavorite(recipe)}
            />
          ))
        )}
      </div>

      {!isLoading && paginatedRecipes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
