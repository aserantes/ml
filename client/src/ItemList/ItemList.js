import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import ItemCard from "./ItemCard/ItemCard";

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
    <section>
      {response.isLoading && <div>Buscando...</div>}

      {!response.isloading && response.items && response.items.length === 0 && (
        <div>No hay publicaciones que coincidan con "{params.search}"</div>
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
        <div>Ha ocurrido un error, por favor intenta nuevamente</div>
      )}
    </section>
  );
};

export default ItemList;
