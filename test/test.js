import myApp from '../server/index';
import { parcels, users } from '../server/db';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);

describe('Parcel API endpoints', () => {
  it('should get all the parcels', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        parcels.should.be.an('array');
        parcels.should.have.lengthOf(3);
        done();
      });
  });

  it('should get a parcel by id', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels/:id')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql('Success');
        res.body.should.have.property('message').eql('Parcel retrieved');
        res.body.should.have.property('data').eql('parcel');
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql('Failure');
        res.body.should.have.property('message').eql('Parcel not found');
        done();
      });
  });

  it('should delete a parcel by id', (done) => {
    chai.request(myApp)
      .del('/api/v1/parcels/:id/delete')
      .end((err, res) => {
        done();
      });
  });

  it('should cancel a parcel by id', (done) => {
    chai.request(myApp)
      .put('/api/v1/parcels/:id/cancel')
      .end((err, res) => {
        done();
      });
  });
});
