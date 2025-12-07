const request = require('supertest');
const app = require('../src/app');

describe('API tests', () => {
  test('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /sum should return correct result', async () => {
    const res = await request(app).get('/sum?a=1&b=2');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 3 });
  });

  test('GET /sum with invalid numbers should return 400', async () => {
    const res = await request(app).get('/sum?a=foo&b=bar');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /todos should return empty array at start', async () => {
    const res = await request(app).get('/todos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /todos should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ text: 'Learn CI and Docker' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('text', 'Learn CI and Docker');
  });
});
