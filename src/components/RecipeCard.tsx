import React from 'react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  title: string;
  image: string;
  sourceUrl: string;
  id: string;
  onFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, id, onFavorite }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
      <img src={image} alt={title} className="w-full h-56 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-2xl font-semibold text-zinc-300">{title}</h3>
        <Link to={`/recipe/${id}`} className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block">
          Ver Detalhes
        </Link>
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={onFavorite} 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Favoritar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
