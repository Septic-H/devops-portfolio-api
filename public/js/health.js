function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
}

async function fetchHealth() {
    try {
        const response = await fetch('/health', {
            headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();

        document.getElementById('uptime').textContent = formatUptime(data.uptime);
        document.getElementById('uptime-json').textContent = data.uptime.toFixed(2);
        document.getElementById('last-check').textContent = new Date().toLocaleTimeString();
    } catch (error) {
        console.error('Failed to fetch health:', error);
    }
}

// Initial fetch
fetchHealth();

// Refresh every 5 seconds
setInterval(fetchHealth, 5000);

// Manual refresh button
document.getElementById('refresh-btn').addEventListener('click', (e) => {
    e.preventDefault();
    fetchHealth();
});