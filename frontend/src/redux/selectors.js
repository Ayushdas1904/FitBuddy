import { createSelector } from 'reselect';

const selectFoodState = (state) => state.food;

// Memoized selector for selected and selected2
export const selectSelectedItems = createSelector(
  [selectFoodState],
  (foodState) => ({
    selected: foodState.quickSearchData.common || [], // Fetch common items from quick search results
    selectedBranded: foodState.quickSearchData.branded || [], // Fetch branded items from quick search results
  })
);

