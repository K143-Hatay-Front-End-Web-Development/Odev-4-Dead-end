import Card from '../card';
import Loading from '../loading';
import styles from './styles.module.scss';

export default function Details(props) {
   const { config } = props;
   const { name, description, thumbnail, comics, isLoading } = config;
   const { path, extension } = thumbnail;
   const imageURL = `${path}.${extension}`;

   return (
      <div className={styles.container}>
         <h1>{name}</h1>
         {description && <h3>{description}</h3>}                                                      {/* display character description if it exists */}
         <div className={styles.group}>
            <img src={imageURL} onClick={() => window.open(imageURL, '_blank')} />                    {/* open character's image on click */}
            <div className={styles['sub-group']}>
               <h2>Comics</h2>
               {isLoading && <Loading font='2rem' />}                                                 {/* display a spinner if comics have not arrived yet */}
               {!isLoading && comics?.map(comic => <Card key={comic.id} config={comic} comic />)}     {/* display comics when they arrived */}
               {!isLoading && comics?.length === 0 && <p>No comics found</p>}                         {/* inform client if there are no comics */}
            </div>
         </div>
      </div>
   );
}
