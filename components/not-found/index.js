import DefaultErrorPage from 'next/error';
import styles from './styles.module.scss';

export default function NotFound() {
   return (
      <div className={styles.error} >
         <DefaultErrorPage statusCode={404} />
      </div>
   );
}
