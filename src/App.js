import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Product from './Components/Product';
import {ProductList} from './ProductList';

function App() {
  const [conversion, setConversion] = useState(0);
  const [currency,setCurrency] = useState("INR");
  
  const getToday = () => {
    let today = new Date();
    const date = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();

    let dateToday = date + month + year;
    console.log(date + month + year);

    return dateToday;
  };

  const retriveData = () =>{

    axios.get(
      `https://v6.exchangerate-api.com/v6/f552d8ab6b104970c5bd2e0c/latest/USD`
    )
    .then((res) => {
      const raw = res.data;
      const data = {
        date: getToday(),
        conversion: raw["conversion_rates"]["INR"]
      };
      setConversion(data["conversion"]);
      console.log("called API");
      localStorage.setItem("data", JSON.stringify(data));
    });
  
  }

  useEffect(() => {

    const localData = JSON.parse(localStorage.getItem("data"));

    if(localData != null){
      if (localData["date"] !== getToday()) {
        retriveData();  
      } else {
        setConversion(localData["conversion"]);
      }
    }
    else{
      retriveData();
    }
  
  }, []);
  
  return (
    <div className="App">
      {
        ProductList.map((item,index)=>{
          let finalCost = (currency === "INR")?item.cost:(item.cost/conversion);
          return(
            <Product key={index} link={require(""+item.link)} name={item.name} cost={finalCost} type={currency}/>
          )
        })
      }
      <label>Currency
          <select
            id="currency"
            name="currency"
            onChange={(event)=>{setCurrency(event.target.value)}}
          >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
          </select>
      </label> 
    </div>
  );
}

export default App;
