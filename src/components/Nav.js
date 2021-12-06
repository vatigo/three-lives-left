import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import logo from "../img/logo.png";
import { useState } from "react";
//Redux and Routes
import { fetchSearch, clearSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { fadeIn } from "../animations";

function Nav() {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");
  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (textInput && textInput !== "") dispatch(fetchSearch(textInput));
    else clearSearched();
  };

  const clearSearched = () => {
    setTextInput("");
    dispatch(clearSearch);
  };
  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearched}>
        <div className="images">
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
        </div>
        <h1>Three Lives Left</h1>
        <h4>A videogame database</h4>
      </Logo>
      <form className="search" onReset={clearSearched} onSubmit={submitSearch}>
        <input value={textInput} required onChange={inputHandler} type="text" />
        <button className="clear" type="reset"></button>
        <button type="submit">Search</button>
      </form>
    </StyledNav>
  );
}

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0;
    margin-top: 1rem;
    height: 3.1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 1);
    background-color: #eee;
    vertical-align: top;
  }
  button {
    font-size: 1.5rem;
    margin-top: 1rem;
    border: none;
    padding: 0.5rem 2rem;
    background: #ff7676;
    color: white;
    cursor: pointer;
    height: 3.1rem;
    vertical-align: top;
  }

  .clear {
    border: 1px solid transparent;
    background-color: transparent;
    display: inline-block;
    vertical-align: middle;
    outline: 0;
    cursor: pointer;
    position: relative;
    padding: 0;
    border: 0;
  }
  .clear:after {
    content: "X";
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    background-color: #fa9595;
    z-index: 1;
    right: 0.7rem;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 2px;
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: normal;
    font-size: 12px;
    box-shadow: 0 0 2px #e50f0f;
    cursor: pointer;
  }

  input:not(:valid) ~ .clear {
    display: none;
  }

  .search,
  input {
    position: relative;
    padding: 10px;
  }

  @media (max-width: 470px) {
    padding: 1rem 1rem;
    input {
      width: 70%;
      font-size: 1rem;
    }
    button {
      width: 30%;
      padding: 0;
      font-size: 1rem;
    }
  }
`;

const Logo = styled(motion.div)`
  padding: 1rem;
  color: white;
  font-family: "Bungee", cursive;
  font-size: 3rem;
  cursor: pointer;
  .images {
    display: flex;
    justify-content: center;
  }
  h1,
  h4 {
    text-shadow: 0px 0px 20px black;
  }
  h4 {
    font-size: 2rem;
  }
  img {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 470px) {
    h1 {
      font-size: 2rem;
    }
    h4 {
      font-size: 1rem;
      font-weight: 400;
    }
  }
`;

export default Nav;
