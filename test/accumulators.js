var stats = require('../');
var expect = require('chai').expect;

const numberList = [10, 13, 11, 5, 23, 101];
const pointList = [[12, 11], [13, 17], [15, 18], [5, 3], [23, 19], [101, 108]];

describe('Accumulators', function() {

  describe('Old accumulator functions', function() {

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

  describe('Stateful Accumulators', function() {

    describe('Set accumulator', function() {

      it('should accumulate values in a set', function() {
        var test = [1,2,3,4,5];
        var s = new stats.stateful_set_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.deep.equal(test);
      });

    });

    describe('Sum accumulator', function() {

      it('should accumulate values in a sum', function() {
        var test = [1,2,3,4,5];
        var s = new stats.stateful_sum_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(15);
      });

    });

    describe('Min accumulator', function() {

      it('should accumulate the smallest value', function() {
        var test = [5,4,3,2,1];
        var s = new stats.stateful_min_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(1);
      });

    });

    describe('Max accumulator', function() {

      it('should accumulate the greates value', function() {
        var test = [5,4,3,2,1];
        var s = new stats.stateful_max_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(5);
      });

    });

    describe('generic_accumulator()', function() {

      it('should adapt an accumulator to a set of bins', function() {
        var bins = [];
        var i = 0;
        bins[i] = new stats.stateful_set_accumulator();
        stats.generic_accumulator(bins, i, 42);
        expect(bins[i].valueOf()).to.include(42);
      });

    });

  });

});
