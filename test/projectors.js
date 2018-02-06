var stats = require('../');
var expect = require('chai').expect;

var numberList = [1,2,3,4];
var pointList = [[0,0],[1,1],[2,4],[3,9],[4,16]];

describe('Projectors', function() {

  describe('identity_projector()', function() {

    it('should return the projection of Nth element', function() {
      var identity = stats.identity_projector(numberList, 2);
      expect(identity).to.be.finite;
      expect(identity).to.equal(3);
    });

  });

  describe('x_projector()', function() {

    it('should return the the projection of the x-coordinate of the projection of the Nth data element', function() {
      var x = stats.x_projector(pointList, 3);
      expect(x).to.be.finite;
      expect(x).to.equal(3);
    });

  });

  describe('y_projector', function() {

    it('should return the the projection of the y-coordinate of the projection of the Nth data element', function() {
      var y = stats.y_projector(pointList, 3);
      expect(y).to.be.finite;
      expect(y).to.equal(9);
    });

  });

});
