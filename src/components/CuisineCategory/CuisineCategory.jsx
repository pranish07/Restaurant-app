import React, { useContext } from "react";
import { RestaurantContext } from "../../contexts/RestaurantContext";
import { cuisineData } from "../../data";
import "./cuisineCategory.css"
export const CuisineCategory = () => {
  const { state, dispatch } = useContext(RestaurantContext);

  const handleCuisineSelection = (cuisine) => {
    dispatch({ type: "SELECT_CUISINE", payload: cuisine });
  };
  return (
    <div>
      {cuisineData.map((cuisine) => (
        <button key={cuisine.id} className="category-btn" onClick={() => handleCuisineSelection(cuisine)}>
          {cuisine.name}
        </button>
      ))}
    </div>
  );
};
