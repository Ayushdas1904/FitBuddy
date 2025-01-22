import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { quickSearchFoods, appendFood } from '../redux/actions'; // Import actions
import { selectSelectedItems } from '../redux/selectors';
import '../Style/food.css';
import plus from '../assets/plus.svg';
import cross from '../assets/cross.svg';
import CircularProgressBar from './CircularProgressBar';

export default function Food() {
  const dispatch = useDispatch(); // Initialize dispatch
  const { selected, selectedBranded } = useSelector(selectSelectedItems);
  const meals = useSelector(state => state.food.meals || {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: []
  });

  const [fetchedCalories, setFetchedCalories] = useState(0); // Assume from DB
  const [totalCalorieIntake, setTotalCalories] = useState(2000);// Assume from DB
  const [plusRotation, setPlusRotation] = useState(0); // State for the plus button rotation
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for the pop-up window visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedMeal, setSelectedMeal] = useState(''); // State for selected meal
  const [selectedFood, setSelectedFood] = useState(''); // State for selected food
  const [servings, setServings] = useState(1); // State for servings input

  const [macros, setMacros] = useState({
    protein: { consumed: [], total: [] },
    fats: { consumed: [], total: [] },
    carbs: { consumed: [], total: [] }
  });

  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    // Loop through each meal and add up the nutrition info
    Object.values(meals).forEach(meal => {
      meal.forEach(food => {
        totalCalories += food.nf_calories * food.serving_size;
        totalProtein += food.nf_protein * food.serving_size;
        totalCarbs += food.nf_total_carbohydrate * food.serving_size;
        totalFats += food.nf_total_fat * food.serving_size;
      });
    });

    setFetchedCalories(totalCalories);
    setMacros({
      protein: { consumed: parseFloat(totalProtein.toFixed(1)), total: (0.05*totalCalorieIntake).toFixed(1)}, // Adjust 'total' as per the user's daily goal
      fats: { consumed: parseFloat(totalFats.toFixed(1)), total: (0.03*totalCalorieIntake).toFixed(1)},
      carbs: { consumed: parseFloat(totalCarbs.toFixed(1)), total: (0.125*totalCalorieIntake).toFixed(1) }
    });
  };

  const calculatePercentage = (consumed, total) => {
    return (consumed / total) * 100;
  };

  const rotatePlusButton = () => {
    setPlusRotation(plusRotation + 90);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    setSelectedFood(null); // Reset selected food when popup closes
  };

  // Fetch food items using Redux action
  const fetchFoodItems = () => {
    dispatch(quickSearchFoods(searchQuery)); // Dispatch action to search foods
  };

  // Add food to selected meal using Redux action
  const addFoodToMeal = () => {
    if (selectedMeal && selectedFood) {
      dispatch(appendFood(selectedFood, servings, selectedMeal)); // Dispatch action to add food to meal
      setIsPopupVisible(false); // Close popup after adding food
    }
    calculateTotals();
  };

  useEffect(() => {
    // console.log(meals)
    calculateTotals();
  }, [meals]);

  useEffect(() => {
    // Retrieve calorieIntake from localStorage or state
    const storedCalorieIntake = localStorage.getItem('calorieIntake');
    if (storedCalorieIntake) {
      setTotalCalories(storedCalorieIntake);
    }
  }, []);

  
  

  // Handle food item selection
  const handleFoodSelection = (foodItem) => {
    setSelectedFood(foodItem); // Set selected food
    setIsPopupVisible(true); // Show popup
  };

  return (
    <div className="food">
      {/* Food selection and progress */}
      <div className="total-food">
        <div className="total-cal">
          <CircularProgressBar percentage={Math.round(calculatePercentage(fetchedCalories, totalCalorieIntake))} />

          <div className="calorie-text">
            <h3>{fetchedCalories} / {totalCalorieIntake}</h3>
            <h5>calories consumed</h5>
          </div>
        </div>
        <div className="macros">
          {Object.entries(macros).map(([macro, { consumed, total }]) => (
            <div key={macro} className="macro-progress-container">
              <div className="macro-label">
                <span>{macro.charAt(0).toUpperCase() + macro.slice(1)}: {consumed}g / {total}g</span>
                <span>({Math.round(calculatePercentage(consumed, total))}%)</span>
              </div>
              <div className="line-progress">
                <div
                  className="line-fill"
                  style={{ width: `${calculatePercentage(consumed, total)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Sections */}
      <div className="add-food">
        <div className="meals breakfast">
          <h3>Breakfast</h3>
          <ul>
            {meals.breakfast.map((item, index) => (
              <li key={index}>
                <img src={item.thumb} alt="" />
                <div>{item.food_name}
                  <h5>{item.serving_size} {item.serving_unit}</h5>
                </div>
                <hr />
                <div>{item.nf_calories * item.serving_size} kCal</div>
                <div>Protein: {item.nf_protein * item.serving_size} g</div>
                <div>Carbs: {item.nf_total_carbohydrate * item.serving_size} g</div>
                <div>Fats: {item.nf_total_fat * item.serving_size} g</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="meals lunch">
          <h3>Lunch</h3>
          <ul>
            {meals.lunch.map((item, index) => (
              <li key={index}>
                <img src={item.thumb} alt="" />
                <div>{item.food_name}
                  <h5>{item.serving_size} {item.serving_unit}</h5>
                </div>
                <hr />
                <div>{item.nf_calories * item.serving_size} kCal</div>
                <div>Protein: {item.nf_protein * item.serving_size} g</div>
                <div>Carbs: {item.nf_total_carbohydrate * item.serving_size} g</div>
                <div>Fats: {item.nf_total_fat * item.serving_size} g</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="meals snacks">
          <h3>Snacks</h3>
          <ul>
            {meals.snacks.map((item, index) => (
              <li key={index}>
                <img src={item.thumb} alt="" />
                <div>{item.food_name}
                  <h5>{item.serving_size} {item.serving_unit}</h5>
                </div>
                <hr />
                <div>{item.nf_calories * item.serving_size} kCal</div>
                <div>Protein: {item.nf_protein * item.serving_size} g</div>
                <div>Carbs: {item.nf_total_carbohydrate * item.serving_size} g</div>
                <div>Fats: {item.nf_total_fat * item.serving_size} g</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="meals dinner">
          <h3>Dinner</h3>
          <ul>
            {meals.dinner.map((item, index) => (
              <li key={index}>
                <img src={item.thumb} alt="" />
                <div>{item.food_name}
                  <h5>{item.serving_size} {item.serving_unit}</h5>
                </div>
                <hr />
                <div>{item.nf_calories * item.serving_size} kCal</div>
                <div>Protein: {item.nf_protein * item.serving_size} g</div>
                <div>Carbs: {item.nf_total_carbohydrate * item.serving_size} g</div>
                <div>Fats: {item.nf_total_fat * item.serving_size} g</div>
              </li>
            ))}
          </ul>
        </div>
        {/* Other meal sections */}
      </div>

      {/* Add food button */}
      <button className="plus"
        onClick={() => {
          rotatePlusButton();
          togglePopup();
        }}
        style={{
          transform: `rotate(${plusRotation}deg)`,
          transition: 'transform 0.5s ease'
        }}>
        <img className='invert' src={plus} alt="Plus Icon" />
      </button>

      {/* Popup for food details */}
      {isPopupVisible && (
        <div className={`popup ${isPopupVisible ? 'visible' : ''}`}>
          {selectedFood ? (
            <div className='selectedFood-details' >
              <h3>{selectedFood.food_name}</h3>
              {/* <p>Calories: {selectedFood.nf_calories} kcal</p> */}
              <div>
              <label htmlFor="servings">Servings:</label>
              <input
                type="number"
                id="servings"
                value={servings}
                min="1"
                onChange={(e) => setServings(e.target.value)}
              />
              <h5>{selectedFood.serving_unit}</h5>
              </div>
              <button className='add-btn' onClick={addFoodToMeal}>Add to {selectedMeal}</button>
            </div>
            
          ) : (
            <div>
              <h3>Add Food</h3>
              {/* Food search and selection */}
              <div className="search-div">
                <select className='custom-select' onChange={(e) => setSelectedMeal(e.target.value)}>
                  <option value="">Select Meal</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="snacks">Snacks</option>
                  <option value="dinner">Dinner</option>
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search food..."
                />
                <button className='search-btn' onClick={fetchFoodItems}>Search</button>
              </div>

              {selected.length > 0 || selectedBranded.length > 0 ?
                <div className="search-results">
                  {/* Display common foods */}
                  <h3>COMMON FOODS</h3>
                  {selected.length > 0 ? selected.map((foodItem, index) => (
                    <div key={index} onClick={() => handleFoodSelection(foodItem)}>
                      <img src={foodItem.thumb} alt="" />
                      <h5>{foodItem.food_name}</h5>
                    </div>
                  )) : null}
                  {/* Display branded foods */}
                  <h3>BRANDED FOODS</h3>
                  {selectedBranded.length > 0 ? selectedBranded.map((foodItem, index) => (
                    <div key={index} onClick={() => handleFoodSelection(foodItem)}>
                      <h5>{foodItem.food_name}</h5>
                    </div>
                  )) : null}
                </div> : null
              }

            </div>
          )}
          <div className='close-btn' onClick={togglePopup}>
            <img className='invert' src={cross} alt="Close Icon" />
          </div>
        </div>
      )}
    </div>
  );
}
