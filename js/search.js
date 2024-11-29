async function fetchStockSymbols(event) {
    const query = event.target.value.trim();
    const dropdown = document.getElementById('dropdown');

    if (!query) {
        dropdown.innerHTML = '';
        return;
    }

    try {
        // Request stock symbols from the backend proxy
     

        //const response = 'msft';//await axios.get(`/api/stocks/proxy/tickers?search=${query}`);
     
    
        //const polygonData = JSON.parse(response.data);// Parse the raw JSON string
    
    
        //const symbols = polygonData.results || [];
     
    

        if (symbols.length === 0) {
            dropdown.innerHTML = '<li>No results found</li>';
            return;
        }

      
        symbols.forEach(symbol => {
            const li = document.createElement('li');
            li.textContent = symbol.ticker;
            dropdown.innerHTML='<li> hello </li>';
            li.onclick = () => selectSymbol(symbol.ticker);
           dropdown.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching stock symbols:', error);
        dropdown.innerHTML = '<li>No results found-catch block</li>';
    }
}

function selectSymbol() {
    const stockValue =  document.getElementById('stock').value;
  
    //alert(stockValue);
    return stockValue;
  
   

}
 function redirectToResults(stockSymbol){
alert (stockSymbol);
   // System.out.println(stockSymbol);
 }