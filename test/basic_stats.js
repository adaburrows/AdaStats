var stats = require('../');
var expect = require('chai').expect;

const numberList = [10, 13, 11, 5, 23, 101];
const pointList = [[12, 11], [13, 17], [15, 18], [5, 3], [23, 19], [101, 108]];

describe('Basic Statistics', function() {

  describe('min()', function() {

    it('should return the lowest number in the list', function() {
      var min = stats.min(numberList);
      expect(min).to.be.finite;
      expect(min).to.equal(5);
    });

    it('should return the point with the lowest x-value in the list', function() {
      var min = stats.min(pointList, stats.x_projector);
      expect(min).to.be.finite;
      expect(min).to.equal(5);
    });

    it('should return the point with the lowest y-value in the list', function() {
      var min = stats.min(pointList, stats.y_projector);
      expect(min).to.be.finite;
      expect(min).to.equal(3);
    });

  });

  describe('max()', function() {

    it('should return the highest number in the list', function() {
      var min = stats.max(numberList);
      expect(min).to.be.finite;
      expect(min).to.equal(101);
    });

    it('should return the point with the highest x-value in the list', function() {
      var min = stats.max(pointList, stats.x_projector);
      expect(min).to.be.finite;
      expect(min).to.equal(101);
    });

    it('should return the point with the highest y-value in the list', function() {
      var min = stats.max(pointList, stats.y_projector);
      expect(min).to.be.finite;
      expect(min).to.equal(108);
    });

  });

  describe('mean()', function() {

    it('should return the mean of the numbers in the list', function() {
      var mean = stats.mean(numberList);
      expect(mean).to.be.finite;
      expect(mean).to.closeTo(27.1666, 0.0001);
    });

    it('should return the mean of the x-values in the list', function() {
      var x_mean = stats.mean(pointList, stats.x_projector);
      expect(x_mean).to.be.finite;
      expect(x_mean).to.closeTo(28.1666, 0.0001);
    });

    it('should return the mean of the y-values in the list', function() {
      var y_mean = stats.mean(pointList, stats.y_projector);
      expect(y_mean).to.be.finite;
      expect(y_mean).to.closeTo(29.3333, 0.0001);
    });

  });

});
