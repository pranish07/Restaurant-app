import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CuisineCategory } from "../../components/CuisineCategory/CuisineCategory";
import { RestaurantContext } from "../../contexts/RestaurantContext";

import "./home.css";
export const Home = () => {
  const { state, dispatch } = useContext(RestaurantContext);
  const { selectedCuisine, restaurants } = state;

  const handleRestaurantSelection = (restaurant) => {
    dispatch({ type: "SELECT_RESTAURANT", payload: restaurant });
  };
  const filteredRestaurants = selectedCuisine
    ? restaurants.filter(
        (restaurant) => restaurant.cuisine_id === selectedCuisine.id
      )
    : [];
  if (!selectedCuisine) {
    return (
      <>
        <h2>Food Ordering App</h2>
        <h3>Select your Cuisine</h3>
        <CuisineCategory />
        <p>Please click on a cuisine to see related restaurants.</p>
      </>
    );
  }

  return (
    <div>
      <h2>Food Ordering App</h2>
      <h3>Select your Cuisine</h3>
      <CuisineCategory />
      {filteredRestaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h1>{restaurant.name}</h1>
          <div className="dish-container">
            {restaurant.menu.map(({ imgSrc, name, price, qty }) => (
              <div key={name} className="dish">
                <NavLink
                  to={`/restaurants/${restaurant.id}`}
                  onClick={() => handleRestaurantSelection(restaurant)}
                >
                  <img src={imgSrc} alt={name} height={250} width={250} />
                  <h3>{name}</h3>
                  <span>{price}</span>
                  <span>{qty}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
