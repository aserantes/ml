import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  return (
    <section>
      {response.isLoading && <div>Cargando...</div>}

      {!response.isloading && response.item && <div>{response.item.title}</div>}

      {!response.isLoading && response.errorMsg && (
        <div>Ha ocurrido un error, por favor intenta nuevamente</div>
      )}
    </section>
  );
};

export default ItemDetails;
