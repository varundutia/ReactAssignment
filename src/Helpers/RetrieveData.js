import axios from "axios";

export const retrieveData = () =>{

    const promise = axios.get(
      `https://v6.exchangerate-api.com/v6/f552d8ab6b104970c5bd2e0c/latest/USD`
    );
    const dataPromise = promise.then((res) => res.data);
  
    return dataPromise;

}