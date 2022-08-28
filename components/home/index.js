import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../global/redux/characters';
import { CONSTANTS } from '../../global/constants';
import useHttpRequest from '../../hooks/use-http-request';
import Card from '../card';
import Loading from '../loading';
import styles from './styles.module.scss';

const { FETCH_CHARS_URL } = CONSTANTS;

export default function Home(props) {
   const { initialCharacters } = props;                                    // obtain initial characters pre-rendered with SSG
   const characters = useSelector(state => state.chars.characters);        // obtain characters available in app
   const isEmpty = useSelector(state => state.chars.isEmpty);
   const offset = useSelector(state => state.chars.offset);                // represents the number of characters fetched per request (30)
   const dispatch = useDispatch();
   const { isLoading, sendRequest: fetchCharacters } = useHttpRequest();
   const [end, setEnd] = useState(false);                                  // represents if scrolled untill the bottom or not

   // check whether the end of page is reached or not
   function onScroll() {
      if (document.documentElement.scrollTop + ((window.innerHeight * 3) / 2) >= document.documentElement.offsetHeight) {
         !end && setEnd(true);
      } else {
         end && setEnd(false);
      }
   }

   useEffect(() => {
      window.addEventListener('scroll', onScroll);                            // listen the scroll event

      if (isEmpty) {
         dispatch(update({ newCharacters: initialCharacters }));              // add initial 30 characters if no characters are available
      } else if (end && !isLoading) {                                         // fetch more characters when the end of page is reached
         fetchCharacters({
            url: FETCH_CHARS_URL,
            method: 'POST',
            body: { offset }
         }, data => data && dispatch(update({ newCharacters: data })));
      }

      return () => window.removeEventListener('scroll', onScroll);
   }, [end]);

   return (
      <div className={styles.container}>
         <div className={styles.cards}>
            {!isEmpty && characters.map(character => <Card key={character.id} config={character} />)}   {/* display characters */}
         </div>
         {isLoading && <Loading font='3rem' />}   {/* display a spinner if characters have not arrived yet */}
      </div>
   );
}
