var stats = require('../');
var expect = require('chai').expect;

describe('Miscellaneous Utilities', function() {

  describe('round_down()', function() {

    it('should round a number to the nearest hundred', function() {
      var roundedDown = stats.round_down(1234567, 100);
      expect(roundedDown).to.be.finite;
      expect(roundedDown).to.equal(1234500);
    });

  });

  describe('round_up()', function() {

    it('should round a number to the nearest hundred', function() {
      var roundedUp = stats.round_up(1234567, 100);
      expect(roundedUp).to.be.finite;
      expect(roundedUp).to.equal(1234600);
    });

  });

  describe('log_2()', function() {

    it('should return the exponent of 2^n = argument', function() {
      var log_2 = stats.log_2(8);
      expect(log_2).to.be.finite;
      expect(log_2).to.equal(3);
    });

  });

});
