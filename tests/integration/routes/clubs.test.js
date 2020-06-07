const request = require('supertest');
const mongoose = require('mongoose');
const Club = require('../../../models/Club');
const User = require('../../../models/User');

let server;

const path = '/api/v1/clubs';

describe(path, () => {
  beforeEach(async () => {
    // eslint-disable-next-line global-require
    server = require('../../../server');
  });

  afterEach(async () => {
    await server.close();
    await Club.deleteMany({});
  });

  describe('POST /', () => {
    let clubId;
    let newClub;
    let token;

    const exec = () => {
      const res = request(server)
        .post(path)
        .set('authorization', `Bearer ${token}`)
        .send(newClub);
      return res;
    };

    beforeEach(async () => {
      clubId = mongoose.Types.ObjectId().toHexString();
      token = new User().getJwt();

      newClub = new Club({
        _id: clubId,
        name: 'Klub Sportowy Polonia 1912 Leszno',
        address: 'Opalińskich 54, 64-100 Leszno',
        division: 'IV liga',
      });
    });

    it('should return 401 if the user is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if the club already exists', async () => {
      await Club.collection.insertOne(newClub);

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('already exists');
    });

    it('should return 400 if club name is not provided', async () => {
      newClub.name = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if club address is not provided', async () => {
      newClub.address = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if club division is not provided', async () => {
      newClub.division = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should add new club to the database if the request is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });

    it('should not save address provided by user to the database', async () => {
      const res = await exec();

      expect(res.body.data.address).toBeUndefined();
    });

    it('should populate club object with properly formatted location field', async () => {
      const res = await exec();

      expect(res.body.data.location).toBeDefined();
      expect(res.body.data.location).toHaveProperty('type');
      expect(res.body.data.location).toHaveProperty('coordinates');
      expect(res.body.data.location).toHaveProperty('formattedAddress');
      expect(res.body.data.location).toHaveProperty('street');
      expect(res.body.data.location).toHaveProperty('city');
      expect(res.body.data.location).toHaveProperty('voivodeship');
      expect(res.body.data.location).toHaveProperty('zipcode');
    });
  });
});
