// Fetch stock symbols dynamically based on user input
async function fetchStockSymbols(event) {
    const query = event.target.value.trim();
    const dropdown = document.getElementById('dropdown');

    // Clear dropdown if query is empty
    if (!query) {
        dropdown.innerHTML = '';
        return;
    }

    try {
        // Call backend to fetch matching stock symbols
        const response = await axios.get(`/api/stocks/search?query=${query}`);
        const symbols = response.data;

        // Handle no results
        if (!symbols || symbols.length === 0) {
            dropdown.innerHTML = '<li>No results found</li>';
            return;
        }

        // Populate the dropdown
        dropdown.innerHTML = '';
        symbols.forEach(symbol => {
            const li = document.createElement('li');
            li.textContent = symbol;
            li.onclick = () => {
                document.getElementById('stock').value = symbol;
                dropdown.innerHTML = ''; // Clear dropdown on selection
            };
            dropdown.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching stock symbols:', error);
        dropdown.innerHTML = '<li>Error fetching symbols</li>';
    }
}

// Handle form submission and send data to backend
function handleDisplayResults() {
    const stockSymbol = document.getElementById('stock').value.trim();
    const startDate = document.getElementById('startDate').value;
    const provider = document.querySelector('input[name="provider"]:checked').value;
    const interval = document.getElementById('dataIntervals').value;

    if (!stockSymbol || !startDate || !provider || !interval) {
        alert('Please fill out all fields.');
        return;
    }

    const requestData = { stockSymbol, startDate, provider, interval };

    axios.post('/api/stocks/analyze', requestData)
        .then(response => {
            console.log('Analysis submitted successfully:', response.data);
            window.location.href = 'results.html';
        })
        .catch(error => {
            console.error('Error submitting analysis:', error);
            alert('Error submitting analysis. Please try again.');
        });
}
