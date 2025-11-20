import axios from 'axios';

const API_KEY = '0208712e56a44043a4432184897dac4e';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export async function fetchRecipeFromAPI(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        addRecipeInformation: true,
        number: 1,
        apiKey: API_KEY
      }
    });

    const result = response.data.results[0];
    if (!result) return null;

    return {
      title: result.title,
      image: result.image,
      nutrition: result.nutrition?.nutrients?.[0]?.amount || null,
      ingredients: result.extendedIngredients?.map(i => i.original) || [],
      steps: result.analyzedInstructions?.[0]?.steps?.map(s => s.step) || []
    };
  } catch (err) {
    console.log("API ERROR:", err.message);
    return null;
  }
}
