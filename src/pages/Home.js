import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
} from "framer-motion/dist/framer-motion";
import GameDetail from "../components/GameDetail";
import { useLocation } from "react-router-dom";
import { loadDetail } from "../actions/detailAction";
import { fadeIn } from "../animations";

const Home = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  //Fetch games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const { game } = useSelector((state) => state.detail);
  useEffect(() => {
    if (pathId && parseInt(pathId) !== game.id) {
      dispatch(loadDetail(pathId));
    }
    if (pathId) document.body.style.overflow = "hidden";
  }, [pathId, dispatch, game.id]);

  const { popular, searched, upcoming, error } = useSelector(
    (state) => state.games
  );

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {error && (
            <Error>
              <p>
                Error: The videogame database is currently unresponsive. Please
                check back at a later time.
              </p>
            </Error>
          )}
          {!error && searched.length && (
            <div className="searched">
              <h2>Search Results</h2>
              <Games>
                {searched.map((game) => (
                  <Game
                    name={game.name}
                    release={game.released}
                    id={game.id}
                    image={game.background_image}
                    key={game.id}
                  />
                ))}
              </Games>
            </div>
          )}
          {!error && pathId && parseInt(pathId) === game.id && (
            <GameDetail pathId={pathId} />
          )}
        </AnimatePresence>
        {!error && (
          <div>
            <h2>Games releasing soon!</h2>
            <Games>
              {upcoming.map((game) => (
                <Game
                  name={game.name}
                  release={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
                />
              ))}
            </Games>
            <h2>Popular Games</h2>
            <Games>
              {popular.map((game) => (
                <Game
                  name={game.name}
                  release={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
                />
              ))}
            </Games>
          </div>
        )}
      </AnimateSharedLayout>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 3rem 0rem;
  }
  @media (max-width: 470px) {
    padding: 0rem 1rem;
  }
`;

const Games = styled(motion.div)`
  padding-bottom: 3rem;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  @media (max-width: 1010px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const Error = styled(motion.div)`
  background: rgb(161, 59, 59);
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
`;

export default Home;
