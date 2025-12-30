const request = require('supertest');
const app = require('./server');

describe('System Reliability & Routes', () => {
  
  // ==================== HEALTH CHECK ====================
  describe('Health Endpoint', () => {
    it('GET /health should return 200 and serve the health HTML page', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toMatch(/text\/html/);
    });
  });

  // ==================== CORE PAGES ====================
  describe('Core Pages', () => {
    it('GET / should return the Landing HTML page', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toMatch(/text\/html/);
    });
  });

  // ==================== STATIC ASSETS ====================
  describe('Static Assets', () => {
    it('should serve CSS files', async () => {
      const res = await request(app).get('/css/main.css');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toMatch(/text\/css/);
    });

    it('should serve JS files', async () => {
      const res = await request(app).get('/js/main.js');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toMatch(/javascript/);
    });
  });

  // ==================== ERROR HANDLING ====================
  describe('Error Handling', () => {
    it('GET /random-junk should return 404 and the custom error page', async () => {
      const res = await request(app).get('/this-path-does-not-exist');
      expect(res.statusCode).toEqual(404);
      // Ensures your custom 404.html is served, not just text
      expect(res.headers['content-type']).toMatch(/text\/html/);
    });
  });

});