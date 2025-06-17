import axios from "axios";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters(page: number): Promise<CharactersResponse> {
  const res = await axios.get(`${BASE_URL}/character`, {
    params: { page }
  });
  return res.data;
}

export async function fetchCharacter(id: string): Promise<Character> {
  const res = await axios.get(`${BASE_URL}/character/${id}`);
  return res.data;
}