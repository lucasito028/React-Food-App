import React, { useState } from 'react';
import { getRecipes } from '@/services/recipeService';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';

const RecipeSearchPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: string) => {
    console.log('Buscando por:', query);

    setLoading(true);
    setError('');

    localStorage.removeItem('recipes');

    try {
      const recipesData = await getRecipes(query);
      setRecipes(recipesData.hits || []);
      localStorage.setItem('recipes', JSON.stringify(recipesData.hits || []));
    } catch (err) {
      setError('Erro ao buscar receitas');
      console.error('Erro ao buscar receitas:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-center text-xl font-semibold text-gray-500 mt-6">
            Carregando receitas...
          </div>
        )}

        {error && (
          <div className="text-center text-lg font-medium text-red-500 mt-6">
            {error}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Resultados da busca:
          </h2>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipes.map((recipe: any) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  sourceUrl={recipe.sourceUrl}
                  id={recipe.id}
                  onFavorite={() => console.log(`Favoritado: ${recipe.title}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-lg text-gray-500 mt-6">
              Nenhuma receita encontrada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearchPage;
