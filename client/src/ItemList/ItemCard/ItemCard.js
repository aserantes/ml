import React from "react";

const ItemCard = ({ item }) => {
  const {
    // picture, price, free_shipping, title, state,
    city
  } = item;
  return (
    <div>
      <div>{city}</div>
    </div>
  );
};

export default ItemCard;
