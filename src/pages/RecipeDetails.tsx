import { API_KEY } from '@/services/recipeService';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes da receita');
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-500">Receita não encontrada.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-dark rounded-xl shadow-2xl overflow-hidden">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-t-xl"
          />
          <h1 className="py-5 px-5 text-4xl font-bold">{recipe.title}</h1>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-200">Ingredientes</h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-200">
              {recipe.extendedIngredients.map((ingredient: any, index: number) => (
                <li key={index} className="hover:text-gray-600">{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-zinc-200">Instruções</h2>
            <div
              className="text-zinc-200"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </div>

          <div className="mt-6 text-center">
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 font-semibold text-lg"
            >
              Ver Receita Completa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
