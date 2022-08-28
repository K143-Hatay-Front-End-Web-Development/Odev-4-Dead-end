import Header from '../components/header';
import styles from './styles.module.scss';

export default function Layout(props) {
   return (
      <>
         <Header />
         <div className={styles.content}>
            {props.children}
         </div>
      </>
   );
}
