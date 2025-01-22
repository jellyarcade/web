import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api.jellyarcade.com//api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCategories = async (locale = "tr") => {
  const { data } = await api.get(`/categories?lang=${locale}`);
  return data;
};

export const getAllGames = async (locale = "tr") => {
  try {
    const { data } = await api.get(`/games?lang=${locale}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching games:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getNewGames = async (locale = "tr") => {
  const { data } = await api.get(`/games?sort=createdAt:desc&limit=8`);
  return data;
};

export const getPopularGames = async (locale = "tr") => {
  const { data } = await api.get(`/games/most-played?limit=8`);
  return data;
};

export const getFeaturedGames = async (locale = "tr") => {
  const { data } = await api.get(`/games/showcased`);
  return data;
};

export const searchGames = async (query, locale = "tr") => {
  const { data } = await api.get(`/games/search?q=${query}`);
  return data;
};

export const playGame = async (gameId) => {
  const { data } = await api.post(`/games/${gameId}/play`);
  return data;
};

export default api;
