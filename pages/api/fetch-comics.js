import { fetchComics } from './utils/functions';

export default async function handler(req, res) {
   res.status(200).json(await fetchComics(req.body.id));
}