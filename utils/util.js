const ratesKey = 'currencyRates';

export const getCurrencyRatesFromLocalStorage = function(){
    let rates = localStorage.getItem(ratesKey);
    if(rates !== null){
        rates = JSON.parse(rates);
    }
    return rates;
}

export const setCurrencyRates = function(data){
    console.log("storing currency rates in local storage...");
    console.dir(data);
    localStorage.setItem(ratesKey, JSON.stringify(data));
}