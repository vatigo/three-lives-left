import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import { Link } from "react-router-dom";
import { popup } from "../animations";

import { smallImage } from "../util";

function Game({ name, release, image, id }) {
  const calculateRelease = (release) => {
    const releaseDate = new Date(release);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDiff = releaseDate.getTime() - today.getTime();

    if (releaseDate.getTime() >= today.getTime()) {
      const days = Math.round(timeDiff / (1000 * 3600 * 24));
      if (days > 1) return `Releases in ${days} days!`;
      else if (days === 1) return `Releases tomorrow`;
      else return `Releases today`;
    } else {
      return `Released ${releaseDate.toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}`;
    }
  };

  return (
    <StyledGame variants={popup} initial="hidden" animate="show" layoutId={id}>
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`name ${id}`}>{name}</motion.h3>
        <p>{calculateRelease(release)}</p>
        <motion.img
          layoutId={`image ${id}`}
          src={smallImage(image, 640)}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
}

const StyledGame = styled(motion.div)`
  cursor: pointer;
  height: 20rem;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  a {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
  }
  h3 {
    padding: 1rem;
    color: white;
    position: absolute;
    text-shadow: 0px 0px 3px black, 0px 0px 7px black, 0px 0px 9px black,
      0px 0px 10px black;
    font-size: 1.3rem;
    z-index: 5;
  }
  p {
    padding: 0 1rem;
    position: absolute;
    font-size: 1rem;
    color: white;
    bottom: 0;
    z-index: 5;
    text-shadow: 0px 0px 3px black, 0px 0px 7px black, 0px 0px 9px black,
      0px 0px 10px black;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Game;
