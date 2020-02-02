import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const SearchBar = () => {
  let history = useHistory();
  const [query, setQuery] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // check if there's a query and submission is enabled
    if (submit && query) {
      // add query as parameter in url and push to react-router history
      history.push(`/items?search=${query}`);
      setQuery("");
    }
    return () => {
      setSubmit(false);
    };
  }, [submit, query, history]);

  const handleSubmit = e => {
    // prevent legacy form submit
    e.preventDefault();
    // remove extra whitespaces, trim and set as query param
    setQuery(query.replace(/\s+/g, " ").trim());
    // enable search query
    setSubmit(true);
  };

  return (
    <section role="search">
      <Link to="/">
        <div>logo</div>
      </Link>

      <div>
        <form>
          <input
            type="text"
            name="search box"
            placeholder="Nunca dejes de buscar"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <input
            type="image"
            name="submit button"
            src="/Button1.jpg"
            alt="Submit"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
