import axios from "axios";
import React from "react";

export const MAIN_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT_PARAM = 5;
const OFFSET_PARAM = 0;
export interface Data {
  name: string;
  url: string;
}

export interface Card extends Data {
  pokemonSelfApi: {
    sprites: {
      back_default: string;
    };
  };
}

export const fetchData = async (
  url: string = MAIN_URL,
  setData: React.Dispatch<React.SetStateAction<(Card | string)[]>>,
  setPrevPage: React.Dispatch<React.SetStateAction<string>>,
  setNextPage: React.Dispatch<React.SetStateAction<string>>,
  cardsLimit: number = LIMIT_PARAM,
  offset: number = OFFSET_PARAM,
) => {
  try {
    const response = await axios.get(url, {
      params: {
        limit: cardsLimit,
        offset: offset,
      },
    });
    const results: Data[] = response.data.results;

    const cardResponses = await Promise.all(
      results.map(async (result: Data) => {
        const cardData = await axios.get(result.url);
        return { name: result.name, pokemonSelfApi: cardData.data, url: url };
      }),
    );

    setData(cardResponses);
    setPrevPage(response.data.previous);
    setNextPage(response.data.next);
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchData = async (
  urlAPI: string,
  setData: React.Dispatch<React.SetStateAction<(Card | string)[]>>,
  setPrevPage: React.Dispatch<React.SetStateAction<string>>,
  setNextPage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const url = urlAPI.trim();

  if (url === "") {
    fetchData(MAIN_URL, setData, setPrevPage, setNextPage);
    localStorage.removeItem("searchTerm");
    return;
  }

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${url}`,
    );
    const forms: Card[] = response.data.forms;

    const cardResponses = await Promise.all(
      forms.map(async (form: Card) => {
        const cardData = await axios.get(form.url);
        return { name: form.name, pokemonSelfApi: cardData.data, url };
      }),
    );

    localStorage.setItem("searchTerm", url);
    setData(cardResponses);
  } catch (error) {
    console.error(error);
    setData([
      error instanceof Error ? error.message : "An unknown error occurred.",
    ]);
  }
};
