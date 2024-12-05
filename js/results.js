document.addEventListener('DOMContentLoaded', async () => {
    const analysisResults = JSON.parse(localStorage.getItem('analysisResults'));
    if (!analysisResults) {
        alert('No analysis results found. Returning to the form.');
        window.location.href = 'index.html';
        return;
    }

    const { symbol, summary, closingPrices } = analysisResults;

    // Display summary
    document.getElementById('analysisSummary').innerText = summary;

    // Prepare chart data
    const labels = Object.keys(closingPrices).sort();
    const values = labels.map(date => closingPrices[date]);

    createChart(labels, values, symbol);
});

function createChart(labels, values, symbol) {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${symbol} Closing Prices`,
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true }
            },
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Price (USD)' } }
            }
        }
    });
}
