import myApp from '../server/index';

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
        res.body.should.be.an('array');
        res.body.should.have.lengthOf(3);
        done();
      });
  });

  it('should get a parcel by id', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should delete a parcel by id', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels/:id/delete');
    done();
  });

  it('should cancel a parcel by id', (done) => {
    chai.request(myApp)
      .get('/api/v1/parcels/:id/cancel');
    done();
  });
});
