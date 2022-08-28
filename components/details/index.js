import Card from '../card';
import Loading from '../loading';
import styles from './styles.module.scss';

export default function Details(props) {
   const { name, description, thumbnail, comics, isLoading } = props.config;
   const { path, extension } = thumbnail;
   const imageURL = `${path}.${extension}`;

   return (
      <div className={styles.container}>
         <h1>{name}</h1>
         {description && <h3>{description}</h3>}
         <div className={styles.group}>
            <img src={imageURL} onClick={() => window.open(imageURL, '_blank')} />
            <div className={styles['sub-group']}>
               <h2>Comics</h2>
               {isLoading && <Loading font='2rem' />}
               {!isLoading && comics?.map(comic => <Card key={comic.id} config={comic} comic />)}
               {!isLoading && comics?.length === 0 && <p>No comics found</p>}
            </div>
         </div>
      </div>
   );
}
