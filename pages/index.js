import { fetchCharacters } from './api/utils/functions';
import Home from '../components/home';

// Home page is pre-rendered with 30 initial marvel characters 
export default function HomePage(props) {
   const { characters } = props;

   return <Home initialCharacters={characters} />;
}

// fetch and send 30 initial marvel characters to home page
export async function getStaticProps() {
   const characters = await fetchCharacters(0);

   return { props: { characters } };
}