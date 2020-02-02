require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

// you can create a .env file at root to store secrets. (See .env.example for syntax)
const port = process.env.PORT || 5000;
const API = process.env.EXT_API || "https://api.mercadolibre.com";

// this route will handle single direct item data requests. Item_id is passed as a url parameter after /api/items/
app.get("/api/items/:id", async (req, res) => {
  //get passed item's id
  const itemId = req.params.id;

  // set both endpoints uris with the item id
  const itemUri = `${API}/items/${itemId}`;
  const descUri = `${API}/items/${itemId}/description`;

  // send a concurrent axios call to both endpoints
  axios
    .all([axios.get(itemUri), axios.get(descUri)])
    .then(
      axios.spread((itemRes, descRes) => {
        // when both resolve, merge and format data from responses
        if (itemRes && descRes) {
          const item = itemRes.data;
          const desc = descRes.data;
          const result = {
            author: {
              name: "Alejandro",
              lastname: "Serantes"
            },
            item: {
              id: item.id,
              title: item.title,
              price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: (item.price - Math.floor(item.price)).toFixed(2) * 100
              },
              picture: item.pictures[0].url,
              condition:
                item.condition !== "not_specified"
                  ? item.attributes.filter(
                      attr => attr.id === "ITEM_CONDITION"
                    )[0].value_name
                  : "",
              free_shipping: item.shipping.free_shipping,
              sold_quantity: item.sold_quantity,
              description: desc.plain_text
            }
          };
          // send the final result
          res.send(result);
        }
      })
    )
    .catch(error => {
      res.status(error.response.data.status).send(error.response.data);
    });
});

// This route will handle item search requests. The query is passed as a query parameter named "q" after /api/items
app.get("/api/items", (req, res) => {
  // get search criteria from the query
  const query = req.query.q;

  // The challenge asks specifically for 4 records (default is 1000). I learned at the MeLi API docs that I can add "limit=4" as a query parameter to achieve that.
  const searchUri = `${API}/sites/MLA/search?q=${query}&limit=4`;
  if (query) {
    // check that query param exists
    axios
      .get(searchUri)
      .then(searchRes => {
        const itemArr = searchRes.data.results;
        const result = {
          author: {
            name: "Alejandro",
            lastname: "Serantes"
          },
          items: itemArr.reduce((acc, item) => {
            acc.push({
              id: item.id,
              title: item.title,
              price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: (item.price - Math.floor(item.price)).toFixed(2) * 100
              },
              picture: item.thumbnail,
              condition:
                item.condition !== "not_specified"
                  ? item.attributes.filter(
                      attr => attr.id === "ITEM_CONDITION"
                    )[0].value_name
                  : "",
              free_shipping: item.shipping.free_shipping,

              // This is not asked for in the exersice, but I need it to show location in search results
              state: item.address.state_name,
              city: item.address.city_name
            });
            return acc;
          }, [])
        };

        res.send(result);
      })
      .catch(error => {
        res.status(error.response.data.status).send(error.response.data);
      });
  } else {
    // if required query param is empty or doesn't exist, send an error
    return res.status(400).send({
      message:
        "ERROR: Missing required query param 'q'. Use /api/items?q=query to search, or send a url param to get data for specific item id. Use /api/items/:id"
    });
  }
});

// this final route will catch any other request and reply with an error, since this API should only respond to the two specific endpoints created above.
app.get("*", (req, res) => {
  return res.status(400).send({
    message: "ERROR: Valid API routes are [/api/items/:id] [/api/items?q=query]"
  });
});

app.listen(port, () => {
  console.log(`node listening on port ${port}`);
});
