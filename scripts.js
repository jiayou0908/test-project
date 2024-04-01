window.onload = function() {
    // Function to fetch stock price
    function fetchStockPrice(url, elementId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Parsing HTML response to extract stock price
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(data, 'text/html');
                const priceElement = htmlDocument.querySelector('.Trsdu(0.3s)');

                // Displaying stock price if available, otherwise showing appropriate message
                if (priceElement) {
                    document.getElementById(elementId).innerText = priceElement.innerText;
                } else {
                    const currentTime = new Date();
                    const currentHour = currentTime.getHours();
                    // Checking if it's within trading hours (9:00 - 13:30)
                    if (currentHour >= 9 && currentHour < 13) {
                        document.getElementById(elementId).innerText = 'Price not available';
                    } else {
                        document.getElementById(elementId).innerText = 'Market Closed';
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching stock price:', error);
                document.getElementById(elementId).innerText = 'Error fetching price';
            });
    }

    // Fetch stock prices for specific symbols
    fetchStockPrice('https://tw.stock.yahoo.com/quote/2330.TW', '2330');
    fetchStockPrice('https://tw.stock.yahoo.com/quote/2382.TW', '2382');
};
