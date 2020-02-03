import React from "react";
import styled from "styled-components";

import shipping from "../../static/images/ic_shipping.png";
import shippingBig from "../../static/images/ic_shipping@2x.png";

const CardWrapper = styled.div`
  flex-direction: row;
  padding: 16px;
  box-shadow: 0px 32px 1px -32px #999;
  @media (min-width: 2560px) {
    padding: 32px;
  }
`;

const ItemImage = styled.div`
  background-image: url(${props => props.picture});
  background-size: contain;
  min-height: 180px;
  min-width: 180px;
  border-radius: 4px;
  @media (min-width: 2560px) {
    min-height: 320px;
    min-width: 320px;
    border-radius: 8px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  flex-direction: column;
  padding-left: 16px;
  @media (min-width: 2560px) {
    padding-left: 32px;
  }
`;

const PriceWrapper = styled.div`
  align-items: center;
  flex-direction: row;
  margin-top: 16px;
  @media (min-width: 2560px) {
    margin-top: 32px;
  }
`;

const Price = styled.div`
  font-size: 24px;
  @media (min-width: 2560px) {
    font-size: 48px;
  }
`;

const ShippingTag = styled.div`
  min-width: 18px;
  min-height: 18px;
  margin-left: 8px;
  background-image: url(${shipping});
  @media (min-width: 2560px) {
    min-width: 36px;
    min-height: 36px;
    margin-left: 16px;
    background-image: url(${shippingBig});
  }
`;

const Title = styled.p`
  margin-top: 32px;
  font-size: 18px;
  @media (min-width: 2560px) {
    margin-top: 64px;
    font-size: 36px;
  }
`;

const Location = styled.div`
  align-self: flex-end;
  margin-left: auto;
  margin-right: 16px;
  color: ${props => props.theme.darkGray};
  font-size: 12px;
  @media (min-width: 2560px) {
    font-size: 24px;
  }
`;

const ItemCard = ({ item }) => {
  const { picture, price, free_shipping, title, state } = item;
  return (
    <CardWrapper>
      <ItemImage picture={picture} />
      <ItemInfo>
        <PriceWrapper>
          <Price>{`${price.currency === "ARS" &&
            "$"} ${price.amount
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`}</Price>
          {free_shipping && <ShippingTag />}
          <Location>{state}</Location>
        </PriceWrapper>
        <Title>{title}</Title>
      </ItemInfo>
    </CardWrapper>
  );
};

export default ItemCard;
