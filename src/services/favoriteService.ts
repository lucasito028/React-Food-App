export interface Recipe {
    title: string;
    image: string;
    sourceUrl: string;
    id: number;
  }
  
  const FAVORITES_KEY = 'favoriteRecipes';
  
  export const getFavorites = (): Recipe[] => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };
  
  export const addFavorite = (recipe: Recipe): void => {
    const favorites = getFavorites();
    if (!favorites.some((favorite) => favorite.id === recipe.id)) {
      favorites.push(recipe);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  };
  
  export const removeFavorite = (id: number): void => {
    let favorites = getFavorites();
    favorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  };
  