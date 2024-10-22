const initialState = {
  quickSearchData: { common: [], branded: [] }, // Stores the search results
  addedFoods: [], // Stores the food the user adds
  meals: {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: []
  },
};

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_QUICK_SEARCH_DATA':
      return {
        ...state,
        quickSearchData: action.payload, // Save the fetched food data
      };
    case 'ADD_FOOD':{
      const { foodItem, mealType } = action.payload;

      // Update the correct meal array
      return {
        ...state,
        meals: {
          ...state.meals,
          [mealType]: [...state.meals[mealType], foodItem], // Add the food item to the selected meal array
        },
      };
    }
    default:
      return state;
  }
}
