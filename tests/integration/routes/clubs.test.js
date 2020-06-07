const request = require('supertest');
const mongoose = require('mongoose');
const Club = require('../../../models/Club');
const User = require('../../../models/User');

let server;

const path = '/api/v1/clubs';

describe(path, () => {
  let token;

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

    const exec = () => {
      const res = request(server)
        .post(path)
        .set('authorization', `Bearer ${token}`)
        .send(newClub);
      return res;
    };

    beforeEach(async () => {
      clubId = mongoose.Types.ObjectId().toHexString();
      token = new User({
        role: 'admin',
        location: { coordinates: [16.888641, 52.372821] },
        activeRadius: 100,
      }).getJwt();

      newClub = new Club({
        _id: clubId,
        name: 'Klub Sportowy Polonia 1912 Leszno',
        address: 'Opalińskich 54, 64-100 Leszno',
        division: 'IV liga',
      });
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

  describe('GET /', () => {
    const exec = () => {
      const res = request(server)
        .get(path)
        .set('authorization', `Bearer ${token}`);
      return res;
    };

    it('should return all clubs', async () => {
      const clubs = [{ name: 'club1' }, { name: 'club2' }];

      await Club.collection.insertMany(clubs);

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some((club) => club.name === 'club1')).toBeTruthy();
      expect(res.body.data.some((club) => club.name === 'club2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    let id;

    const exec = () => {
      const res = request(server)
        .get(`${path}/${id}`)
        .set('authorization', `Bearer ${token}`);
      return res;
    };

    it('should return 404 if invalid id is passed', async () => {
      id = 1;

      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if no club with the given id exists', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return a club if valid id is passed', async () => {
      const club = new Club({
        name: 'Klub Sportowy Polonia 1912 Leszno',
        address: 'Opalińskich 54, 64-100 Leszno',
        division: 'IV liga',
      });
      await club.save();

      id = club._id;

      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe('GET /voivodeship/:voivodeship', () => {
    let voivodeship;

    const exec = () => {
      const res = request(server)
        .get(`${path}/voivodeship/${voivodeship}`)
        .set('authorization', `Bearer ${token}`);
      return res;
    };

    it('should return all clubs in the given voivodeship if request is valid', async () => {
      const firstClub = new Club({
        name: 'club1',
        address: 'Opalińskich 54, 64-100 Leszno',
        division: 'IV liga',
      });
      const secondClub = new Club({
        name: 'club2',
        address: 'Kościuszki 26, 99-300 Kutno',
        division: 'IV liga',
      });
      const thirdClub = new Club({
        name: 'club3',
        address: 'Maya 26, 64-000 Kościan',
        division: 'IV liga',
      });

      await firstClub.save();
      await secondClub.save();
      await thirdClub.save();

      voivodeship = 'greater-poland-voivodeship';

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some((club) => club.name === 'club1')).toBeTruthy();
      expect(res.body.data.some((club) => club.name === 'club3')).toBeTruthy();
    });
  });

  describe('GET /radius/activeradius', () => {
    const exec = () => {
      const res = request(server)
        .get(`${path}/radius/activeradius`)
        .set('authorization', `Bearer ${token}`);
      return res;
    };

    it('should return all clubs within active radius', async () => {
      const firstClub = new Club({
        name: 'club1',
        address: 'Opalińskich 54, 64-100 Leszno',
        division: 'IV liga',
      });
      const secondClub = new Club({
        name: 'club2',
        address: 'Kościuszki 26, 99-300 Kutno',
        division: 'IV liga',
      });
      const thirdClub = new Club({
        name: 'club3',
        address: 'Maya 26, 64-000 Kościan',
        division: 'IV liga',
      });

      await firstClub.save();
      await secondClub.save();
      await thirdClub.save();

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.data.some((club) => club.name === 'club1')).toBeTruthy();
      expect(res.body.data.some((club) => club.name === 'club3')).toBeTruthy();
    });
  });
});
