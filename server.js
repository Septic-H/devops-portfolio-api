const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const startTime = Date.now();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  // Return JSON if the client accepts it
  if (req.accepts('json') && req.get('Accept').includes('application/json')) {
    const uptime = (Date.now() - startTime) / 1000; // uptime in seconds
    return res.json({
      status: 'OK. Deployed via Travis CI!',
      uptime: uptime
    });
  }
  // Otherwise return the HTML page
  res.sendFile(path.join(__dirname, 'public', 'pages', 'health.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'pages', '404.html'));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;