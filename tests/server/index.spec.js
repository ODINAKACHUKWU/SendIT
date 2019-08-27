import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../server/index';

chai.use(chaiHttp);

describe('SendIT API', () => {
  it('should return a welcome message', () => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(`<h1>Welcome to SendIT</h1>
            <h3>SendIT is a courier service that helps users deliver parcels to different destinations.
            It provides courier quotes based on weight categories.</h3>
            <p>For any more information please visit our
            <a href='https://github.com/ODINAKACHUKWU/SendIT'>
            Github repo!</a></p>
            <h4>Thank you for visiting  &#x1F600;</h4>
            `);
      });
  });

  it('should return Connected to SendIT v1 API', () => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Connected to SendIT v1 API');
      });
  });

  it('should return Oops! Not found', () => {
    chai
      .request(app)
      .get('/api/v1/unavailable')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('failure');
        expect(res.body.message).to.equal('Oops! Not found');
      });
  });
});
