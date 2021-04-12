import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post request', async () => {
  const repsonse = await request(app).post('/api/tickets').send({});
  expect(repsonse.status).not.toEqual(404);
});

it('can be only accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('return status other than 401 if the user is signed in', async () => {
  const repsonse = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
  expect(repsonse.status).not.toEqual(401);
});

it('it returns a error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('return errors if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: -10,
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Test',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {});
