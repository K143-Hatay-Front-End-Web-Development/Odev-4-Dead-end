import { useRouter } from 'next/router';
import styles from './styles.module.scss';

// Card displays either Characters or Comics (decision is done by 'comic' prop)
export default function Card(props) {
   const { config, comic } = props;
   const { description, thumbnail } = config;
   const { path, extension } = thumbnail;
   const variant = comic ? 'landscape_small' : 'portrait_uncanny';
   const src = `${path}/${variant}.${extension}`;
   const title = comic ? config.title : config.name;
   const desc = description ? `${description.slice(0, 200)} ...` : 'Description is not provided';
   const router = useRouter();

   // display character details when clicked a character, or open comic's url when clicked a comic
   const onClick = () => comic ? window.open(config.link, '_blank') : router.push(`/${config.id}`);

   return (
      <div
         className={comic ? styles['container-comic'] : styles.container}
         onClick={onClick}
      >
         <img src={src} />
         <h4>{title}</h4>
         {comic && <p>{desc}</p>}
      </div>
   );
}
