var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app/index');
var should = chai.should();

chai.use(chaiHttp);

describe('Sports', function() {
  it('should list ALL sports on /sports GET', (done)=>{
      chai.request(server)
        .get('/sports')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.have.header('content-type', 'text/html; charset=utf-8');
          res.should.be.html;
          done();
        });
  });
  it('should list a SINGLE sports on /sports/<id> GET', (done)=>{
      chai.request(server)
        .get('/sports/'+100)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.have.header('content-type', 'text/html; charset=utf-8');
          res.should.be.html;
          done();
        });
  });
  it('should list a SINGLE sport events on /sports/<id>/event/<event> GET', (done)=>{
      chai.request(server)
        .get('/sports/'+100 + '/event/' +891464600)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.have.header('content-type', 'text/html; charset=utf-8');
          res.should.be.html;
          done();
        });
  });

  it('should list JSON with ALL sports on /json/sports GET', (done) =>{
      chai.request(server)
        .get('/json/sports')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('title');
          res.body[0].should.have.property('meetings');
          res.body[0].should.have.property('is_virtual');
          res.body[0].should.have.property('events');
          res.body[0].should.have.property('pos');
          res.body[0].id.should.equal(100);
          res.body[0].title.should.equal('Football');
          res.body[0].events.should.be.a('array');
          res.body[0].meetings.should.be.a('array');
          done();
        });
  });

  it('should list JSON with a SINGLE sports on /json/sports/<id> GET', (done)=>{
      chai.request(server)
        .get('/json/sports/'+100)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('meetings');
          res.body.should.have.property('events');
          res.body.should.have.property('events');
          res.body.should.have.property('pos');
          res.body.id.should.equal(100);
          res.body.title.should.equal('Football');
          res.body.events.should.be.a('array');
          res.body.meetings.should.be.a('array');
          done();
        });
  });
  it('should list JSON with a SINGLE sport events on /json/sports/<id>/event/<event> GET', (done)=>{
      chai.request(server)
        .get('/json/sports/'+100 + '/event/' +891464600)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('event_id');
          res.body.should.have.property('market_id');
          res.body.should.have.property('market_type_id');
          res.body.should.have.property('status_id');
          res.body.should.have.property('score');
          res.body.should.have.property('description');
          res.body.should.have.property('start_time');
          res.body.should.have.property('meeting');
          res.body.should.have.property('meeting_id');

          res.body.should.have.property('media');
          res.body.should.have.property('event_type');
          res.body.should.have.property('pos');
          res.body.should.have.property('home_team');
          res.body.should.have.property('away_team');
          res.body.should.have.property('team_information');

          res.body.should.have.property('home_score');
          res.body.should.have.property('away_score');
          res.body.should.have.property('period_id');
          res.body.should.have.property('status_type');
          res.body.should.have.property('status');
          res.body.should.have.property('total_outcomes');

          res.body.should.have.property('outcomes');
          res.body.id.should.equal(891464600);
          res.body.title.should.equal('Lokomotive Leipzig v BSG Chemie Leipzig');
          res.body.outcomes.should.be.a('array');
          done();
        });
  });
});
