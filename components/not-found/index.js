import DefaultErrorPage from 'next/error';
import styles from './styles.module.scss';

// NotFound is displayed to inform client that page is not found
export default function NotFound() {
   return (
      <div className={styles.error} >
         <DefaultErrorPage statusCode={404} />
      </div>
   );
}
