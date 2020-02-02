import React from "react";

const ItemCard = ({ item }) => {
  const {
    // picture, price, free_shipping, title, state,
    city
  } = item;
  return (
    <article>
      <div>{city}</div>
    </article>
  );
};

export default ItemCard;
