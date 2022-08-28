import { useRouter } from 'next/router';
import { CONSTANTS } from '../../global/constants';
import styles from './styles.module.scss';

const { HOME } = CONSTANTS;

export default function Header() {
   const router = useRouter();

   return (
      <div className={styles.header}>
         <p onClick={() => router.push(HOME)}>
            MARVEL CHARACTERS
         </p>
      </div>
   );
}
