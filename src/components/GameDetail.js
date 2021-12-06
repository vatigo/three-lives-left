import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smallImage } from "../util";

import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";

import StarsRating from "stars-rating";
import { fadeIn } from "../animations";
import { useState } from "react";

function GameDetail({ pathId }) {
  const navigate = useNavigate();

  //Exit detail
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (
      element.classList.contains("shadow") ||
      element.classList.contains("closeBtn")
    ) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
      navigate("/");
    }
  };

  const { screenshots, game, isLoading } = useSelector((state) => state.detail);

  const [isOpen, setIsOpen] = useState(true);

  //platform images
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "PlayStation 5":
        return playstation;
      case "Xbox Series S/X":
        return xbox;
      case "Xbox S":
        return xbox;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <motion.button
            variants={fadeIn}
            initial="hidden"
            animate={isOpen ? "show" : "exit"}
            onClick={exitDetailHandler}
            className="closeBtn"
          >
            X
          </motion.button>
          <Detail layoutId={parseInt(pathId)}>
            <Media className="media">
              <div className="stats-container">
                <Stats className="stats">
                  <div className="rating">
                    <motion.h3 layoutId={`name ${parseInt(pathId)}`}>
                      {game.name}
                    </motion.h3>

                    <div className="rating-content">
                      Rating:{" "}
                      <StarsRating
                        size="24"
                        count="5"
                        edit={false}
                        value={game.rating}
                      />
                    </div>
                  </div>
                  <Info className="info">
                    <h3>Platforms</h3>
                    <Platforms className="platforms">
                      {game.platforms.map((data) => (
                        <span>{data.platform.name}</span>
                        /* <img
                          src={getPlatform(data.platform.name)}
                          key={data.platform.id}
                          alt={data.platform.name}
                        /> */
                      ))}
                    </Platforms>
                  </Info>
                </Stats>
              </div>
              <motion.img
                className="header_img"
                layoutId={`image ${parseInt(pathId)}`}
                src={smallImage(game.background_image, 1280)}
                alt="image1"
              />
            </Media>
            <Description className="description">
              <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
            </Description>
            <Gallery className="gallery">
              {screenshots.results.map((screen) => (
                <img
                  key={screen.id}
                  src={smallImage(screen.image, 1280)}
                  alt="screenshot"
                />
              ))}
            </Gallery>
          </Detail>
        </CardShadow>
      )}
    </>
  );
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;

  .closeBtn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    font-size: 2rem;
    border-radius: 50%;
    border: 0;
    box-shadow: 0px 0px 10px black;
    padding: 0.5rem;
    height: 3rem;
    line-height: 2rem;
    cursor: pointer;
    z-index: 25;
  }
`;

const Detail = styled(motion.div)`
  overflow: hidden;
  z-index: 11;
  margin: 4rem 0rem;
  width: 80%;
  border-radius: 1rem;
  background: black;
  position: absolute;
  left: 10%;
  color: white;
  img {
    width: 100%;
  }

  h3 {
    color: white;
    padding: 0px;
    font-size: 2rem;
  }

  @media (max-width: 1200px) {
    width: 90%;
    left: 5%;
    margin: 2rem 0rem;
    h3 {
      font-size: 1.2rem;
    }
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  z-index: 1;

  .rating {
    background: rgba(0, 0, 0, 0.4);
    padding: 3rem;
    border-radius: 0rem 0rem 5rem 0rem;
    backdrop-filter: blur(2px);
  }

  .rating-content {
    display: flex;
    gap: 1rem;
    color: white;
    align-items: center;
    padding-top: 1rem;
    font-size: 1rem;
  }

  position: absolute;
  width: 100%;

  text-shadow: 2px 1px 10px black;

  span {
    text-shadow: none;
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    background: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    backdrop-filter: blur(2px);
    width: auto;
    max-width: 28%;
    height: 100%;
    .rating {
      padding: 0rem;
      border-radius: 0rem;
      background-color: transparent;
    }
  }

  @media (max-width: 850px) {
    .rating-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    background: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    backdrop-filter: blur(2px);
    width: 100%;
    max-width: 100%;
    height: 100%;
    .rating {
      padding: 0rem;
      border-radius: 0rem;
      background-color: transparent;
    }
  }
`;

const Info = styled(motion.div)`
  text-align: center;

  background: rgba(0, 0, 0, 0.4);
  padding: 3rem;
  border-radius: 0rem 0rem 0rem 5rem;
  backdrop-filter: blur(2px);

  h3 {
    font-size: 1rem;
    padding-bottom: 1rem;
  }

  @media (max-width: 1200px) {
    padding: 0;
    text-align: left;
    border-radius: 0rem;
    background: transparent;
  }
`;

const Gallery = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 2rem 0rem;
  }
`;

const Platforms = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2rem;
  span {
    text-shadow: 2px 1px 10px black;
  }
  img {
    max-height: 3rem;
  }
  @media (max-width: 1200px) {
    gap: 1rem;
    img {
      max-height: 1.5rem;
    }
  }
`;

const Media = styled(motion.div)`
  position: relative;
  .header_img {
    top: 0;
    left: 0;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
    z-index: 0;
  }
`;

const Description = styled(motion.div)`
  padding: 5rem;
  h3 {
    padding: 2rem 0 0.5rem 0;
  }

  @media (max-width: 800px) {
    padding: 2rem;
  }
`;

export default GameDetail;
