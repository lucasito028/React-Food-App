//Aqui é outra chave se acabar e4a758d270614af791f02bb7a12fdbb0
export const API_KEY = '14830a4bfda14b3f93ab32086234e883';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export const getRecipes = async (ingredient: string = '') => {
  try {
    let query;
    let response;

    if(ingredient !== ''){
      query = ingredient ? `&query=${ingredient}` : '';

      response = await fetch(
      `${BASE_URL}?number=50&apiKey=${API_KEY}${query}`
      );

    }else{
      response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&apiKey=${API_KEY}`
      );
    }

    if (!response.ok) {
      throw new Error('Falha ao buscar receitas.');
    }

    const data = await response.json();
    return data.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      sourceUrl: recipe.sourceUrl || `https://spoonacular.com/recipes/${recipe.id}`,
    }));
  } catch (error) {
    console.error('Deu pau ao buscar receitas:', error);
    throw error;
  }
};
