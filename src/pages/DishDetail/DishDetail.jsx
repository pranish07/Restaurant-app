import { Button } from "@mui/base";
import { Box, Modal, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RestaurantContext } from "../../contexts/RestaurantContext";

import "./dishDetail.css";
export const DishDetail = () => {
  const { state,updateRestaurant } = useContext(RestaurantContext);
  const { selectedRestaurant } = state;
  const navigate = useNavigate();

  const [averageRating, SetAverageRating] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = () => {

    const newReview = {
      rating: rating,
      comment: comment,
      revName: "Pranish", 
      pp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tbKdv1HDbAjPc526SK0yDZuoOmaaOyGNoj_e1q3ngruK2bTqzub3&s=0",
    };

    const updatedReviews = [...selectedRestaurant.ratings, newReview];
    const updatedRestaurant = {
      ...selectedRestaurant,
      ratings: updatedReviews,
    };

    updateRestaurant(updatedRestaurant);

    handleCloseModal();
    setRating(0);
    setComment("");
  };

  const handleAddReview = () => {
    handleOpenModal();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (selectedRestaurant) {
      let length = selectedRestaurant.ratings.length;
      let totalRating = selectedRestaurant.ratings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      const avgRating = totalRating / length;
      SetAverageRating(avgRating.toFixed(2));
    }
  }, [selectedRestaurant]);

  if (!selectedRestaurant) {
    return null;
  }

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={handleAddReview}>Add Review</button>

      <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={modalStyle}>

        <div className="modal-container">

          <h2>Add Review</h2>
          <TextField
            label="Rating"
            type="number"
            value={rating}
            onChange={handleRatingChange}
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />
          <Button onClick={handleSubmitReview}>Submit</Button>
        </div>
        </Box>
      </Modal>

      <h1>{selectedRestaurant.name}</h1>

      {selectedRestaurant.menu.map((item) => (
        <span key={item.name}>{item.name + "," + " "}</span>
      ))}
      <p>{selectedRestaurant.address}</p>
      <p>Average Rating : {averageRating}</p>
      <hr />

      <h3>Reviews</h3>

      {selectedRestaurant.ratings.map((rating, index) => (
        <div className="review-container" key={index}>
          <div className="review-left">
            <img src={rating.pp} alt={rating.revName} width={50} height={50} />
            <p>{rating.revName}</p>
            <p>Comment: {rating.comment}</p>
          </div>
          <div className="review-right">
            <p>Rating: {rating.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
