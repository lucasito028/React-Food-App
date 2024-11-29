import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from './../services/favoriteService';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== Number(id));
    setFavorites(updatedFavorites);
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-left text-indigo-300 mb-8">Receitas Favoritas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.length === 0 ? (
          <div className="col-span-full text-left rounded-xl">
            <p className="text-xl font-semibold text-gray-400">Não há receitas favoritas ainda.</p>
          </div>
        ) : (
          favorites.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-zinc-300">{recipe.title}</h3>

                {/* Link para a página de detalhes */}
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
                >
                  Ver Detalhes
                </Link>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleRemoveFavorite(String(recipe.id))}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remover dos Favoritos
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
