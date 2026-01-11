const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const startTime = Date.now();

// API Health Check
app.get('/health', (req, res) => {
    const uptime = (Date.now() - startTime) / 1000;
    res.json({
        status: 'Backend Microservice Operational',
        uptime: uptime
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Backend API running on port ${port}`);
  });
}

module.exports = app;