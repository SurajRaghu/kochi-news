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
