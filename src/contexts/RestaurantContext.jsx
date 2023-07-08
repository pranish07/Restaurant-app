import React, { createContext, useReducer, useState } from "react";
import { cuisineData, restaurantsData } from "../data";

const initialState = {
  selectedCuisine: null,
  selectedRestaurant: null,
  restaurants: restaurantsData,
};

export const RestaurantContext = createContext();

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_CUISINE":
      const selectedCuisine = action.payload;
      const filteredRestaurants = restaurantsData.filter(
        (restaurant) => restaurant.cuisine_id === selectedCuisine.id
      );
      return {
        ...state,
        selectedCuisine,
        selectedRestaurant: null,
        restaurants: filteredRestaurants,
      };
    case "SELECT_RESTAURANT":
      return { ...state, selectedRestaurant: action.payload };
    case "SET_RESTAURANTS":
      return { ...state, restaurants: action.payload };
    case "ADD_REVIEW":
      return state;
    case "UPDATE_RESTAURANT":
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
    default:
      return state;
  }
};

export const RestaurantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, {
    ...initialState,
    cuisines: cuisineData,
    restaurants: restaurantsData,
  });
  const [restaurants, setRestaurants] = useState([]);

  const updateRestaurant = (updatedRestaurant) => {

    dispatch({ type: "UPDATE_RESTAURANT", payload: updatedRestaurant });
    const index = restaurants.findIndex(
      (restaurant) => restaurant.id === updatedRestaurant.id
    );
    const updatedRestaurants = [
      ...restaurants.slice(0, index),
      updatedRestaurant,
      ...restaurants.slice(index + 1),
    ];
    setRestaurants(updatedRestaurants);
  };

  const contextValue = {
    restaurants,
    updateRestaurant,
  };
  return (
    <RestaurantContext.Provider value={{ state, dispatch, updateRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};
