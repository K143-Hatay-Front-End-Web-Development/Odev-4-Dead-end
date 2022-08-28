import 'primeicons/primeicons.css';

export default function Loading({ font }) {
   return (
      <i
         className='pi pi-spin pi-spinner'
         style={{ 'fontSize': font }}
      />
   );
}
