import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCategories = async (locale = "tr") => {
  const { data } = await api.get(`/categories?lang=${locale}`);
  return data;
};

export const getNewGames = async (locale = "tr") => {
  const { data } = await api.get(
    `/games?lang=${locale}&sort=createdAt:desc&limit=8`
  );
  return data;
};

export const getPopularGames = async (locale = "tr") => {
  const { data } = await api.get(
    `/games?lang=${locale}&sort=playCount:desc&limit=8`
  );
  return data;
};

export const getFeaturedGames = async (locale = "tr") => {
  const { data } = await api.get(`/games/showcased?lang=${locale}`);
  return data;
};

export const searchGames = async (query, locale = "tr") => {
  const { data } = await api.get(`/games/search?q=${query}&lang=${locale}`);
  return data;
};
