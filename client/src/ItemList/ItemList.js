import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import styled from "styled-components";

import ItemCard from "./ItemCard/ItemCard";

const ListWrapper = styled.div`
  @media (max-width: 1279px) {
    margin: 50px 10px;
  }
  display: block;
  background-color: ${props => props.theme.white};
  margin: 50px 150px;
  border-radius: 4px;
  @media (min-width: 2560px) {
    margin: 100px 300px;
    border-radius: 8px;
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

const ItemList = () => {
  // abstract axios call with query as argument
  async function searchItems(q) {
    try {
      setResponse({ isLoading: true });
      const response = await axios.get("/api/items", {
        params: { q }
      });
      // on success set resulting items array
      setResponse({
        isLoading: false,
        items: response.data.items
      });
    } catch (error) {
      // on error set error msg
      setResponse({
        isLoading: false,
        errorMsg: error.message
      });
    }
  }

  // get search attribute of useLocation to get the entire stringed parameters, then parse it through queryString
  let params = queryString.parse(useLocation().search);

  useEffect(() => {
    // on every render, check if there's a search parameter in the parsed query params, remove excess whitespace, trim, an call searchItems (abstracted axios call) with the query as argument
    if (params.search) {
      let query = params.search.replace(/\s+/g, " ").trim();
      searchItems(query);
    }
  }, [params.search]);

  const [response, setResponse] = useState({});

  return (
    <ListWrapper>
      {response.isLoading && <Message>Buscando...</Message>}

      {!response.isloading && response.items && response.items.length === 0 && (
        <Message>
          No hay publicaciones que coincidan con <span>"{params.search}"</span>
        </Message>
      )}

      {!response.isloading &&
        response.items &&
        response.items.length > 0 &&
        response.items.map(item => (
          <Link key={item.id} to={`/items/${item.id}`}>
            <ItemCard item={item} />
          </Link>
        ))}

      {!response.isLoading && response.errorMsg && (
        <Message>Ha ocurrido un error, por favor intenta nuevamente.</Message>
      )}
    </ListWrapper>
  );
};

export default ItemList;
