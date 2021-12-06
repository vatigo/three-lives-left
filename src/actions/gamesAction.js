import axios from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL,
} from "../api";

export const loadGames = () => async (dispatch) => {
  try {
    const promise1 = axios.get(popularGamesURL);
    const promise2 = axios.get(upcomingGamesURL);
    const promise3 = axios.get(newGamesURL);

    axios.all([promise1, promise2, promise3]).then(
      axios.spread((response1, response2, response3) => {
        dispatch({
          type: "FETCH_GAMES",
          payload: {
            popular: response1.data.results,
            upcoming: response2.data.results,
            newgames: response3.data.results,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
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
