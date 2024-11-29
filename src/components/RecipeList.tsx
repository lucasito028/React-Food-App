import React, { useEffect, useState } from 'react';
import { getRecipes } from '@/services/recipeService';

interface Recipe {
  id: number;
  title: string;
  image: string;
  sourceUrl: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredient, setIngredient] = useState<string>('');

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const recipes = await getRecipes(ingredient);
      setRecipes(recipes);
    } catch (error: any) {
      setError('Erro ao carregar as receitas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); 
  }, [ingredient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSearchSubmit} className="mb-6 flex justify-center">
        <input
          type="text"
          value={ingredient}
          onChange={handleSearchChange}
          placeholder="Digite um ingrediente"
          className="border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Pesquisar
        </button>
      </form>

      <div>
        {recipes.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Nenhuma receita encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
                  >
                    Ver receita completa
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
