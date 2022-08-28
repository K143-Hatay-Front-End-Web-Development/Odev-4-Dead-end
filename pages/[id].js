import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../global/constants';
import useHttpRequest from '../hooks/use-http-request';
import Head from 'next/head';
import Details from '../components/details';
import NotFound from '../components/not-found';

const { FETCH_COMICS_URL } = CONSTANTS;

export default function CharacterDetailsPage() {
   const router = useRouter();
   const id = router.query.id;
   const characters = useSelector(state => state.chars.characters);
   const character = characters.find(char => char.id == id);
   const valid = !!character;
   const name = valid ? character.name : 'Not Found';
   const description = character?.description;
   const [comics, setComics] = useState(null);
   const { isLoading, sendRequest: fetchComics } = useHttpRequest();

   useEffect(() => {
      valid &&
         fetchComics({
            url: FETCH_COMICS_URL,
            method: 'POST',
            body: { id }
         }, data => data && setComics(data));
   }, []);

   return (
      <>
         <Head>
            <title>{name}</title>
            <meta name='description' content={description} />
         </Head>
         {valid && <Details config={{ ...character, comics, isLoading }} />}
         {!valid && <NotFound />}
      </>
   );
}