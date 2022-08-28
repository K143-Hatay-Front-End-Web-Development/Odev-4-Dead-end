import { useState, useCallback } from 'react';
import axios from 'axios';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

// This custom hook was adapted from https://www.udemy.com/course/react-the-complete-guide-incl-redux
export default function useHttpRequest() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const sendRequest = useCallback(async (requestConfig, successCallback) => {
      setIsLoading(true);
      setError(null);
      const method = requestConfig.method ? requestConfig.method : GET;
      const body = requestConfig.body ? requestConfig.body : null;
      let response;

      try {
         switch (method) {
            case GET:
               response = await axios.get(requestConfig.url);
               break;
            case POST:
               response = await axios.post(requestConfig.url, body);
               break;
            case PUT:
               response = await axios.put(requestConfig.url, body);
               break;
            case DELETE:
               response = await axios.delete(requestConfig.url, { data: { id: body.id } });
               break;
            default:
               break;
         }

         if (response.status !== 200) {
            throw new Error('Request failed!');
         }

         if (!!successCallback) successCallback(response.data);
      } catch (err) {
         setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
   }, []);

   return { isLoading, error, sendRequest };
}