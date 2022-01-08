import './App.css';
import { useEffect, useState } from "react";
import Product from './Components/Product';
import { ProductList } from './Data/ProductList';
import { retrieveData } from './Helpers/RetrieveData';
import { getToday } from './Helpers/GetToday';

function App() {
  //Constants
  const DATA_STRING = "data";
  const CONVERSION_RATE_STRING = "conversion_rates";
  const CONVERSION_STRING = "conversion";
  const INR = 'INR';
  const USD = "USD";
  const [conversion, setConversion] = useState(0);
  const [currency,setCurrency] = useState(INR);

  //Use Effect
  useEffect(() => {

    const localData = JSON.parse(localStorage.getItem(DATA_STRING));

    if(localData != null){
      if (localData[DATA_STRING] !== getToday()) {
          retrieveData().then(raw =>{
            const data = {
              date: getToday(),
              conversion: raw[CONVERSION_RATE_STRING][INR]
            };
          localStorage.setItem(DATA_STRING, JSON.stringify(data));
          setConversion(data[CONVERSION_STRING]);
        });
      } 
      else {
        setConversion(localData[CONVERSION_STRING]);
      }
    }
    else {
      retrieveData().then(raw =>{
        const data = {
          date: getToday(),
          conversion: raw[CONVERSION_RATE_STRING][INR]
        };
        localStorage.setItem(DATA_STRING, JSON.stringify(data));
        setConversion(data[CONVERSION_STRING]);
      });
    }
  }, []);
  
  return (
    <div className="App">
      {
        ProductList.map((item,index)=>{
          let finalCost = (currency === INR)?item.cost:(Math.round(item.cost/conversion* 100)/100);
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
                  <option value="INR">{INR}</option>
                  <option value="USD">{USD}</option>
              </select>
          </label>
        </div> 
      </div>
    </div>
  );
}

export default App;
