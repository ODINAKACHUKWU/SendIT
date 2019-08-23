import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../server/index';

chai.use(chaiHttp);

describe('SendIT API', () => {
  it('should return Connected to SendIT v1 API', () => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('Success');
        expect(res.body.message).to.equal('Connected to SendIT v1 API');
      });
  });

  it('should return Oops! Not found', () => {
    chai
      .request(app)
      .get('/api/v1/unavailable')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('Failure');
        expect(res.body.message).to.equal('Oops! Not found');
      });
  });
});
