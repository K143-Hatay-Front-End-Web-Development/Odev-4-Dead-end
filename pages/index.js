import { fetchCharacters } from './api/utils/functions';
import Home from '../components/home';

export default function HomePage(props) {
   const { characters } = props;

   return <Home initialCharacters={characters} />;
}

export async function getStaticProps() {
   const characters = await fetchCharacters(0);

   return { props: { characters } };
}