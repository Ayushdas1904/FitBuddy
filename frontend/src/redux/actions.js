
const nutritionAppID = import.meta.env.VITE_NUTRITIONIX_APP_ID;
const nutritionAppKey = import.meta.env.VITE_NUTRITIONIX_APP_KEY;
const nutritionInstantURL = "nutritionix/v2/search/instant";
const nutritionDetailGeneric = "nutritionix/v2/natural/nutrients";
const nutritionDetailBranded = "nutritionix/v2/search/item";

// console.log("App ID:", nutritionAppID);
// console.log("App Key:", nutritionAppKey);


// Error handling
const errorHandling = (resJSON) => {
  console.log("ERROR: Nutritionix");
  console.log(resJSON.message);
}

// Actions
export const quickSearchFoods = (payload) => async (dispatch) => {
  if (payload === '') {
    dispatch({
      type: 'SET_QUICK_SEARCH_DATA',
      payload: { 'common': [], 'branded': [] }
    });
  } else {
    try {
      const response = await fetch(nutritionInstantURL , {
        method: 'POST',
        headers: {
          'x-app-id': nutritionAppID,
          'x-app-key': nutritionAppKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: payload })
      });
      const data = await response.json();
      if (data.message) {
        errorHandling(data);
      } else {
        dispatch({
          type: 'SET_QUICK_SEARCH_DATA',
          payload: data
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
};


export const appendFood = (food, servings, meal) => async (dispatch) => {
  const validServings = isNaN(Number(servings)) ? 1 : Number(servings);

  try {
    // Make a POST request to the '/v2/natural/nutrients' endpoint
    const response = await fetch(nutritionDetailGeneric, {
      method: 'POST',
      headers: {
        'x-app-id': nutritionAppID,
        'x-app-key': nutritionAppKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: `${validServings} ${food.food_name}` }),
    });

    const data = await response.json();

    if (data.foods && data.foods.length > 0) {
      const detailedFood = data.foods[0];

      const compiledFood = {
        food_name: detailedFood.food_name,
        serving_unit: detailedFood.serving_unit,
        serving_weight_grams: detailedFood.serving_weight_grams,
        nf_calories: detailedFood.nf_calories,
        nf_protein: detailedFood.nf_protein,
        nf_total_carbohydrate: detailedFood.nf_total_carbohydrate,
        nf_total_fat: detailedFood.nf_total_fat,
        serving_size: validServings,
        meal_type: meal,
        thumb: detailedFood.photo.thumb,
        ...detailedFood.nix_item_id && { nix_item_id: detailedFood.nix_item_id },
      };

      dispatch({
        type: 'ADD_FOOD',
        payload: { foodItem: compiledFood, mealType: meal },
      });
    } else {
      console.error('No detailed food data returned.');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
