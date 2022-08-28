import axios from 'axios';
import { Comic } from '../../../utils/comic';
import { Character } from '../../../utils/character';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_API_KEY = '20760d37bb8638e9635cb58a4b398c26';
// const PRIVATE_API_KEY
const CHARS_LIMIT = 30;
const COMICS_LIMIT = 10;

const ts = 1; // Date.now();
const hash = 'fd618c03d776f1df170f175ef822b52c'; // md5(ts + PRIVATE_API_KEY + PUBLIC_API_KEY);

const CHARS_URL = offset => `${BASE_URL}/characters?limit=${CHARS_LIMIT}&offset=${offset}&ts=${ts}&apikey=${PUBLIC_API_KEY}&hash=${hash}`;
const COMICS_URL = id => `${BASE_URL}/characters/${id}/comics?orderBy=onsaleDate&limit=${COMICS_LIMIT}&ts=${ts}&apikey=${PUBLIC_API_KEY}&hash=${hash}`;

export async function fetchCharacters(offset) {
   const response = await axios.get(CHARS_URL(offset));
   const characters = response.data.data.results.map(char => new Character(
      char.id,
      char.name,
      char.description,
      char.thumbnail
   ));

   return JSON.parse(JSON.stringify(characters));
}

export async function fetchComics(id) {
   const response = await axios.get(COMICS_URL(id));
   const comics = response.data.data.results.map(comic => new Comic(
      comic.id,
      comic.title,
      comic.description,
      comic.thumbnail,
      comic.urls[0].url
   ));

   return JSON.parse(JSON.stringify(comics));
}