import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import search from "../static/images/ic_Search.png";
import searchBig from "../static/images/ic_Search@2x.png";
import logo from "../static/images/Logo_ML.png";
import logoBig from "../static/images/Logo_ML@2x.png";

const Wrapper = styled.div`
  background-color: ${props => props.theme.primary};
  flex-grow: 1;
`;

const LogoWrapper = styled.div`
  @media (max-width: 640px) {
    margin-left: 10px;
  }
  align-items: center;
  margin-right: 25px;
  margin-left: 150px;
  @media (min-width: 1280px) {
    margin-right: 50px;
    margin-left: 300px;
  }
`;

const LogoImg = styled.div`
  background-image: url(${logo});
  width: 53px;
  height: 36px;
  @media (min-width: 1280px) {
    background-image: url(${logoBig});
    width: 106px;
    height: 72px;
  }
`;

const InputWrapper = styled.div`
  flex: auto;
  height: 56px;
  align-items: center;
  @media (min-width: 1280px) {
    height: 112px;
  }
`;

const Input = styled.input`
  &::placeholder {
    color: ${props => props.theme.lightGray};
  }
  font-size: 16px;
  flex: auto;
  height: 36px;
  border-radius: 4px 0 0 4px;
  padding-left: 15px;
  @media (min-width: 1280px) {
    font-size: 32px;
    height: 76px;
    border-radius: 8px 0 0 8px;
    padding-left: 30px;
  }
`;

const SearchButtonWrapper = styled.div`
  @media (max-width: 640px) {
    margin-right: 10px;
  }
  align-items: center;
  margin-right: 150px;
  @media (min-width: 1280px) {
    margin-right: 300px;
  }
`;

const SearchButton = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: 0 4px 4px 0;
  width: 42px;
  height: 36px;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1280px) {
    border-radius: 0 8px 8px 0;
    width: 84px;
    height: 76px;
  }
`;

const SearchImg = styled.div`
  background-image: url(${search});
  width: 18px;
  height: 18px;
  @media (min-width: 1280px) {
    background-image: url(${searchBig});
    width: 36px;
    height: 36px;
  }
`;

const SearchBar = () => {
  let history = useHistory();
  const [query, setQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);

  useEffect(() => {
    // check if there's a query and submission is enabled
    if (searchTrigger && query) {
      // add query as parameter in url and push to react-router history
      history.push(`/items?search=${query}`);
      setQuery("");
    }
    return () => {
      setSearchTrigger(false);
    };
  }, [searchTrigger, query, history]);

  const handleClick = () => {
    // remove extra whitespaces, trim and set as query param
    setQuery(query.replace(/\s+/g, " ").trim());
    // enable search query
    setSearchTrigger(true);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Link to="/">
          <LogoImg />
        </Link>
      </LogoWrapper>
      <InputWrapper>
        <Input
          type="text"
          name="search box"
          placeholder="Nunca dejes de buscar"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </InputWrapper>
      <SearchButtonWrapper>
        <SearchButton
          type="button"
          name="search button"
          alt="search button"
          onClick={handleClick}
        >
          <SearchImg />
        </SearchButton>
      </SearchButtonWrapper>
    </Wrapper>
  );
};

export default SearchBar;
