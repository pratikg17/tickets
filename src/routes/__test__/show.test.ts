import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
  await request(app).get('/api/tickets/sasasauq').send().expect(404);
});

it('it return the ticket if the ticket is found', async () => {
  const title = 'test';
  const price = 20;
  const reponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${reponse.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.price).toEqual(price);
  expect(ticketResponse.title).toEqual(title);
});
