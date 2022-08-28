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
   const { initialCharacters } = props;
   const characters = useSelector(state => state.chars.characters);
   const isEmpty = useSelector(state => state.chars.isEmpty);
   const offset = useSelector(state => state.chars.offset);
   const dispatch = useDispatch();
   const { isLoading, sendRequest: fetchCharacters } = useHttpRequest();
   const [end, setEnd] = useState(false);

   function onScroll() {
      if (document.documentElement.scrollTop + ((window.innerHeight * 3) / 2) >= document.documentElement.offsetHeight) {
         !end && setEnd(true);
      } else {
         end && setEnd(false);
      }
   }

   useEffect(() => {
      window.addEventListener('scroll', onScroll);

      if (isEmpty) {
         dispatch(update({ newCharacters: initialCharacters }));
      } else if (end && !isLoading) {
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
            {!isEmpty && characters.map(character => <Card key={character.id} config={character} />)}
         </div>
         {isLoading && <Loading font='3rem' />}
      </div>
   );
}
