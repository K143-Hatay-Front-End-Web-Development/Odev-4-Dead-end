import { fetchCharacters } from './utils/functions';

export default async function handler(req, res) {
   res.status(200).json(await fetchCharacters(req.body.offset));
}