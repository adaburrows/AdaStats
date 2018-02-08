var stats = require('../');
var expect = require('chai').expect;

const numberList = [10, 13, 11, 5, 23, 101];
const pointList = [[12, 11], [13, 17], [15, 18], [5, 3], [23, 19], [101, 108]];

describe('Binning', function() {

  describe('Accumulator Functions', function() {

    describe('integer_generator()', function() {

      it('should return an number zero', function() {
        var accumulator = stats.integer_generator();
        expect(accumulator).to.be.a('number');
        expect(accumulator).to.be.equal(0);
      });

    });

    describe('array_generator()', function() {

      it('should return an empty array', function() {
        var accumulator = stats.array_generator();
        expect(accumulator).to.be.a('Array');
        expect(accumulator).to.be.empty;
      });

    });

    describe('summation()', function() {

      it('should sum-accumulate a number in a bin', function() {
        var bins = [];
        var i = 0;
        bins[i] = stats.integer_generator();
        stats.summation(bins, i, 5);
        expect(bins[i]).to.be.a('number');
        expect(bins[i]).to.be.equal(5);
      });

    });

    describe('union()', function() {

      it('should union-accumulate a number in a bin', function() {
        var bins = [];
        var i = 0;
        bins[i] = stats.array_generator();
        stats.union(bins, i, 5);
        expect(bins[i]).to.be.a('array');
        expect(bins[i]).to.include(5);
      });

    });

  });

});
