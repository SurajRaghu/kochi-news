async function fetchNews() {
    try {
        const response = await fetch('https://surajraghu.pythonanywhere.com/api/news');
        const news = await response.json();
        const container = document.getElementById('news-container');
        
        container.innerHTML = news.map(item => `
            <div class="news-item">
                <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
                <div class="news-meta">
                    <span>${item.source}</span> • 
                    <span>${item.date}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

fetchNews();
setInterval(fetchNews, 1800000);
fetchAQI();
setInterval(fetchAQI, 1800000);

async function fetchAQI() {
    try {
        const response = await fetch('https://surajraghu.pythonanywhere.com/api/aqi');
        const data = await response.json();
        const aqiContainer = document.getElementById('aqi-container');
        
        if (data.error) {
            aqiContainer.innerHTML = `<div class="aqi-error">Unable to fetch AQI data</div>`;
            return;
        }

        let aqiClass = '';
        if (data.aqi <= 50) aqiClass = 'good';
        else if (data.aqi <= 100) aqiClass = 'moderate';
        else if (data.aqi <= 150) aqiClass = 'unhealthy-sensitive';
        else if (data.aqi <= 200) aqiClass = 'unhealthy';
        else aqiClass = 'very-unhealthy';

        aqiContainer.innerHTML = `
            <div class="aqi-display ${aqiClass}">
                <h2>Current Air Quality</h2>
                <div class="aqi-value">${data.aqi}</div>
                <div class="aqi-time">Last updated: ${data.timestamp}</div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching AQI:', error);
    }
}
