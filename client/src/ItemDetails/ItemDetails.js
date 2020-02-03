import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ItemWrapper = styled.div`
  @media (max-width: 1279px) {
    margin: 50px 10px;
  }
  display: flex;
  white-space: space-between;
  background-color: ${props => props.theme.white};
  margin: 50px 150px;
  border-radius: 4px;
  flex-direction: column;
  padding: 32px;
  @media (min-width: 2560px) {
    margin: 100px 300px;
    border-radius: 8px;
    padding: 64px;
  }
`;

const Message = styled.p`
  text-align: center;
  padding: 10px;
  font-size: 16px;
  background-color: ${props => props.theme.white};
  border-radius: 4px;
  & span {
    font-weight: bold;
  }
  @media (min-width: 2560px) {
    padding: 20px;
    font-size: 32px;
    border-radius: 8px;
  }
`;

const ImageInfoWrapper = styled.div`
  flex-direction: row;
  justify-content: space-between;
`;

const ItemImage = styled.div`
  @media (max-width: 1279px) {
    min-height: 340px;
    min-width: 340px;
  }
  background-image: url(${props => props.picture});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #333;
  min-height: 680px;
  min-width: 680px;
  border-radius: 4px;
  @media (min-width: 2560px) {
    min-height: 1360px;
    min-width: 1360px;
    border-radius: 8px;
  }
`;

const ItemInfo = styled.div`
  flex-direction: column;
  padding-left: 32px;
  max-width: 250px;
  @media (min-width: 2560px) {
    padding-left: 64px;
    max-width: 500px;
  }
`;

const ConditionSoldQty = styled.div`
  font-size: 14px;
  @media (min-width: 2560px) {
    font-size: 28px;
  }
`;

const Title = styled.div`
  margin-top: 16px;
  font-size: 24px;
  font-weight: 600;
  @media (min-width: 2560px) {
    margin-top: 32px;
    font-size: 48px;
  }
`;

const Price = styled.div`
  font-size: 46px;
  margin: 32px 0;
  @media (min-width: 2560px) {
    font-size: 92px;
    margin: 64px 0;
  }
`;

const BuyButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  width: auto;
  height: 44px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.highLight};
  color: ${props => props.theme.white};
  border-radius: 4px;
  @media (min-width: 2560px) {
    height: 88px;
    font-size: 32px;
    border-radius: 8px;
  }
`;

const DescriptionTitle = styled.div`
  color: ${props => props.theme.darkGray};
  font-size: 28px;
  margin: 32px 0;
  @media (min-width: 2560px) {
    font-size: 48px;
    margin: 64px 0;
  }
`;

const Description = styled.p`
  @media (max-width: 1279px) {
    width: 340px;
  }
  width: 680px;
  color: ${props => props.theme.gray};
  @media (min-width: 2560px) {
    font-size: 32px;
    width: 1360px;
  }
`;

const ItemDetails = () => {
  // abstract axios call with id as argument
  async function getItemDetails(id) {
    try {
      setResponse({ isLoading: true });
      const response = await axios.get(`/api/items/${id}`);
      // on success set resulting items array
      setResponse({
        isLoading: false,
        item: response.data.item
      });
    } catch (error) {
      // on error set error msg
      setResponse({
        isLoading: false,
        errorMsg: error.message
      });
    }
  }

  let { id } = useParams();

  useEffect(() => {
    // on every render, check if there's an id in the URL parameters and call getItemDetails (abstracted axios call) with the id as argument
    if (id) {
      getItemDetails(id);
    }
  }, [id]);

  const [response, setResponse] = useState({});

  console.log(response);

  return (
    <ItemWrapper>
      {response.isLoading && <Message>Cargando...</Message>}
      {!response.isloading && response.item && (
        <>
          <ImageInfoWrapper>
            <ItemImage picture={response.item.picture} />
            <ItemInfo>
              <ConditionSoldQty>
                {response.item.condition} - {response.item.sold_quantity}{" "}
                vendidos
              </ConditionSoldQty>
              <Title>{response.item.title}</Title>
              <Price>{`${response.item.price.currency === "ARS" &&
                "$"} ${response.item.price.amount
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`}</Price>
              <BuyButton>Comprar</BuyButton>
            </ItemInfo>
          </ImageInfoWrapper>
          <DescriptionTitle>Descripci&oacute;n del producto</DescriptionTitle>
          <Description>{response.item.description}</Description>
        </>
      )}
      {!response.isLoading && response.errorMsg && (
        <Message>Ha ocurrido un error, por favor intenta nuevamente</Message>
      )}
    </ItemWrapper>
  );
};

export default ItemDetails;
