import axios from "axios";
import { popularGamesURL, upcomingGamesURL, searchGameURL } from "../api";

export const loadGames = () => async (dispatch) => {
  const promise1 = axios.get(popularGamesURL);
  const promise2 = axios.get(upcomingGamesURL);

  axios
    .all([promise1, promise2])
    .then(
      axios.spread((response1, response2) => {
        dispatch({
          type: "FETCH_GAMES",
          payload: {
            popular: response1.data.results,
            upcoming: response2.data.results,
          },
        });
      })
    )
    .catch((err) => {
      dispatch({
        type: "ERROR",
        payload: {
          error: err,
        },
      });
    });
};

export const fetchSearch = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(searchGameURL(game_name));
  dispatch({
    type: "FETCH_SEARCHED",
    payload: { searched: searchGames.data.results },
  });
};

export const clearSearch = (dispatch) => {
  dispatch({
    type: "CLEAR_SEARCHED",
  });
};
