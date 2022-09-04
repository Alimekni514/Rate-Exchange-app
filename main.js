let fromInput=document.querySelector("#from");
let toInput=document.querySelector("#to");
let firstSelect=document.querySelector(".first select");
let secondSelect=document.querySelector(".second select");
let changeicon=document.querySelector(".change");
let convertBtn=document.querySelector("#convert");
let currencyLink="https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies";
let flag=document.querySelector("#flag");

// REQUEST INFORMATIONS
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c5dcac346msh987e4034ed8b7bap1c627fjsn0e8f78d3f4bd',
		'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
	}
};
const options1 = {
    method: 'GET',
    url: 'https://country-flags.p.rapidapi.com/svg/us',
    headers: {
      'X-RapidAPI-Key': '6c5dcac346msh987e4034ed8b7bap1c627fjsn0e8f78d3f4bd',
      'X-RapidAPI-Host': 'country-flags.p.rapidapi.com'
    }
  };
//change 
changeicon.onclick=()=> {
    [firstSelect.value,secondSelect.value]=[secondSelect.value,firstSelect.value];
    ConvertCurrencies(fromInput);
}

fetchCurrencies(currencyLink);
let convert=(response)=> {
        if(response.success) {
            let {convertedAmount}=response.result;
            toInput.value=convertedAmount;
        }
}
function fetchCurrencies(Link) {
    fetch(Link, options)
	.then(response => response.json())
	.then(response => extractCurrency(response))
	.catch(err => console.error(err));
}
function ConvertCurrencies(element) {
    if(!element.value){
        toInput.value="";
    }
    fetch(`https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${firstSelect.value}&to=${secondSelect.value}&amount=${fromInput.value}`, options)
	.then(response => response.json())
	.then(response =>convert(response))
	.catch(err => console.error(err));
   
}


function extractCurrency(Liste) {
    let listeCurrency=Liste.map(({symbol,name})=>symbol);
    listeCurrency.forEach((symbol)=>{
        let option=document.createElement("option");
        option.textContent=symbol;
        option.value=symbol;
        firstSelect.appendChild(option);
    })
    listeCurrency.forEach((symbol)=>{
        let option=document.createElement("option");
        option.textContent=symbol;
        option.value=symbol;
        secondSelect.appendChild(option);
    })

}
