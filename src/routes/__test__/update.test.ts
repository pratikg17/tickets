import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin)
    .send({
      title: '1291',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: '1291',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own a ticket', async () => {});

it('returns a 400 if the user provides an invalid ticket or price', async () => {});

it('updates the tickets provided valid inputs', async () => {});
