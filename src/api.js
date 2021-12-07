require("dotenv").config();
//Base URL
const base_url = "https://api.rawg.io/api/";
//Key
const key = process.env.REACT_APP_RAWG_API_KEY;

//Dates
const getDate = (date) => {
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
};

const today = new Date();
const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);
const nextYear = new Date();
nextYear.setFullYear(nextYear.getFullYear() + 1);
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

//Popular games
export const popularGamesURL = `${base_url}games?key=${key}&dates=${getDate(
  lastMonth
)},${getDate(today)}&ordering=-rating&page_size=10`;

//Upcoming games
export const upcomingGamesURL = `${base_url}games?key=${key}&dates=${getDate(
  today
)},${getDate(nextYear)}&ordering=released&exclude_stores=9&page_size=10`;

//Game details
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}?key=${key}`;

//Screenshots
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${key}`;

//Search
export const searchGameURL = (game_name) =>
  `${base_url}games?search=${game_name}&key=${key}&ordering=-rating&page_size=9`;
