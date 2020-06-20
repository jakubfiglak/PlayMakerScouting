const request = require('supertest');
const mongoose = require('mongoose');
const Match = require('../../../models/Match');
const Club = require('../../../models/Club');
const User = require('../../../models/User');

let server;

const path = '/api/v1/matches';

describe(path, () => {
  beforeEach(async () => {
    // eslint-disable-next-line global-require
    server = require('../../../server');
  });

  afterEach(async () => {
    await server.close();
    await Match.deleteMany({});
    await Club.deleteMany({});
  });

  describe('POST /', () => {
    let matchId;
    let newMatch;
    let token;
    let homeTeamId;
    let awayTeamId;
    let homeTeam;
    let awayTeam;

    const exec = () => {
      const res = request(server)
        .post(path)
        .set('authorization', `Bearer ${token}`)
        .send(newMatch);
      return res;
    };

    beforeEach(async () => {
      matchId = mongoose.Types.ObjectId().toHexString();
      homeTeamId = mongoose.Types.ObjectId().toHexString();
      awayTeamId = mongoose.Types.ObjectId().toHexString();

      token = new User({
        role: 'admin',
      }).getJwt();

      homeTeam = new Club({
        _id: homeTeamId,
        name: 'club1',
        address: 'Opalińskich 54, 64-100 Leszno',
        division: 'IV liga',
      });

      awayTeam = new Club({
        _id: awayTeamId,
        name: 'club2',
        address: 'Kościuszki 26, 99-300 Kutno',
        division: 'IV liga',
      });

      newMatch = new Match({
        _id: matchId,
        homeTeam: homeTeamId,
        awayTeam: awayTeamId,
        competition: 'league',
        date: '2020-06-19',
      });
    });

    it('should return 404 if the homeTeam is not found', async () => {
      await Club.collection.insertOne(awayTeam);
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if the awayTeam is not found', async () => {
      await Club.collection.insertOne(homeTeam);

      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if the competition type is not provided', async () => {
      await Club.collection.insertOne(awayTeam);
      await Club.collection.insertOne(homeTeam);

      newMatch.competition = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('competition');
    });

    it('should return 400 if the competition type does not match required enum', async () => {
      await Club.collection.insertOne(awayTeam);
      await Club.collection.insertOne(homeTeam);

      newMatch.competition = 'some competition';

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('valid enum');
    });

    it('should return 400 if date is not provided', async () => {
      await Club.collection.insertOne(awayTeam);
      await Club.collection.insertOne(homeTeam);

      newMatch.date = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('date');
    });

    it('should add new match to the database if the request is valid', async () => {
      await Club.collection.insertOne(awayTeam);
      await Club.collection.insertOne(homeTeam);

      const res = await exec();
      expect(res.status).toBe(201);
    });
  });
});
