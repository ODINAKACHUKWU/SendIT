import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server/index';
import userData from '../fixtures/userData';
import db from ',,/../../server/configs/db';
import createTables from '../../../server/database/migrations/createTables';
import dropTables from '../../../server/database/migrations/dropTables';

chai.use(chaiHttp);

before(async () => {
  try {
    await db.connection();
    await dropTables();
    createTables();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
});

describe('User authentication test', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should signup user if all credentials are valid', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          ...userData,
          email: 'test@email.com',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('Success');
          expect(res.body)
            .to.haveOwnProperty('status')
            .to.be.a('string');
          expect(res.body.message).to.equal('Account created for John Doe');
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body)
            .to.haveOwnProperty('token')
            .to.be.an('string');
          done();
        });
    });

    it('should not signup user if email has already been used', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          ...userData,
          email: 'test@email.com',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('Failure');
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('Account with the email address: test@email.com already exist');
          done();
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login user if all credentials are valid', done => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@email.com',
          password: userData.password,
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('Success');
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('John Doe is logged in');
          expect(res.body)
            .to.haveOwnProperty('token')
            .to.be.a('string');
          done();
        });
    });

    it('should not login user if a wrong password is provided', done => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@email.com',
          password: 'wrong-password',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('Failure');
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('Invalid credentials');
          done();
        });
    });

    it('should not login user if a wrong email is provided', done => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrong-email@email.com',
          password: userData.password,
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('Failure');
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('Invalid credentials');
          done();
        });
    });
  });
});
