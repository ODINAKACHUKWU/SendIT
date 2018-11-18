import chaiHttp from 'chai-http';
import chai from 'chai';
import myApp from '../server/index';
import { parcels, users } from '../server/db';

chai.should();

chai.use(chaiHttp);

describe('Parcel API endpoints', () => {
  it('should fetch all the parcels', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        parcels.should.be.an('array');
        parcels.should.have.lengthOf(3);
        res.body.should.have.property('status').eq('Success');
        res.body.should.have.property('message').eql('Parcels retrieved');
        done();
      });
  });

  it('should fetch a parcel by id', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels/3')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('status').eql('Success');
        res.body.should.have.property('message').eql('Parcel retrieved');
        done();
      });
  });

  it('should return a notification message if parcel is not found', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels/10')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('status').eql('Failure');
        res.body.should.have.property('message').eql('Parcel not found');
        done();
      });
  });

  it('should return a notification message if parcel is not found', (done) => {
    chai.request(myApp)
      .put('/api/v1/parcels/10/cancel')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('status').eql('Failure');
        res.body.should.have.property('message').eql('Parcel not found');
        done();
      });
  });

  it('should not cancel a parcel if it has been cancelled', (done) => {
    chai.request(myApp)
      .put('/api/v1/parcels/3/cancel')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('status').eql('Success');
        res.body.should.have.property('message').eql('Parcel has been cancelled');
        done();
      });
  });

  it('should not cancel a parcel if it has been delivered', (done) => {
    chai.request(myApp)
      .put('/api/v1/parcels/2/cancel')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('status').eql('Success');
        res.body.should.have.property('message').eql('Parcel has been delivered');
        done();
      });
  });

  it('should cancel a parcel if it has neither been cancelled nor delivered', (done) => {
    chai.request(myApp)
      .put('/api/v1/parcels/1/cancel')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('status').eql('Success');
        res.body.should.have.property('message').eql('Parcel is cancelled');
        done();
      });
  });

  it('should fetch all the users', (done) => {
    chai.request(myApp)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        users.should.be.an('array');
        users.should.have.lengthOf(3);
        res.body.should.have.property('status').eq('Success');
        res.body.should.have.property('message').eql('Users retrieved');
        done();
      });
  });
  it('should fetch a user by id', (done) => {
    chai.request(myApp)
      .get('/api/v1/users/3')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('status').eql('Success');
        res.body.should.have.property('message').eql('User retrieved');
        done();
      });
  });

  it('should return a notification message if user is not found', (done) => {
    chai.request(myApp)
      .get('/api/v1/users/10')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('status').eql('Failure');
        res.body.should.have.property('message').eql('User not found');
        done();
      });
  });

  it('should return a notification message if parcel is not found', (done) => {
    chai.request(myApp)
      .put('/api/v1/parcels/10/location')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('status').eql('Failure');
        res.body.should.have.property('message').eql('No parcel found');
        done();
      });
  });
});
