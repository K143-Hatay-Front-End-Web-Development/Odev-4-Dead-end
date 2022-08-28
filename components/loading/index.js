import 'primeicons/primeicons.css';

// Loading is a spinner displayed to inform client on loading
export default function Loading({ font }) {
   return (
      <i
         className='pi pi-spin pi-spinner'
         style={{ 'fontSize': font }}
      />
   );
}
