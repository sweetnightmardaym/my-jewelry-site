import request from 'supertest';
import { app } from '../src/index';
import dataSource from '../ormconfig';

describe('auth flow', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource.destroy();
  });

  it('registers and logs in a user', async () => {
    const reg = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'a@a.com', password: 'password123' });
    expect(reg.status).toBe(200);
    const token = reg.body.token;
    expect(token).toBeDefined();

    const loginBad = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'a@a.com', password: 'wrongpass' });
    expect(loginBad.status).toBe(400);

    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'a@a.com', password: 'password123' });
    expect(login.status).toBe(200);
    const jwt = login.body.token;

    const profile = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${jwt}`);
    expect(profile.status).toBe(200);
    expect(profile.body.email).toBe('a@a.com');
  });
});
