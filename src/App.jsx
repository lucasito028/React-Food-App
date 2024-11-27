import React, { useState, useEffect } from 'react';
import config from '../config'
import Spoonacular from 'spoonacular';
// Configurar a API com a chave
const defaultClient = Spoonacular.ApiClient.instance;
const apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = config.apiKey;

const apiInstance = new Spoonacular.DefaultApi();

function App() {
  const [options, setOptions] = useState([]); // Estado para armazenar as opções da API
  const [selectedValue, setSelectedValue] = useState(''); // Estado para armazenar o valor selecionado
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para chamar a API e buscar dados
  const analyzeRecipe = async () => {
    const analyzeRecipeRequest = {
      title: 'Spaghetti Carbonara',
      servings: 2,
      ingredients: [
        '1 lb spaghetti',
        '3.5 oz pancetta',
        '2 Tbsps olive oil',
        '1 egg',
        '0.5 cup parmesan cheese',
      ],
      instructions: `Bring a large pot of water to a boil and season generously with salt. 
                      Add the pasta to the water once boiling and cook until al dente. 
                      Reserve 2 cups of cooking water and drain the pasta.`,
    };

    const opts = {
      language: 'en', // Idioma: 'en' ou 'de'
      includeNutrition: true, // Incluir dados nutricionais
      includeTaste: false, // Excluir informações de sabor
    };

    try {
      const response = await new Promise((resolve, reject) => {
        apiInstance.analyzeRecipe(analyzeRecipeRequest, opts, (error, data, response) => {
          if (error) reject(error);
          else resolve(data);
        });
      });

      // Supondo que `response` contém as informações para popular o select
      if (response.nutrition && response.nutrition.ingredients) {
        setOptions(response.nutrition.ingredients); // Ajusta o estado com os ingredientes retornados
      }
      setLoading(false); // Desativa o carregamento
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      setLoading(false); // Mesmo com erro, desativa o carregamento
    }
  };

  // Chamar a API ao montar o componente
  useEffect(() => {
    analyzeRecipe();
  }, []); // Executa apenas uma vez

  // Função para capturar a mudança no select
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <h1>Selecione um ingrediente</h1>
      {loading ? (
        <p>Carregando opções...</p>
      ) : (
        <select value={selectedValue} onChange={handleChange}>
          <option value="" disabled>
            -- Escolha um ingrediente --
          </option>
          {options.map((ingredient, index) => (
            <option key={index} value={ingredient.name}>
              {ingredient.name} ({ingredient.amount} {ingredient.unit})
            </option>
          ))}
        </select>
      )}

      {selectedValue && <p>Você selecionou: {selectedValue}</p>}
    </>
  );
}

export default App;
