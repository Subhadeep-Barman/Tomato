import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext); 

  return (
    <div className="food-item">
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-footer">
          <p className="food-item-price">${price}</p>
          {!cartItems[id] ? (
            <button
              className="add-btn"
              onClick={() => addToCart(id)}
              aria-label={`Add ${name} to cart`}
            >
              +
            </button>
          ) : (
            <div className="food-item-counter">
              <button className="counter-btn" onClick={()=>removeFromCart(id)}>
                −
              </button>
              <p>{cartItems[id]}</p>
              <button className="counter-btn" onClick={()=>addToCart(id)}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
