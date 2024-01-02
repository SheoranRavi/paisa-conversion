import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import styles from "./Form.module.css";
import { useEffect, useState, useRef } from "react";
import {getCurrencyRatesFromLocalStorage, setCurrencyRates} from "../../utils/util.js";

export default function Form(props) {
    const [outCurrencyValue, setOutCurrencyValue] = useState(0);
    const [options, setOptions] = useState([]);

    //let options = [];
    const inCurrency = useRef('INR');
    const outCurrency = useRef('USD');
    const inCurrencyValue = useRef(0);
    const currencyRates = useRef({});

    let counter = 0;

    console.log('Form being rendered');

    const inputDropdownName = useRef('inCurrency');
    const outputDropdownName = useRef('outCurrency');

    const getCurrencyRates = function(){
        let exchangeRates = getCurrencyRatesFromLocalStorage();
        let today = Date.now();
        let yesterday = today - 24*60*60*1000;
        if(exchangeRates === null || exchangeRates.lastUpdated < yesterday){
            console.log("fetching currency rates from api...");
            fetch('https://v6.exchangerate-api.com/v6/adfdbf3708c08f27081b070e/latest/USD')
            .then(response => response.json())
            .then(data => {
                data.lastUpdated = Date.now();
                processRates(data);
                setCurrencyRates(data);
            })
        }
        else{
            console.log('got currency rates from local storage.');
            processRates(exchangeRates);
        }
    }

    const getExchangeRate = function(){
        // get exchange rate of in currency against USD
        let inToUsd = 1/currencyRates.current[inCurrency.current];
        let outToUsd = 1/currencyRates.current[outCurrency.current];
        console.log('currency rate: ', currencyRates.current);
        let rate = inToUsd/outToUsd;
        return rate;
    }

    const handleOptionChange = function(args){
        // check which of in or out currency has changed
        if(args.name === inputDropdownName.current){
            inCurrency.current = args.currencySelected;
        }
        else if (args.name === outputDropdownName.current){
            outCurrency.current = args.currencySelected;
        }
        else{
            console.log('args: ', args);
            throw new Error('Unknown currency selected');
        }
        setNewOutValue(inCurrencyValue.current);
    }

    const handleValueChange = function(value){
        // calculate the out currency
        // set the out currency value
        counter++;
        console.log('counter is: ', counter);
        inCurrencyValue.current = value;
        setNewOutValue(value);
    }

    const setNewOutValue = function(value){
        // Calculate the new exchange rate
        let rate = getExchangeRate();
        console.log('Exchange rate: ', rate);
        console.log('In value: ', value);
        // apply to out currency value
        let outValue = value*rate;
        console.log('New out currency value: ', outValue);
        //outCurrencyValue = outValue;
        setOutCurrencyValue(outValue);
    }

    const processRates = function(rates){
        let opt = Object.keys(rates.conversion_rates);
        //options = opt;
        setOptions(opt);
        console.log('Conversion rates : ', rates.conversion_rates);
        currencyRates.current = rates.conversion_rates;
    }

    useEffect(() => {
        getCurrencyRates();
    }, [])

    const showValue = function(){
        console.log('current value of outCuurency is: ', outCurrencyValue);
    }

    console.log('forms styles: ', styles);
    return (
        <div>
            <div className={styles.formContainer}>
                <Dropdown name={inputDropdownName.current} options={options} defaultVal={inCurrency.current} handleChange={handleOptionChange}/>
                <Input name="inCurrencyValue" value={inCurrencyValue.current} isReadonly={false} handleValueChange={handleValueChange}/>
                <Input name="outCurrencyValue" value={outCurrencyValue} isReadonly={true}/>
                <Dropdown name={outputDropdownName.current} options={options} defaultVal={outCurrency.current} handleChange={handleOptionChange}/>
            </div>
        </div>
    )
}