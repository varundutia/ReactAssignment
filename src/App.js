import './App.css';
import { useEffect, useState } from "react";
import Product from './Components/Product';
import { ProductList } from './Data/ProductList';
import { retrieveData } from './Helpers/RetrieveData';
import { getToday } from './Helpers/GetToday';

function App() {
  const [conversion, setConversion] = useState(0);
  const [currency,setCurrency] = useState("INR");
  

  useEffect(() => {

    const localData = JSON.parse(localStorage.getItem("data"));

    if(localData != null){
      if (localData["date"] !== getToday()) {
          retrieveData().then(raw =>{
          const data = {
            date: getToday(),
            conversion: raw["conversion_rates"]["INR"]
          };
          localStorage.setItem("data", JSON.stringify(data));
          setConversion(data["conversion"]);
        });
      } 
      else {
        setConversion(localData["conversion"]);
      }
    }
    else {
      retrieveData().then(raw =>{
        const data = {
          date: getToday(),
          conversion: raw["conversion_rates"]["INR"]
        };
        localStorage.setItem("data", JSON.stringify(data));
        setConversion(data["conversion"]);
      });
    }
  }, []);
  
  return (
    <div className="App">
      {
        ProductList.map((item,index)=>{
          let finalCost = (currency === "INR")?item.cost:(Math.round(item.cost/conversion* 100)/100);
          return(
            <Product key={index} link={require(""+item.link)} name={item.name} cost={finalCost} type={currency}/>
          )
        })
      }
      <div className='currency-selector'>
        <div className='wrapper'>
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
      </div>
    </div>
  );
}

export default App;
